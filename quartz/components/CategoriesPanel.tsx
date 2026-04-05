import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { canonicalTopics } from "../../tools/ingest-app/lib/canonical-topics"

export default (() => {
  const CategoriesPanel: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const currentSlug = fileData.slug!
    const activeCategories = new Set<string>()

    if (typeof fileData.frontmatter?.categoryId === "string") {
      activeCategories.add(fileData.frontmatter.categoryId)
    }

    if (Array.isArray(fileData.frontmatter?.categories)) {
      for (const category of fileData.frontmatter.categories as string[]) {
        activeCategories.add(category)
      }
    }

    return (
      <div class={classNames(displayClass, "categories-panel")}>
        <h3>Categories</h3>
        <ul>
          {canonicalTopics.map((topic) => {
            const slug = topic.filePath.replace(/^wiki\//, "").replace(/\.md$/, "")
            const isActive = activeCategories.has(topic.id)
            return (
              <li>
                <a
                  href={resolveRelative(currentSlug, slug)}
                  class={isActive ? "internal active-category" : "internal"}
                >
                  {topic.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  CategoriesPanel.css = `
    .categories-panel {
      border: 1px solid var(--lightgray);
      border-radius: 0.8rem;
      padding: 1rem;
      background: color-mix(in srgb, var(--light) 92%, transparent);
    }

    .categories-panel h3 {
      margin: 0 0 0.75rem;
    }

    .categories-panel ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .categories-panel a {
      display: block;
      text-decoration: none;
      padding: 0.35rem 0.45rem;
      border-radius: 0.45rem;
    }

    .categories-panel a.active-category {
      background: color-mix(in srgb, var(--secondary) 14%, transparent);
      font-weight: 700;
    }
  `

  return CategoriesPanel
}) satisfies QuartzComponentConstructor
