import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import os from "node:os"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

import { canonicalTopics, getCanonicalTopic } from "./canonical-topics"
import { fetchSources } from "./fetch-sources"
import { callOpenAiJson, openAiEnabled } from "./openai"
import type {
  CanonicalTopic,
  IngestProposal,
  ProposalFile,
  SourceExtract,
  TopicSelection,
  TopicUpdate,
} from "./types"
import { hashShort, nowIsoDate, proposalId, slugify, trimLength } from "./utils"

const execFileAsync = promisify(execFile)

const repoRoot = process.cwd()
const proposalDir = path.join(repoRoot, ".quartz-cache", "ingest-ui", "proposals")

function titleFromSources(sources: SourceExtract[]): string {
  const hosts = [...new Set(sources.map((source) => new URL(source.url).hostname.replace(/^www\./, "")))]
  if (hosts.length === 1) {
    return `${hosts[0]} reference ingest`
  }
  return "mixed reference ingest"
}

function sourceSlugFromSources(sources: SourceExtract[]): string {
  const base = titleFromSources(sources)
  return `${slugify(base)}-${nowIsoDate()}-${hashShort(sources.map((source) => source.url).join("|"))}`
}

function heuristicTopicSelection(sources: SourceExtract[]): TopicSelection {
  const haystack = sources.map((source) => `${source.title}\n${source.text}`.toLowerCase()).join("\n\n")
  const scored = canonicalTopics
    .map((topic) => {
      const score = topic.keywords.reduce((total, keyword) => {
        return total + (haystack.includes(keyword.toLowerCase()) ? 1 : 0)
      }, 0)
      return { topic, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)

  const topicIds = scored.slice(0, 3).map((entry) => entry.topic.id)
  return {
    topicIds: topicIds.length > 0 ? topicIds : ["penetration-testing"],
    rationale: topicIds.length > 0
      ? `Selected by keyword overlap across the fetched references: ${topicIds.join(", ")}.`
      : "No strong keyword overlap found, so the ingest falls back to penetration-testing for review.",
  }
}

async function selectTopicsWithAi(sources: SourceExtract[]): Promise<TopicSelection> {
  return callOpenAiJson<TopicSelection>({
    schemaName: "topic_selection",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        topicIds: {
          type: "array",
          items: {
            type: "string",
            enum: canonicalTopics.map((topic) => topic.id),
          },
          minItems: 1,
          maxItems: 4,
        },
        rationale: { type: "string" },
      },
      required: ["topicIds", "rationale"],
    },
    system: `
      You classify newly ingested cybersecurity reference material into a fixed set of canonical wiki topics.
      Use only the provided canonical topic ids.
      Prefer the smallest relevant set.
      Do not invent new topics.
    `,
    user: JSON.stringify(
      {
        canonicalTopics: canonicalTopics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          summary: topic.summary,
          keywords: topic.keywords,
        })),
        sources: sources.map((source) => ({
          url: source.url,
          title: source.title,
          excerpt: source.excerpt,
          text: trimLength(source.text, 5000),
        })),
      },
      null,
      2,
    ),
  })
}

async function loadCurrentTopicMarkdown(topic: CanonicalTopic): Promise<string> {
  return readFile(path.join(repoRoot, topic.filePath), "utf8")
}

function fallbackSourceMarkdown(sourceTitle: string, sourceSlug: string, sources: SourceExtract[], selectedTopics: CanonicalTopic[]): string {
  const points = sources.map((source) => `- ${source.title}: ${source.excerpt}`).join("\n")
  const affects = selectedTopics.map((topic) => `- Affects: [[${topic.filePath.replace(/^wiki\//, "").replace(/\.md$/, "")}]]`).join("\n")

  return `# ${sourceTitle}\n\n## Overview\nThis source page summarizes a reference ingest captured on ${nowIsoDate()}. It is a staging summary for material brought in through the ingestion app and should be reviewed before further synthesis.\n\n## Bibliographic details\n- Title: ${sourceTitle}\n- Source type: web reference ingest\n- Ingest slug: \`${sourceSlug}\`\n- URLs:\n${sources.map((source) => `  - ${source.url}`).join("\n")}\n\n## Key points\n${points}\n\n## Relevance to the wiki\n${affects}\n`
}

function fallbackTopicMarkdown(currentMarkdown: string, sources: SourceExtract[]): string {
  const sectionTitle = `Recent reference ingest (${nowIsoDate()})`
  const notes = sources.map((source) => `- ${source.title}: ${source.excerpt}`).join("\n")

  if (currentMarkdown.includes(`## ${sectionTitle}`)) {
    return currentMarkdown
  }

  return `${currentMarkdown.trim()}\n\n## ${sectionTitle}\n${notes}\n`
}

