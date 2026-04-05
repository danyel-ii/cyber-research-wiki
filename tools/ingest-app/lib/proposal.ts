import { mkdir, readFile, readdir, rm, writeFile, mkdtemp } from "node:fs/promises"
import path from "node:path"
import os from "node:os"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

import { canonicalTopics, getCanonicalTopic } from "./canonical-topics"
import { callOpenAiJson, openAiEnabled } from "./openai"
import type { ArticleInput, ArticleProposal, ArticleRecord, CanonicalTopic, ProposalFile } from "./types"
import { nowIsoDate, proposalId, slugify, trimLength } from "./utils"

const execFileAsync = promisify(execFile)

const repoRoot = process.cwd()
const proposalDir = path.join(repoRoot, ".quartz-cache", "article-app", "proposals")
const applyLocks = new Set<string>()

function stringifyFrontmatter(data: Record<string, string | string[]>): string {
  const lines = ["---"]
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`)
      for (const item of value) lines.push(`  - ${item}`)
    } else {
      lines.push(`${key}: ${value}`)
    }
  }
  lines.push("---", "")
  return lines.join("\n")
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  if (!raw.startsWith("---\n")) {
    return { data: {}, content: raw }
  }

  const endIndex = raw.indexOf("\n---\n", 4)
  if (endIndex === -1) {
    return { data: {}, content: raw }
  }

  const frontmatter = raw.slice(4, endIndex)
  const content = raw.slice(endIndex + 5).trimStart()
  const data: Record<string, string | string[]> = {}
  let currentArrayKey: string | null = null

  for (const line of frontmatter.split("\n")) {
    if (line.startsWith("  - ") && currentArrayKey) {
      const array = Array.isArray(data[currentArrayKey]) ? (data[currentArrayKey] as string[]) : []
      array.push(line.slice(4).trim())
      data[currentArrayKey] = array
      continue
    }

    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (value === "") {
      currentArrayKey = key
      data[key] = []
    } else {
      currentArrayKey = null
      data[key] = value
    }
  }

  return { data, content }
}
const articlesDir = path.join(repoRoot, "wiki", "articles")

function extractKeywords(text: string): Set<string> {
  const stopwords = new Set([
    "about", "after", "against", "between", "cannot", "could", "their", "there", "these", "those",
    "which", "while", "where", "when", "into", "from", "this", "that", "with", "have", "will",
    "should", "would", "been", "being", "were", "what", "than", "them", "they", "your", "ours",
  ])

  return new Set(
    text
      .toLowerCase()
      .match(/[a-z0-9-]{4,}/g)?.filter((word) => !stopwords.has(word)) ?? [],
  )
}

async function readOptionalFile(relativePath: string): Promise<string | null> {
  try {
    return await readFile(path.join(repoRoot, relativePath), "utf8")
  } catch {
    return null
  }
}

async function loadExistingArticles(): Promise<ArticleRecord[]> {
  await mkdir(articlesDir, { recursive: true })
  const entries = await readdir(articlesDir, { withFileTypes: true })
  const articleFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md")
    .map((entry) => entry.name)

  return Promise.all(
    articleFiles.map(async (fileName) => {
      const filePath = path.join(articlesDir, fileName)
      const raw = await readFile(filePath, "utf8")
      const parsed = parseFrontmatter(raw)
      const slug = `articles/${fileName.replace(/\.md$/, "")}`
      return {
        slug,
        filePath: path.join("wiki", "articles", fileName),
        title: (parsed.data.title as string | undefined) ?? slug,
        summary: (parsed.data.summary as string | undefined) ?? "",
        categories: Array.isArray(parsed.data.categories) ? (parsed.data.categories as string[]) : [],
        related: Array.isArray(parsed.data.related) ? (parsed.data.related as string[]) : [],
        body: parsed.content.trim(),
      }
    }),
  )
}

function scoreArticleRelation(input: ArticleInput, existing: ArticleRecord): number {
  const categoryOverlap = existing.categories.filter((category) => input.categories.includes(category)).length
  const inputKeywords = extractKeywords(`${input.title}\n${input.summary}\n${input.body}`)
  const existingKeywords = extractKeywords(`${existing.title}\n${existing.summary}\n${existing.body}`)
  const keywordOverlap = [...inputKeywords].filter((keyword) => existingKeywords.has(keyword)).length
  return categoryOverlap * 6 + keywordOverlap
}

async function chooseRelatedWithAi(input: ArticleInput, existingArticles: ArticleRecord[]): Promise<string[]> {
  const candidates = existingArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    categories: article.categories,
  }))

  const result = await callOpenAiJson<{ relatedArticleSlugs: string[] }>({
    schemaName: "related_articles",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        relatedArticleSlugs: {
          type: "array",
          items: { type: "string", enum: existingArticles.map((article) => article.slug) },
          maxItems: 5,
        },
      },
      required: ["relatedArticleSlugs"],
    },
    system: `
      Select related wiki articles for a new article in a cybersecurity wiki.
      Prefer direct conceptual adjacency, category overlap, and useful reader navigation.
      Return a small relevant set. Do not invent slugs.
    `,
    user: JSON.stringify(
      {
        newArticle: {
          title: input.title,
          summary: input.summary,
          categories: input.categories,
          body: trimLength(input.body, 5000),
        },
        candidates,
      },
      null,
      2,
    ),
  })

  return result.relatedArticleSlugs
}

async function chooseRelatedArticles(input: ArticleInput, existingArticles: ArticleRecord[]): Promise<string[]> {
  if (existingArticles.length === 0) return []
  if (openAiEnabled()) {
    try {
      return await chooseRelatedWithAi(input, existingArticles)
    } catch {
      // fall back to heuristic scoring
    }
  }

  return existingArticles
    .map((article) => ({ article, score: scoreArticleRelation(input, article) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((entry) => entry.article.slug)
}

function referencesSection(references: string | undefined): string {
  const entries = references
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean) ?? []

  if (entries.length === 0) return ""

  return `\n\n## References\n${entries.map((entry) => `- ${entry}`).join("\n")}\n`
}

