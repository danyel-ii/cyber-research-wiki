import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"

interface Options {
  title?: string
  links: Array<{ text: string; href: string }>
}

export default ((opts: Options) => {
  const SiteNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const currentSlug = fileData.slug!

    return (
      <nav class="site-nav" aria-label="Site">
        <div class="site-nav-inner">
          <a class="site-nav-brand" href={resolveRelative(currentSlug, "index")}>
            {opts.title ?? "Home"}
          </a>
          <ul class="site-nav-links">
            {opts.links.map((link) => (
              <li>
                <a href={resolveRelative(currentSlug, link.href)}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  SiteNav.css = `
    .site-nav {
      margin: 0 0 1.5rem 0;
      padding: 0.85rem 1rem;
      border: 1px solid var(--lightgray);
      border-radius: 0.9rem;
      background: color-mix(in srgb, var(--light) 88%, var(--secondary) 12%);
    }

    .site-nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .site-nav-brand {
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .site-nav-links {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
      margin: 0;
      padding: 0;
    }

    .site-nav-links a {
      color: var(--dark);
      text-decoration: none;
      border-bottom: 1px solid transparent;
    }

    .site-nav-links a:hover,
    .site-nav-links a:focus-visible,
    .site-nav-brand:hover,
    .site-nav-brand:focus-visible {
      color: var(--secondary);
      border-bottom-color: var(--secondary);
    }
  `

  return SiteNav
}) satisfies QuartzComponentConstructor
