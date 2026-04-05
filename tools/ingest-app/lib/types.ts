export type CanonicalTopic = {
  id: string
  title: string
  filePath: string
  summary: string
  keywords: string[]
}

export type SourceExtract = {
  url: string
  title: string
  contentType: string
  text: string
  excerpt: string
}

export type TopicSelection = {
  topicIds: string[]
  rationale: string
}

export type TopicUpdate = {
  topicId: string
  markdown: string
}

export type ProposalFile = {
  path: string
  markdown: string
  previousMarkdown: string | null
  diff: string
  changeType: "create" | "update"
}

export type IngestProposal = {
  id: string
  createdAt: string
  urls: string[]
  sourceTitle: string
  sourceSlug: string
  summary: string
  selectedTopicIds: string[]
  rationale: string
  commitMessage: string
  files: ProposalFile[]
  warnings: string[]
}
