import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative, simplifySlug } from "../util/path"

function asSlug(pathValue: string): string {
  return pathValue.replace(/^wiki\//, "").replace(/\.md$/, "")
}

export default (() => {
  const RelatedArticles: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
    const currentSlug = fileData.slug!
    const pageKind = fileData.frontmatter?.pageKind
    const categoryId = typeof fileData.frontmatter?.categoryId === "string" ? fileData.frontmatter.categoryId : null
    const relatedFrontmatter = Array.isArray(fileData.frontmatter?.related)
      ? (fileData.frontmatter.related as string[])
      : []

    let items: Array<{ slug: string; title: string; summary?: string }> = []

    if (pageKind === "category" && categoryId) {
      items = allFiles
        .filter((file) => Array.isArray(file.frontmatter?.categories) && (file.frontmatter.categories as string[]).includes(categoryId))
        .map((file) => ({
          slug: simplifySlug(file.slug!),
          title: (file.frontmatter?.title as string | undefined) ?? file.slug!,
          summary: file.frontmatter?.summary as string | undefined,
        }))
    } else if (relatedFrontmatter.length > 0) {
      items = relatedFrontmatter
        .map((entry) => {
          const targetSlug = asSlug(entry)
          const match = allFiles.find((file) => simplifySlug(file.slug!) === simplifySlug(targetSlug))
          if (!match) return null
          return {
            slug: simplifySlug(match.slug!),
            title: (match.frontmatter?.title as string | undefined) ?? match.slug!,
            summary: match.frontmatter?.summary as string | undefined,
          }
        })
        .filter((item): item is { slug: string; title: string; summary?: string } => Boolean(item))
    }

    if (items.length === 0) return null

    return (
      <div class={classNames(displayClass, "related-articles")}>
        <h3>{pageKind === "category" ? "Articles in This Category" : "Related Articles"}</h3>
        <ul>
          {items.map((item) => (
            <li>
              <a href={resolveRelative(currentSlug, item.slug)} class="internal">
                {item.title}
              </a>
              {item.summary ? <p>{item.summary}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  RelatedArticles.css = `
    .related-articles {
      border: 1px solid var(--lightgray);
      border-radius: 0.8rem;
      padding: 1rem;
      background: color-mix(in srgb, var(--light) 94%, transparent);
    }

    .related-articles h3 {
      margin: 0 0 0.8rem;
    }

    .related-articles ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    .related-articles li {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .related-articles p {
      margin: 0;
      color: var(--gray);
      font-size: 0.92rem;
    }
  `

  return RelatedArticles
}) satisfies QuartzComponentConstructor
