export type SiteCategory = {
  id: string
  title: string
  filePath: string
  summary: string
}

export const siteCategories: SiteCategory[] = [
  {
    id: "recon",
    title: "Recon",
    filePath: "wiki/topics/recon.md",
    summary: "Discovery, attack-surface mapping, and target understanding before deeper validation starts.",
  },
  {
    id: "web",
    title: "Web",
    filePath: "wiki/topics/web.md",
    summary: "Web applications, APIs, sessions, and request/response behavior as the core testing surface.",
  },
  {
    id: "exploit",
    title: "Exploit",
    filePath: "wiki/topics/exploit.md",
    summary: "Controlled proof of weaknesses through payloads, frameworks, and exploit-adjacent tooling.",
  },
  {
    id: "creds",
    title: "Creds",
    filePath: "wiki/topics/creds.md",
    summary: "Credential capture, relay, cracking, and identity material as an operational category.",
  },
  {
    id: "post",
    title: "Post",
    filePath: "wiki/topics/post.md",
    summary: "Post-access context gathering, privilege work, and evidence-rich follow-on analysis.",
  },
  {
    id: "pivot",
    title: "Pivot",
    filePath: "wiki/topics/pivot.md",
    summary: "Movement across hosts and networks through relays, tunnels, remote execution, and traversal paths.",
  },
]
