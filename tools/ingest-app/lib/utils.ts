import { createHash, randomUUID } from "node:crypto"

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export function nowIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function proposalId(): string {
  return randomUUID()
}

export function hashShort(input: string): string {
  return createHash("sha1").update(input).digest("hex").slice(0, 8)
}

export function dedent(text: string): string {
  const lines = text.replace(/^\n/, "").split("\n")
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^ */)?.[0].length ?? 0)
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0
  return lines.map((line) => line.slice(minIndent)).join("\n")
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function trimLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}
