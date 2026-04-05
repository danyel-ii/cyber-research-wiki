# Taxonomy

## Overview
This wiki uses a professional research taxonomy rather than organizing primarily around hacker "hat" labels.

## Primary organizing axes
1. **Authorization status** — authorized, disputed, unauthorized, historical case study
2. **Assessment type** — assessment, pentest, red team, code review, threat model, tabletop, audit
3. **Target domain** — web, API, cloud, identity, network, endpoint, mobile, ICS, AI
4. **Adversary behavior** — ATT&CK tactic/technique or comparable framework mapping
5. **Evidence quality** — primary, secondary, vendor, community, anecdotal
6. **Defensive implication** — prevention, detection, response, validation, hardening

## Terminology decisions
- Use `penetration testing` for formal testing work.
- Use `red teaming` for adversary-emulation exercises aimed at validating detection and response.
- Use `gray hat` as the canonical filename, while mentioning `grey hat` in prose where relevant.
- Document `red hat` as an informal label, not a core methodology term.

## Suggested lightweight tags
These are optional and may appear in prose, frontmatter, or Dataview later.

- `domain/web`
- `domain/cloud`
- `domain/identity`
- `method/pentest`
- `method/red-team`
- `method/threat-modeling`
- `evidence/primary`
- `evidence/vendor`
- `status/open-question`
- `status/contested`
- `ethics/authorized`
- `ethics/gray-hat`

## File placement heuristics
- Put source-specific takeaways in `sources/`.
- Put stable concepts in `topics/`.
- Put framework explanations in `frameworks/`.
- Put reusable answers in `analyses/`.
- Put organizations, products, standards, and named groups in `entities/` when they merit standalone pages.

## Tensions / contradictions
- Folk terminology is memorable but often too ambiguous for research organization.
- Formal frameworks can be clearer, but they may feel less intuitive to non-specialists.

