import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/readNext.scss"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"

type ReadNextEntry = {
  label?: string
  path?: string
  title?: string
}

interface ReadNextOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: ReadNextOptions = {
  hideWhenEmpty: true,
}

function normalizeEntries(value: unknown): ReadNextEntry[] {
  if (!Array.isArray(value)) return []

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null
      const candidate = entry as ReadNextEntry
      if (!candidate.path) return null
      return candidate
    })
    .filter((entry): entry is ReadNextEntry => Boolean(entry))
}

export default ((opts?: Partial<ReadNextOptions>) => {
  const options: ReadNextOptions = { ...defaultOptions, ...opts }

  const ReadNext: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const entries = normalizeEntries(fileData.frontmatter?.readNext)
    if (options.hideWhenEmpty && entries.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "read-next")}>
        <h3>Read Next</h3>
        <ul>
          {entries.map((entry) => (
            <li>
              <span class="read-next-label">{entry.label ?? "Next"}</span>
              <a href={resolveRelative(fileData.slug!, entry.path!)} class="internal">
                {entry.title ?? entry.path}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  ReadNext.css = style
  return ReadNext
}) satisfies QuartzComponentConstructor