async function draftWithAi(args: {
  sourceTitle: string
  sourceSlug: string
  sources: SourceExtract[]
  topics: CanonicalTopic[]
  currentTopicMarkdown: Record<string, string>
}): Promise<{
  summary: string
  sourcePageMarkdown: string
  topicUpdates: TopicUpdate[]
  logSummary: string
  commitMessage: string
}> {
  return callOpenAiJson({
    schemaName: "ingest_draft",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        summary: { type: "string" },
        sourcePageMarkdown: { type: "string" },
        topicUpdates: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              topicId: {
                type: "string",
                enum: args.topics.map((topic) => topic.id),
              },
              markdown: { type: "string" },
            },
            required: ["topicId", "markdown"],
          },
        },
        logSummary: { type: "string" },
        commitMessage: { type: "string" },
      },
      required: ["summary", "sourcePageMarkdown", "topicUpdates", "logSummary", "commitMessage"],
    },
    system: `
      You update a cybersecurity research wiki.
      The public layer is article-first.
      Rules:
      - Only update the provided canonical topics.
      - Do not create stub pages.
      - Keep articles non-repetitive and readable for humans.
      - Preserve learner flow inside the articles with "Read next" and "Related topics" when those sections already exist.
      - Keep the wiki focused on authorized research, methodology, evidence, and frameworks.
      - The source page should summarize provenance and extracted claims behind the public articles.
      - Return full markdown for each updated topic file, not patches.
    `,
    user: JSON.stringify(
      {
        sourceTitle: args.sourceTitle,
        sourceSlug: args.sourceSlug,
        topics: args.topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          filePath: topic.filePath,
          summary: topic.summary,
          currentMarkdown: args.currentTopicMarkdown[topic.id],
        })),
        sources: args.sources.map((source) => ({
          url: source.url,
          title: source.title,
          excerpt: source.excerpt,
          text: trimLength(source.text, 7000),
        })),
      },
      null,
      2,
    ),
  })
}