function renderArticleMarkdown(input: ArticleInput, articleSlug: string, relatedArticleSlugs: string[]): string {
  const body = `${input.body.trim()}${referencesSection(input.references)}`.trim()
  return `${stringifyFrontmatter({
    title: input.title,
    summary: input.summary,
    pageKind: "article",
    categories: input.categories,
    related: relatedArticleSlugs,
    created: nowIsoDate(),
    updated: nowIsoDate(),
  })}${body}\n`
}

function renderCategoryPage(topic: CanonicalTopic, articles: ArticleRecord[]): string {
  const relatedSlugs = topic.relatedIds
    .map((id) => getCanonicalTopic(id)?.filePath.replace(/^wiki\//, "").replace(/\.md$/, ""))
    .filter((slug): slug is string => Boolean(slug))

  const articleList =
    articles.length > 0
      ? articles
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((article) => `- [[${article.slug}]] — ${article.summary}`)
          .join("\n")
      : "_No articles yet._"

  return `${stringifyFrontmatter({
      title: topic.title,
      pageKind: "category",
      categoryId: topic.id,
      summary: topic.summary,
      related: relatedSlugs,
    })}# ${topic.title}\n\n${topic.description}\n\n## What belongs here\n${topic.includes.map((item) => `- ${item}`).join("\n")}\n\n## How this category is positioned\n${topic.role}\n\n## Articles in this category\n<!-- ARTICLE-LIST:START -->\n${articleList}\n<!-- ARTICLE-LIST:END -->\n`
}

function renderHomePage(): string {
  return `---\ntitle: Home\naliases:\n  - home\n---\n\n# Cybersecurity Research Wiki\n\nThis wiki has been reset to a clean category-first structure. The public backbone is eight categories, and new articles are added manually through the authoring app. When a new article is created, the app updates category pages, the article index, and related-article metadata automatically.\n\n## Start with the categories\n- [[topics/penetration-testing]]\n- [[topics/pentest-workflow]]\n- [[topics/rules-of-engagement]]\n- [[topics/kali-linux]]\n- [[topics/practical-kali-linux]]\n- [[topics/kali-as-an-assessment-environment]]\n- [[topics/web-testing]]\n- [[frameworks/owasp-wstg]]\n\n## Browse\n- [[topics/index]]\n- [[articles/index]]\n`
}

function renderTopicsIndex(): string {
  return `# Categories\n\nThe wiki now starts from a clean eight-category backbone. New articles are written manually, then the app updates category pages, related-article links, and the article index automatically.\n\n## The eight categories\n- [[topics/penetration-testing]]\n- [[topics/pentest-workflow]]\n- [[topics/rules-of-engagement]]\n- [[topics/kali-linux]]\n- [[topics/practical-kali-linux]]\n- [[topics/kali-as-an-assessment-environment]]\n- [[topics/web-testing]]\n- [[frameworks/owasp-wstg]]\n`
}

function renderArticlesIndex(articles: ArticleRecord[]): string {
  const articleList =
    articles.length > 0
      ? articles
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((article) => `- [[${article.slug}]] — ${article.summary}`)
          .join("\n")
      : "_No articles yet._"

  return `# Articles\n\nThis section holds manually authored wiki articles. The article app updates this page automatically when a new article is added.\n\n## All articles\n<!-- ARTICLE-INDEX:START -->\n${articleList}\n<!-- ARTICLE-INDEX:END -->\n`
}

function appendLogEntry(existingLog: string, input: ArticleInput, articleSlug: string, relatedArticleSlugs: string[]): string {
  const categories = input.categories
    .map((categoryId) => getCanonicalTopic(categoryId)?.filePath.replace(/^wiki\//, "").replace(/\.md$/, ""))
    .filter((slug): slug is string => Boolean(slug))

  const lines = [
    `## [${nowIsoDate()}] article | ${input.title}`,
    `- Created: [[${articleSlug}]]`,
    `- Categorized under: ${categories.map((slug) => `[[${slug}]]`).join(", ")}`,
    `- Related: ${relatedArticleSlugs.length > 0 ? relatedArticleSlugs.map((slug) => `[[${slug}]]`).join(", ") : "none yet"}`,
    `- Notes: Added through the article app and propagated into category indexes and related-article metadata.`,
    "",
  ]

  return `${existingLog.trim()}\n\n${lines.join("\n")}`
}

async function buildDiff(previousMarkdown: string | null, nextMarkdown: string, filePath: string): Promise<string> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "article-diff-"))
  const beforePath = path.join(tempDir, "before.md")
  const afterPath = path.join(tempDir, "after.md")

  await writeFile(beforePath, previousMarkdown ?? "", "utf8")
  await writeFile(afterPath, nextMarkdown, "utf8")

  try {
    await execFileAsync("diff", ["-u", "--label", `a/${filePath}`, "--label", `b/${filePath}`, beforePath, afterPath])
    return ""
  } catch (error) {
    const diffOutput = error as { stdout?: string; stderr?: string }
    return diffOutput.stdout ?? diffOutput.stderr ?? ""
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

export async function createProposal(input: ArticleInput): Promise<ArticleProposal> {
  const articleSlugBase = input.slug && input.slug.trim().length > 0 ? slugify(input.slug) : slugify(input.title)
  const articleSlug = `articles/${articleSlugBase}`
  const articlePath = `wiki/articles/${articleSlugBase}.md`
  const existingArticles = await loadExistingArticles()
  const relatedArticleSlugs = await chooseRelatedArticles(input, existingArticles)
  const relatedSet = new Set(relatedArticleSlugs)

  const updatedArticles = existingArticles.map((article) => {
    if (!relatedSet.has(article.slug)) return article
    return {
      ...article,
      related: [...new Set([...article.related, articleSlug])].sort(),
    }
  })

  const newArticle: ArticleRecord = {
    slug: articleSlug,
    filePath: articlePath,
    title: input.title,
    summary: input.summary,
    categories: input.categories,
    related: relatedArticleSlugs,
    body: input.body.trim(),
  }

  const allArticles = [...updatedArticles, newArticle]
  const files: ProposalFile[] = []

  const articleMarkdown = renderArticleMarkdown(input, articleSlug, relatedArticleSlugs)
  files.push({
    path: articlePath,
    markdown: articleMarkdown,
    previousMarkdown: await readOptionalFile(articlePath),
    diff: "",
    changeType: (await readOptionalFile(articlePath)) ? "update" : "create",
  })

  for (const updatedArticle of updatedArticles.filter((article) => relatedSet.has(article.slug))) {
    const existingMarkdown = await readOptionalFile(updatedArticle.filePath)
    const existingParsed = existingMarkdown ? parseFrontmatter(existingMarkdown) : null
    const created = (existingParsed?.data.created as string | undefined) ?? nowIsoDate()
    const relatedMarkdown = `${stringifyFrontmatter({
      title: updatedArticle.title,
      summary: updatedArticle.summary,
      pageKind: "article",
      categories: updatedArticle.categories,
      related: updatedArticle.related,
      created,
      updated: nowIsoDate(),
    })}${updatedArticle.body}\n`
    files.push({
      path: updatedArticle.filePath,
      markdown: relatedMarkdown,
      previousMarkdown: existingMarkdown,
      diff: "",
      changeType: "update",
    })
  }

  for (const topic of canonicalTopics) {
    const articlesForTopic = allArticles.filter((article) => article.categories.includes(topic.id))
    const rendered = renderCategoryPage(topic, articlesForTopic)
    files.push({
      path: topic.filePath,
      markdown: rendered,
      previousMarkdown: await readOptionalFile(topic.filePath),
      diff: "",
      changeType: "update",
    })
  }

  files.push({
    path: "wiki/index.md",
    markdown: renderHomePage(),
    previousMarkdown: await readOptionalFile("wiki/index.md"),
    diff: "",
    changeType: "update",
  })

  files.push({
    path: "wiki/topics/index.md",
    markdown: renderTopicsIndex(),
    previousMarkdown: await readOptionalFile("wiki/topics/index.md"),
    diff: "",
    changeType: "update",
  })

  files.push({
    path: "wiki/articles/index.md",
    markdown: renderArticlesIndex(allArticles),
    previousMarkdown: await readOptionalFile("wiki/articles/index.md"),
    diff: "",
    changeType: "update",
  })

  const existingLog = (await readOptionalFile("wiki/log.md")) ?? "# Log\n"
  files.push({
    path: "wiki/log.md",
    markdown: appendLogEntry(existingLog, input, articleSlug, relatedArticleSlugs),
    previousMarkdown: existingLog,
    diff: "",
    changeType: "update",
  })

  const filesWithDiffs = await Promise.all(
    files.map(async (file) => ({
      ...file,
      diff: await buildDiff(file.previousMarkdown, file.markdown, file.path),
    })),
  )

  const proposal: ArticleProposal = {
    id: proposalId(),
    createdAt: new Date().toISOString(),
    title: input.title,
    articleSlug,
    summary: input.summary,
    categoryIds: input.categories,
    relatedArticleSlugs,
    commitMessage: `Add article: ${input.title}`,
    rationale: `The article is placed in ${input.categories.length} categor${input.categories.length === 1 ? "y" : "ies"} and linked to ${relatedArticleSlugs.length} related article${relatedArticleSlugs.length === 1 ? "" : "s"}.`,
    files: filesWithDiffs,
    warnings: openAiEnabled() ? [] : ["OPENAI_API_KEY is not set, so related-article selection used deterministic category and keyword overlap."],
  }

  await mkdir(proposalDir, { recursive: true })
  await writeFile(path.join(proposalDir, `${proposal.id}.json`), JSON.stringify(proposal, null, 2), "utf8")

  return proposal
}

export async function loadProposal(id: string): Promise<ArticleProposal> {
  const data = await readFile(path.join(proposalDir, `${id}.json`), "utf8")
  return JSON.parse(data) as ArticleProposal
}

export async function applyProposal(id: string, commit: boolean): Promise<{ commitSha: string | null; paths: string[] }> {
  if (applyLocks.has(id)) {
    throw new Error("This proposal is already being applied. Wait for the current write to finish.")
  }

  applyLocks.add(id)
  try {
  const proposal = await loadProposal(id)

  if (proposal.appliedAt && proposal.applyResult) {
    return proposal.applyResult
  }

  for (const file of proposal.files) {
    const absolutePath = path.join(repoRoot, file.path)
    await mkdir(path.dirname(absolutePath), { recursive: true })
    await writeFile(absolutePath, file.markdown, "utf8")
  }

  let commitSha: string | null = null
  if (commit) {
    await execFileAsync("git", ["add", ...proposal.files.map((file) => file.path)], { cwd: repoRoot })
    try {
      await execFileAsync("git", ["commit", "-m", proposal.commitMessage], { cwd: repoRoot })
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoRoot })
      commitSha = stdout.trim()
    } catch (error) {
      const gitError = error as { stdout?: string; stderr?: string }
      const details = `${gitError.stdout ?? ""}\n${gitError.stderr ?? ""}`
      if (/nothing to commit|no changes added to commit/i.test(details)) {
        const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoRoot })
        commitSha = stdout.trim()
      } else {
        throw error
      }
    }
  }

  const result = {
    commitSha,
    paths: proposal.files.map((file) => file.path),
  }
  await writeFile(
    path.join(proposalDir, `${proposal.id}.json`),
    JSON.stringify(
      {
        ...proposal,
        appliedAt: new Date().toISOString(),
        applyResult: result,
      },
      null,
      2,
    ),
    "utf8",
  )

  return result
  } finally {
    applyLocks.delete(id)
  }
}
