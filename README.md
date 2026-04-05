# Cybersecurity Research Wiki

This repo now has two distinct layers:

- `wiki/` is the published wiki
- `tools/ingest-app/` is the local authoring app

The content model has been reset. The public wiki keeps only an eight-category backbone, and all substantive content is expected to be added as manually written articles under `wiki/articles/`.

## Wiki model

The stable backbone is:

- `penetration-testing`
- `pentest-workflow`
- `rules-of-engagement`
- `kali-linux`
- `practical-kali-linux`
- `kali-as-an-assessment-environment`
- `web-testing`
- `owasp-wstg`

Those category pages are the reader-facing map. New articles can belong to multiple categories. When a new article is added, the app updates:

- the article file in `wiki/articles/`
- the selected category pages
- the article index at `wiki/articles/index.md`
- related-article links
- `wiki/log.md`

## Local authoring app

Start the app with:

```bash
npm ci
npm run ingest-ui
```

Then open:

```text
http://localhost:4318/admin/new-article
```

### Workflow

1. Click `Add New Article` or open `/admin/new-article`.
2. Enter the article title, summary, body, categories, and optional references.
3. Review the proposed file diffs.
4. Approve the proposal.
5. Let the app write the files and optionally create a git commit.

The app is intentionally constrained:

- it does not create new categories
- it writes new content into `wiki/articles/`
- it keeps cross-references attached to the existing eight-category map
- it is meant to stay private and local rather than publicly writable

## Quartz site

Quartz publishes the `wiki/` directory.

```bash
npm run build
npm run serve
```

The site chrome is now intentionally minimal:

- top header with navigation and `Add New Article`
- left sidebar with the eight categories
- right sidebar with related articles

The header action points to the private local authoring route. The public site and private authoring flow now share the same visual shell, but only the local route can write content.

## Repo layout

```text
cyber-research-wiki/
  AGENTS.md
  README.md
  raw/
  wiki/
    index.md
    log.md
    articles/
    topics/
    frameworks/
  tools/
    ingest-app/
```

## Notes

- `raw/` remains immutable source storage.
- `wiki/` remains the compiled knowledge layer.
- The current authoring app is local-first. The public Quartz site is read-only.