async function buildDiff(previousMarkdown: string | null, nextMarkdown: string, filePath: string): Promise<string> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "ingest-diff-"))
  const beforePath = path.join(tempDir, "before.md")
  const afterPath = path.join(tempDir, "after.md")

  await writeFile(beforePath, previousMarkdown ?? "", "utf8")
  await writeFile(afterPath, nextMarkdown, "utf8")

  try {
    await execFileAsync("diff", [
      "-u",
      "--label",
      `a/${filePath}`,
      "--label",
      `b/${filePath}`,
      beforePath,
      afterPath,
    ])
    return ""
  } catch (error) {
    const diffOutput = error as { stdout?: string; stderr?: string }
    return diffOutput.stdout ?? diffOutput.stderr ?? ""
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

async function readOptionalFile(relativePath: string): Promise<string | null> {
  try {
    return await readFile(path.join(repoRoot, relativePath), "utf8")
  } catch {
    return null
  }
}

function ensureBulletPresent(markdown: string, bullet: string): string {
  if (markdown.includes(bullet)) return markdown
  return `${markdown.trim()}\n- ${bullet}\n`
}

function insertBulletUnderSection(markdown: string, sectionHeading: string, bullet: string): string {
  if (markdown.includes(bullet)) return markdown

  const headingIndex = markdown.indexOf(sectionHeading)
  if (headingIndex === -1) {
    return ensureBulletPresent(markdown, bullet)
  }

  const sectionStart = headingIndex + sectionHeading.length
  const nextHeadingMatch = markdown.slice(sectionStart).match(/\n## /)
  const sectionEnd = nextHeadingMatch ? sectionStart + (nextHeadingMatch.index ?? 0) : markdown.length
  const sectionBody = markdown.slice(sectionStart, sectionEnd).trimEnd()
  const updatedSectionBody = `${sectionBody}\n- ${bullet}\n`

  return `${markdown.slice(0, sectionStart)}${updatedSectionBody}${markdown.slice(sectionEnd)}`
}

function appendLogEntry(logMarkdown: string, sourceTitle: string, sourcePageSlug: string, topicIds: string[], summary: string): string {
  const topicLinks = topicIds.map((topicId) => {
    const topic = getCanonicalTopic(topicId)
    return topic ? `[[${topic.filePath.replace(/^wiki\//, "").replace(/\.md$/, "")}]]` : topicId
  })

  const newEntry = [
    `## [${nowIsoDate()}] ingest | ${sourceTitle}`,
    `- Created: [[sources/${sourcePageSlug}]]`,
    `- Updated: ${topicLinks.join(", ")}`,
    `- Notes: ${summary}`,
    "",
  ].join("\n")

  return `${logMarkdown.trim()}\n\n${newEntry}`
}

export async function createProposal(urls: string[]): Promise<IngestProposal> {
  const sources = await fetchSources(urls)
  const sourceTitle = titleFromSources(sources)
  const sourceSlug = sourceSlugFromSources(sources)
  const selection = openAiEnabled() ? await selectTopicsWithAi(sources) : heuristicTopicSelection(sources)
  const selectedTopics = selection.topicIds
    .map((topicId) => getCanonicalTopic(topicId))
    .filter((topic): topic is CanonicalTopic => Boolean(topic))

  const currentTopicMarkdownEntries = await Promise.all(
    selectedTopics.map(async (topic) => [topic.id, await loadCurrentTopicMarkdown(topic)] as const),
  )
  const currentTopicMarkdown = Object.fromEntries(currentTopicMarkdownEntries)

  const drafted = openAiEnabled()
    ? await draftWithAi({
        sourceTitle,
        sourceSlug,
        sources,
        topics: selectedTopics,
        currentTopicMarkdown,
      })
    : {
        summary: `Drafted from ${sources.length} fetched reference link(s) and mapped onto ${selectedTopics
          .map((topic) => topic.title)
          .join(", ")}.`,
        sourcePageMarkdown: fallbackSourceMarkdown(sourceTitle, sourceSlug, sources, selectedTopics),
        topicUpdates: selectedTopics.map((topic) => ({
          topicId: topic.id,
          markdown: fallbackTopicMarkdown(currentTopicMarkdown[topic.id], sources),
        })),
        logSummary: `Drafted a source summary and updated ${selectedTopics.length} canonical topic article(s).`,
        commitMessage: `Ingest references into ${selectedTopics.map((topic) => topic.id).join(", ")}`,
      }

  const files: ProposalFile[] = []

  const sourcePath = `wiki/sources/${sourceSlug}.md`
  files.push({
    path: sourcePath,
    markdown: drafted.sourcePageMarkdown,
    previousMarkdown: await readOptionalFile(sourcePath),
    diff: "",
    changeType: (await readOptionalFile(sourcePath)) ? "update" : "create",
  })

  for (const topicUpdate of drafted.topicUpdates) {
    const topic = getCanonicalTopic(topicUpdate.topicId)
    if (!topic) continue
    files.push({
      path: topic.filePath,
      markdown: topicUpdate.markdown,
      previousMarkdown: currentTopicMarkdown[topic.id] ?? null,
      diff: "",
      changeType: currentTopicMarkdown[topic.id] ? "update" : "create",
    })
  }

  const sourceIndexPath = "wiki/sources/index.md"
  const existingSourceIndex = (await readOptionalFile(sourceIndexPath)) ?? "# Sources\n"
  const sourceBullet = `[[sources/${sourceSlug}]]`
  files.push({
    path: sourceIndexPath,
    previousMarkdown: existingSourceIndex,
    markdown: insertBulletUnderSection(existingSourceIndex, "## Current source set", sourceBullet),
    diff: "",
    changeType: "update",
  })

  const homeIndexPath = "wiki/index.md"
  const existingIndex = (await readOptionalFile(homeIndexPath)) ?? ""
  const supportBullet = `[[sources/${sourceSlug}]]`
  files.push({
    path: homeIndexPath,
    previousMarkdown: existingIndex,
    markdown: insertBulletUnderSection(existingIndex, "## Support layer", supportBullet),
    diff: "",
    changeType: "update",
  })

  const logPath = "wiki/log.md"
  const existingLog = (await readOptionalFile(logPath)) ?? "# Log\n"
  files.push({
    path: logPath,
    previousMarkdown: existingLog,
    markdown: appendLogEntry(existingLog, sourceTitle, sourceSlug, selection.topicIds, drafted.logSummary),
    diff: "",
    changeType: "update",
  })

  const filesWithDiffs = await Promise.all(
    files.map(async (file) => ({
      ...file,
      diff: await buildDiff(file.previousMarkdown, file.markdown, file.path),
    })),
  )

  const proposal: IngestProposal = {
    id: proposalId(),
    createdAt: new Date().toISOString(),
    urls,
    sourceTitle,
    sourceSlug,
    summary: drafted.summary,
    selectedTopicIds: selection.topicIds,
    rationale: selection.rationale,
    commitMessage: drafted.commitMessage,
    files: filesWithDiffs,
    warnings: openAiEnabled()
      ? []
      : ["OPENAI_API_KEY is not set, so the app used heuristic topic matching and conservative fallback drafting."],
  }

  await mkdir(proposalDir, { recursive: true })
  await writeFile(path.join(proposalDir, `${proposal.id}.json`), JSON.stringify(proposal, null, 2), "utf8")

  return proposal
}

export async function loadProposal(id: string): Promise<IngestProposal> {
  const proposalPath = path.join(proposalDir, `${id}.json`)
  const data = await readFile(proposalPath, "utf8")
  return JSON.parse(data) as IngestProposal
}

export async function applyProposal(id: string, commit: boolean): Promise<{ commitSha: string | null; paths: string[] }> {
  const proposal = await loadProposal(id)
  for (const file of proposal.files) {
    const absolutePath = path.join(repoRoot, file.path)
    await mkdir(path.dirname(absolutePath), { recursive: true })
    await writeFile(absolutePath, file.markdown, "utf8")
  }

  let commitSha: string | null = null
  if (commit) {
    await execFileAsync("git", ["add", ...proposal.files.map((file) => file.path)], { cwd: repoRoot })
    await execFileAsync("git", ["commit", "-m", proposal.commitMessage], { cwd: repoRoot })
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoRoot })
    commitSha = stdout.trim()
  }

  return {
    commitSha,
    paths: proposal.files.map((file) => file.path),
  }
}
