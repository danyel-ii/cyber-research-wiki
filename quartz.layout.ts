import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.SiteNav({
      title: "Cybersecurity Research Wiki",
      links: [
        { text: "Home", href: "index" },
        { text: "Topics", href: "topics/index" },
        { text: "Start Here", href: "topics/penetration-testing" },
        { text: "Sources", href: "sources/index" },
        { text: "Frameworks", href: "frameworks/index" },
      ],
    }),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Home: "index",
      "Start Here": "topics/penetration-testing",
      Topics: "topics/index",
      Sources: "sources/index",
      Frameworks: "frameworks/index",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) =>
        ![
          "tags",
          "paths",
          "templates",
          "analyses",
          "entities",
          "overview",
          "scope",
          "taxonomy",
          "log",
        ].includes(node.slugSegment),
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) =>
        ![
          "tags",
          "paths",
          "templates",
          "analyses",
          "entities",
          "overview",
          "scope",
          "taxonomy",
          "log",
        ].includes(node.slugSegment),
    }),
  ],
  right: [],
}
