import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const repoBaseUrl = "danyel-ii.github.io/cyber-research-wiki"
const baseUrl = process.env.QUARTZ_BASE_URL || process.env.QUARTZ_CUSTOM_DOMAIN || repoBaseUrl
const useCustomDomain = Boolean(process.env.QUARTZ_CUSTOM_DOMAIN)

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Cybersecurity Research Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    // Set QUARTZ_BASE_URL for project-site builds or QUARTZ_CUSTOM_DOMAIN for a custom domain.
    baseUrl,
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Sans",
        body: "IBM Plex Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f3ee",
          lightgray: "#ddd7cc",
          gray: "#a0988b",
          darkgray: "#4f4a43",
          dark: "#1f2428",
          secondary: "#0b5f6d",
          tertiary: "#7c8f4f",
          highlight: "rgba(11, 95, 109, 0.12)",
          textHighlight: "#f2dd6e88",
        },
        darkMode: {
          light: "#111416",
          lightgray: "#2f3438",
          gray: "#7b848c",
          darkgray: "#d8dadc",
          dark: "#f3f4f5",
          secondary: "#63b3c2",
          tertiary: "#9fba61",
          highlight: "rgba(99, 179, 194, 0.16)",
          textHighlight: "#c7b93a88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      ...(useCustomDomain ? [Plugin.CNAME()] : []),
      // Disabled by default to keep CI build times down.
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
