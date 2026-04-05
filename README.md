# Cybersecurity Research Wiki (Codex Scaffold)

A markdown-first research wiki for **authorized cybersecurity research**, **penetration testing**, **red teaming**, and related concepts.

This scaffold is designed for **VS Code + Codex** and keeps the system intentionally simple:

- `raw/` holds immutable source material.
- `wiki/` holds the compiled knowledge base.
- `AGENTS.md` files tell Codex how to behave.
- optional `.agents/skills/` packages repeated workflows.

## Repo layout

```text
cyber-research-wiki/
  AGENTS.md
  README.md
  raw/
    AGENTS.md
    inbox/
    sources/
  wiki/
    AGENTS.md
    index.md
    log.md
    overview.md
    scope.md
    taxonomy.md
    sources/
    topics/
    entities/
    frameworks/
    analyses/
    templates/
  .agents/
    skills/
      ingest-source/
        SKILL.md
      lint-wiki/
        SKILL.md
```

## How to use with Codex

Place Codex in the repo root and prompt with concrete actions such as:

- `Process raw/inbox/<file>.md into the wiki.`
- `Answer from the wiki only: compare penetration testing and red teaming.`
- `Run a lint pass on the wiki and fix small issues.`
- `Create a new topic page on attack surface management and link it properly.`

## Design choices

This version is intentionally opinionated in a few ways:

- It is a **research wiki**, not a general note dump.
- It is centered on **authorized testing, methodology, evidence, and synthesis**.
- It treats **grey/gray hat** and **red hat** as **contextual terms**, not the backbone taxonomy.
- It avoids making tooling, image handling, databases, or RAG infrastructure mandatory.

## Obsidian + Quartz

This repo now includes [Quartz](https://quartz.jzhao.xyz/) for publishing the `wiki/` directory as a static site.

- Obsidian source of truth: `wiki/`
- Website content directory: `wiki/`
- Website landing page: `wiki/home.md`, rendered at `/` through `wiki/index.md`
- Full page map: `wiki/wiki-index.md`

### Local commands

```bash
npm ci
npm run serve
```

Quartz is configured to build from `wiki/` rather than a separate `content/` folder:

```bash
npm run build
```

The GitHub Pages workflow lives at `.github/workflows/deploy.yml` and builds with Node 22 on pushes to `main`.

### Site chrome

Quartz now includes:

- a top navigation bar for `Home`, `Wiki Index`, `Topics`, `Sources`, `Frameworks`, and `Log`
- project-specific footer links instead of Quartz defaults
- optional custom-domain support via environment variables

### Custom domain

For the default GitHub Pages project-site path, no extra setup is required beyond `Settings -> Pages -> Source -> GitHub Actions`.

To switch to a custom domain:

1. In GitHub, add a repository variable named `QUARTZ_CUSTOM_DOMAIN` with your hostname, such as `research.example.com`.
2. Optionally set `QUARTZ_BASE_URL` too. If omitted, Quartz will use the custom domain value.
3. In `Settings -> Pages`, set the same custom domain.

When `QUARTZ_CUSTOM_DOMAIN` is present, Quartz emits a `CNAME` file automatically during the build.

## Starter workflow

1. Drop a source into `raw/inbox/`.
2. Ask Codex to ingest it.
3. Review the created/updated pages in `wiki/`.
4. Ask questions against the wiki.
5. Save good answers under `wiki/analyses/`.
6. Periodically run a lint pass.

## Good first sources

Seed the wiki with authoritative references before adding blogs or social posts. Good anchors include:

- NIST SP 800-115 for security testing and assessment
- OWASP WSTG for web application testing
- MITRE ATT&CK for adversary behavior mapping
- CISA red team and defense guidance
