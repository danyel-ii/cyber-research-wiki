import { dedent } from "./utils"

const OPENAI_API_URL = "https://api.openai.com/v1/responses"

function requireApiKey(): string {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set")
  }
  return apiKey
}

export function openAiEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY)
}

export async function callOpenAiJson<T>({
  schemaName,
  schema,
  system,
  user,
}: {
  schemaName: string
  schema: Record<string, unknown>
  system: string
  user: string
}): Promise<T> {
  const apiKey = requireApiKey()
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: dedent(system) }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: dedent(user) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          schema,
          strict: true,
        },
      },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`OpenAI request failed: ${response.status} ${response.statusText}\n${body}`)
  }

  const data = (await response.json()) as { output_text?: string }
  if (!data.output_text) {
    throw new Error("OpenAI response did not include output_text")
  }

  return JSON.parse(data.output_text) as T
}
