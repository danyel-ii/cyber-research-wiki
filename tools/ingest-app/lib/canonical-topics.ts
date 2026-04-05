import type { CanonicalTopic } from "./types"

export const canonicalTopics: CanonicalTopic[] = [
  {
    id: "penetration-testing",
    title: "Penetration Testing",
    filePath: "wiki/topics/penetration-testing.md",
    summary: "Main article on penetration testing as an authorized security-testing practice.",
    keywords: [
      "penetration testing",
      "pentest",
      "ethical hacking",
      "assessment",
      "authorized testing",
      "validation",
    ],
  },
  {
    id: "pentest-workflow",
    title: "Pentest Workflow",
    filePath: "wiki/topics/pentest-workflow.md",
    summary: "Main article on sequencing, evidence, and reporting in pentest work.",
    keywords: [
      "workflow",
      "reconnaissance",
      "enumeration",
      "validation",
      "evidence",
      "reporting",
      "methodology",
    ],
  },
  {
    id: "rules-of-engagement",
    title: "Rules of Engagement",
    filePath: "wiki/topics/rules-of-engagement.md",
    summary: "Main article on scope, exclusions, communications, and safety boundaries.",
    keywords: [
      "rules of engagement",
      "scope",
      "authorization",
      "communications",
      "evidence handling",
      "incident handling",
      "boundaries",
    ],
  },
  {
    id: "kali-linux",
    title: "Kali Linux",
    filePath: "wiki/topics/kali-linux.md",
    summary: "Main article on Kali Linux as a security-focused Linux distribution.",
    keywords: [
      "kali",
      "kali linux",
      "distribution",
      "images",
      "metapackages",
      "nethunter",
      "offsec",
    ],
  },
  {
    id: "practical-kali-linux",
    title: "Practical Kali Linux",
    filePath: "wiki/topics/practical-kali-linux.md",
    summary: "Applied use of Kali Linux in labs and training.",
    keywords: ["virtual machine", "vm", "lab", "practice", "installer image", "live image", "tooling"],
  },
  {
    id: "kali-as-an-assessment-environment",
    title: "Kali as an Assessment Environment",
    filePath: "wiki/topics/kali-as-an-assessment-environment.md",
    summary: "Kali Linux understood as an environment rather than a methodology.",
    keywords: ["assessment environment", "repeatability", "portability", "environment", "custom image"],
  },
  {
    id: "web-testing",
    title: "Web Testing",
    filePath: "wiki/topics/web-testing.md",
    summary: "Main article on web application testing inside pentesting.",
    keywords: [
      "web testing",
      "web application",
      "http",
      "authentication",
      "session",
      "burp",
      "api",
    ],
  },
  {
    id: "owasp-wstg",
    title: "OWASP WSTG",
    filePath: "wiki/frameworks/owasp-wstg.md",
    summary: "Framework anchor for web-testing methodology.",
    keywords: ["owasp", "wstg", "web security testing guide", "framework", "test cases"],
  },
]

export function getCanonicalTopic(id: string): CanonicalTopic | undefined {
  return canonicalTopics.find((topic) => topic.id === id)
}
