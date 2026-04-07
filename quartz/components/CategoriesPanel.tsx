import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { siteCategories } from "../data/categories"

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
          {siteCategories.map((topic) => {
            const slug = topic.filePath.replace(/^wiki\//, "").replace(/\.md$/, "")
            const isActive = activeCategories.has(topic.id)
            return (
              <li>
                <a
                  href={resolveRelative(currentSlug, slug)}
                  class={isActive ? "internal active-category category-card" : "internal category-card"}
                >
                  <strong>{topic.title}</strong>
                  <p>{topic.summary}</p>
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
      gap: 0.8rem;
    }

    .categories-panel a.category-card {
      display: block;
      padding: 0.8rem 0.9rem;
      border-radius: 0.8rem;
      border: 1px solid color-mix(in srgb, var(--lightgray) 82%, transparent);
      background: color-mix(in srgb, var(--light) 96%, transparent);
      text-decoration: none;
      transition: border-color 120ms ease, transform 120ms ease, background 120ms ease;
    }

    .categories-panel a.category-card strong {
      display: block;
      margin-bottom: 0.3rem;
      font-size: 0.98rem;
      line-height: 1.2;
    }

    .categories-panel a.category-card p {
      margin: 0;
      color: var(--gray);
      font-size: 0.88rem;
      line-height: 1.35;
    }

    .categories-panel a.active-category {
      background: color-mix(in srgb, var(--secondary) 11%, var(--light) 89%);
      border-color: color-mix(in srgb, var(--secondary) 38%, var(--lightgray) 62%);
    }

    .categories-panel a.category-card:hover,
    .categories-panel a.category-card:focus-visible {
      transform: translateY(-1px);
      border-color: color-mix(in srgb, var(--secondary) 40%, var(--lightgray) 60%);
    }
  `

  return CategoriesPanel
}) satisfies QuartzComponentConstructor
