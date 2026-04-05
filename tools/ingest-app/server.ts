import { createServer, type IncomingMessage, type ServerResponse } from "node:http"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { applyProposal, createProposal } from "./lib/proposal"
import { canonicalTopics } from "./lib/canonical-topics"
import type { ArticleInput } from "./lib/types"

const publicDir = path.join(process.cwd(), "tools", "ingest-app", "public")
const port = Number(process.env.INGEST_UI_PORT ?? 4318)

function json(body: unknown, status = 200): ResponseInit & { body: string } {
  return {
    status,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }
}

async function serveStatic(relativePath: string): Promise<{ body: Buffer; contentType: string }> {
  const filePath = path.join(publicDir, relativePath)
  const body = await readFile(filePath)
  const ext = path.extname(filePath)
  const contentType =
    ext === ".css"
      ? "text/css; charset=utf-8"
      : ext === ".js"
        ? "text/javascript; charset=utf-8"
        : "text/html; charset=utf-8"
  return { body, contentType }
}

async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T
}

const server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
  try {
    if (!request.url || !request.method) {
      const result = json({ error: "Invalid request" }, 400)
      response.writeHead(result.status, result.headers)
      response.end(result.body)
      return
    }

    const url = new URL(request.url, `http://${request.headers.host ?? `localhost:${port}`}`)

    if (
      (request.method === "GET" || request.method === "HEAD") &&
      (url.pathname === "/" || url.pathname === "/new-article" || url.pathname === "/admin" || url.pathname === "/admin/new-article")
    ) {
      const file = await serveStatic("index.html")
      response.writeHead(200, { "Content-Type": file.contentType })
      response.end(request.method === "HEAD" ? undefined : file.body)
      return
    }

    if ((request.method === "GET" || request.method === "HEAD") && url.pathname.startsWith("/assets/")) {
      const file = await serveStatic(url.pathname.replace("/assets/", ""))
      response.writeHead(200, { "Content-Type": file.contentType })
      response.end(request.method === "HEAD" ? undefined : file.body)
      return
    }

    if (request.method === "GET" && url.pathname === "/api/topics") {
      const result = json({
        topics: canonicalTopics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          summary: topic.summary,
          role: topic.role,
          filePath: topic.filePath,
        })),
      })
      response.writeHead(result.status, result.headers)
      response.end(result.body)
      return
    }

    if (request.method === "POST" && url.pathname === "/api/propose") {
      const body = await readJsonBody<ArticleInput>(request)
      if (!body.title?.trim() || !body.body?.trim() || !Array.isArray(body.categories) || body.categories.length === 0) {
        const result = json({ error: "Title, body, and at least one category are required." }, 400)
        response.writeHead(result.status, result.headers)
        response.end(result.body)
        return
      }

      const proposal = await createProposal({
        ...body,
        title: body.title.trim(),
        summary: body.summary?.trim() || body.body.trim().split("\n")[0].slice(0, 180),
        body: body.body.trim(),
        references: body.references?.trim() ?? "",
      })
      const result = json({ proposal })
      response.writeHead(result.status, result.headers)
      response.end(result.body)
      return
    }

    if (request.method === "POST" && url.pathname === "/api/apply") {
      const body = await readJsonBody<{ proposalId?: string; commit?: boolean }>(request)
      if (!body.proposalId) {
        const result = json({ error: "proposalId is required." }, 400)
        response.writeHead(result.status, result.headers)
        response.end(result.body)
        return
      }

      const resultBody = await applyProposal(body.proposalId, body.commit ?? true)
      const result = json(resultBody)
      response.writeHead(result.status, result.headers)
      response.end(result.body)
      return
    }

    const result = json({ error: "Not found" }, 404)
    response.writeHead(result.status, result.headers)
    response.end(result.body)
  } catch (error) {
    const result = json({ error: error instanceof Error ? error.message : "Unknown server error" }, 500)
    response.writeHead(result.status, result.headers)
    response.end(result.body)
  }
})

server.listen(port, () => {
  console.log(`Article app running at http://localhost:${port}/admin/new-article`)
})
