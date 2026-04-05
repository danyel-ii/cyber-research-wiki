---
name: ingest-source
description: Ingest one raw cybersecurity source into the wiki by creating a source summary, propagating updates, and logging the change.
---

# Ingest Source

Use this skill when asked to process a single file from `raw/` into the research wiki.

## Steps
1. Read the raw source.
2. Create or update a page under `wiki/sources/`.
3. Update all obviously affected topic, framework, and entity pages.
4. Record contradictions, uncertainty, and open questions instead of smoothing them away.
5. Update `wiki/index.md` if any new pages are created.
6. Append a dated entry to `wiki/log.md`.

## Quality bar
- Prefer precise claims over generic summary.
- Make page links useful.
- Do not over-create pages for every minor mention.
- Keep unauthorized or offensive operator detail out of the wiki.

## Definition of done
- source summary exists
- impacted pages updated
- index updated if needed
- log entry appended

