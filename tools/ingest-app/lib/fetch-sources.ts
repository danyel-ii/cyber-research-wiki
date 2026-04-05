import { trimLength } from "./utils"
import type { SourceExtract } from "./types"

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<\/(p|div|section|article|li|h1|h2|h3|h4|h5|h6|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function extractTitle(html: string, fallbackUrl: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (titleMatch?.[1]) {
    return titleMatch[1].replace(/\s+/g, " ").trim()
  }

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1Match?.[1]) {
    return h1Match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  }

  return fallbackUrl
}

export async function fetchSource(url: string): Promise<SourceExtract> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "cyber-research-wiki-ingest-ui/0.1",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get("content-type") ?? "application/octet-stream"
  const rawText = await response.text()
  const isHtml = contentType.includes("text/html")
  const text = isHtml ? stripHtml(rawText) : rawText.trim()
  const title = isHtml ? extractTitle(rawText, url) : url

  return {
    url,
    title,
    contentType,
    text: trimLength(text, 16000),
    excerpt: trimLength(text, 500),
  }
}

export async function fetchSources(urls: string[]): Promise<SourceExtract[]> {
  const uniqueUrls = [...new Set(urls.map((url) => url.trim()).filter(Boolean))]
  return Promise.all(uniqueUrls.map((url) => fetchSource(url)))
}
