export type CanonicalTopic = {
  id: string
  title: string
  filePath: string
  summary: string
  description: string
  role: string
  includes: string[]
  relatedIds: string[]
  keywords: string[]
  kind: "topic" | "framework"
}

export type ArticleInput = {
  title: string
  slug?: string
  summary: string
  body: string
  categories: string[]
  references?: string
}

export type ArticleRecord = {
  slug: string
  filePath: string
  title: string
  summary: string
  categories: string[]
  related: string[]
  body: string
}

export type ProposalFile = {
  path: string
  markdown: string
  previousMarkdown: string | null
  diff: string
  changeType: "create" | "update"
}

export type ArticleProposal = {
  id: string
  createdAt: string
  title: string
  articleSlug: string
  summary: string
  categoryIds: string[]
  relatedArticleSlugs: string[]
  commitMessage: string
  rationale: string
  files: ProposalFile[]
  warnings: string[]
}
