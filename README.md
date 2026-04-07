# Cybersecurity Research Wiki

This repo now centers on a single public layer:

- `wiki/` is the published wiki

The content model has been reset. The public wiki now uses a six-phase backbone, and all substantive content is expected to be added as manually written articles under `wiki/articles/`.

## Wiki model

The stable backbone is:

- `recon`
- `web`
- `exploit`
- `creds`
- `post`
- `pivot`

Those category pages are the reader-facing map. Articles can belong to multiple categories, and the category cards in the site chrome provide a quick flash-intro for what each phase covers.

## Quartz site

Quartz publishes the `wiki/` directory.

```bash
npm run build
npm run serve
```

The site chrome is intentionally minimal:

- top header with navigation only
- left sidebar with the six categories
- right sidebar with related articles

Each category in the sidebar is shown as a card with a short intro so readers can understand the phase before clicking into it.

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
```

## Notes

- `raw/` remains immutable source storage.
- `wiki/` remains the compiled knowledge layer.
- The published site is read-only.
