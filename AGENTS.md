# AGENTS.md

## Purpose
Maintain a persistent markdown research wiki in `wiki/` from immutable source material in `raw/`.

This repository is for **authorized cybersecurity research**. It covers topics such as cybersecurity, penetration testing, red teaming, security assessment methodology, adversary behaviors, defenses, and legal/ethical boundaries.

## Non-negotiable rules
- Never modify files under `raw/`.
- Treat `wiki/` as the compiled knowledge layer.
- Update `wiki/index.md` and `wiki/log.md` after every substantive ingest, analysis creation, or lint pass.
- Prefer incremental edits over broad rewrites.
- Preserve stable filenames and internal links where possible.
- Do not silently remove contradictions. Record them and update affected pages.
- Do not turn this repo into an exploit dump. Keep it focused on research, methodology, evidence, detections, mitigations, and authorized testing.

## Research stance
Favor professional and official organizing schemes over pop-culture labels.

Use these as the primary axes of organization:
- authorization status
- assessment type (assessment, pentest, red team, code review, threat modeling, audit)
- target domain (web, cloud, identity, network, endpoint, mobile, ICS, AI)
- adversary lifecycle / ATT&CK mapping
- evidence quality and provenance
- defensive implication (detection, mitigation, hardening, validation)

Treat `gray/grey hat` and `red hat` as **terms to document**, not as first-class operational categories.

## Source quality defaults
Prefer, in this order when possible:
1. official standards and guidance (NIST, CISA, OWASP, MITRE)
2. primary vendor or project documentation
3. high-quality technical research writeups
4. opinion pieces and summaries

When sources disagree:
- preserve the disagreement
- note which claim is newer or better supported
- avoid flattening uncertainty into a false consensus

## Page families
- `wiki/sources/` — source summary pages with provenance and extracted claims
- `wiki/topics/` — synthesized concept and methodology pages
- `wiki/entities/` — organizations, tools, products, standards, threat actors, people if needed
- `wiki/frameworks/` — pages dedicated to frameworks such as ATT&CK, WSTG, CVSS, CWE, etc.
- `wiki/analyses/` — durable answers and comparisons created during research
- `wiki/templates/` — page templates only

## Ingest workflow
1. Read the new source from `raw/`.
2. Create or update a page in `wiki/sources/`.
3. Update relevant topic, framework, and entity pages.
4. Capture contradictions, uncertainty, and open questions.
5. Add or improve internal links.
6. Update `wiki/index.md`.
7. Append a timestamped entry to `wiki/log.md`.

## Query workflow
1. Read `wiki/index.md` first.
2. Read the smallest set of relevant pages needed.
3. Synthesize from the wiki, not from memory.
4. When the result is reusable, save it to `wiki/analyses/`.
5. If a page is created or materially changed, update `wiki/index.md` and `wiki/log.md`.

## Lint workflow
Check for:
- orphan pages
- stale claims superseded by newer evidence
- broken or weak cross-links
- concepts that appear repeatedly but lack their own page
- unsupported claims with thin provenance
- duplicate pages that should be merged or split
- open questions that now have enough evidence to resolve

Prefer small corrective edits. Log every lint pass.

## Writing style
- Markdown only
- Kebab-case filenames
- Clear section headings
- Dense but readable summaries
- Explicit internal links
- Provenance visible on factual pages
- ISO dates (`YYYY-MM-DD`)

## Canonical terminology defaults
Use the more standard term when both appear:
- `gray hat` preferred over `grey hat` in filenames; mention both in prose
- `red team` preferred over `red hat` for professional adversary-emulation work
- `penetration testing` preferred over `ethical hacking` in formal pages unless quoting a source

