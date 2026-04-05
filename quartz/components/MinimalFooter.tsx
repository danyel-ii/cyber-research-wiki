import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"

export default (() => {
  const MinimalFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const currentSlug = fileData.slug!
    return (
      <footer class="minimal-footer">
        <a href={resolveRelative(currentSlug, "topics/index")}>Categories</a>
        <a href={resolveRelative(currentSlug, "articles/index")}>Articles</a>
      </footer>
    )
  }

  MinimalFooter.css = `
    .minimal-footer {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--lightgray);
      color: var(--gray);
    }

    .minimal-footer a {
      text-decoration: none;
    }
  `

  return MinimalFooter
}) satisfies QuartzComponentConstructor
