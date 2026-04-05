# Kali Linux Website Corpus (2026-04-05)

## Overview
This source page summarizes a staged corpus of Kali Linux and related OffSec web pages captured on 2026-04-05 from an external ingestion workspace. The corpus is useful because it documents how Kali Linux presents itself as a purpose-built penetration-testing distribution, how it structures packaging and image choices, and how it supports multiple deployment environments including bare metal, virtual machines, containers, cloud, WSL, ARM, and NetHunter mobile use.

## Bibliographic details
- Title: Kali Linux website corpus snapshot
- Author / organization: Kali Linux and OffSec
- Date: 2026-04-05 capture; individual pages include their own update dates where present
- Source type: vendor and project documentation corpus
- Raw file path: `/Users/danyel-ii/IngestionEngine/controlled-ingestion-codex-kit/data/projects/kali-linux/pages`
- Reliability notes: primary vendor/project material with strong value for product capabilities and project positioning; weaker for comparative or superlative claims

## Key points
- Kali Linux is described as a purpose-built penetration-testing distribution rather than a generic Linux system with security tools added ad hoc.
- The project emphasizes flexible delivery models: installer images, live images, VMs, containers, cloud images, ARM builds, WSL, and NetHunter for mobile contexts.
- Packaging is organized through metapackages, which lets users install broad or narrow tool collections and tailor images to assessment needs.
- Kali documents an explicit custom image build path based on public build scripts and live-build/simple-cdd workflows.
- The corpus mixes product documentation with marketing language and adjacent OffSec material, so governance and branding relationships should be documented carefully rather than assumed.

## Extracted claims
- Claim: Kali Linux is positioned as a penetration-testing distribution intended for security professionals.
  - Support level: strong
  - Notes: Supported by the site homepage, features page, and documentation index.
- Claim: Kali supports multiple deployment and execution environments including bare metal, live media, VMs, containers, cloud, WSL, ARM, and mobile variants.
  - Support level: strong
  - Notes: Supported by `index.md`, `get-kali--index.md`, `docs--index.md`, and `docs--nethunter--index.md`.
- Claim: Kali uses metapackages to control software scope and provide install profiles for different use cases.
  - Support level: strong
  - Notes: Supported by `docs--general-use--metapackages--index.md`.
- Claim: Kali publishes and uses public build scripts for official image generation and custom ISO creation.
  - Support level: strong
  - Notes: Supported by `features--index.md` and `docs--development--live-build-a-custom-kali-iso--index.md`.
- Claim: The project recommends the standard installer image for most users and treats weekly or alternative images as situational choices.
  - Support level: strong
  - Notes: Supported by `docs--introduction--what-image-to-download--index.md`.
- Claim: Kali NetHunter extends the Kali ecosystem into Android-based mobile testing.
  - Support level: moderate
  - Notes: Supported by `get-kali--index.md` and `docs--nethunter--index.md`; some detailed capability descriptions are highly operational and should be abstracted carefully in this wiki.
- Claim: Kali is presented as an "industry standard" platform.
  - Support level: weak
  - Notes: This is a vendor superlative from `features--index.md` and should not be treated as independently established fact.

## Relevance to the wiki
- Affects: [[topics/penetration-testing]]
- Affects: [[topics/rules-of-engagement]]
- Affects: [[topics/kali-linux]]
- Affects: [[topics/practical-kali-linux]]
- Affects: [[topics/kali-as-an-assessment-environment]]
- Affects: [[entities/offsec]]

## Tensions / contradictions
- The corpus combines durable technical documentation with marketing claims; capability descriptions are stronger than quality or market-position claims.
- The corpus makes Kali broadly available across many environments, but portability and ease of access do not remove authorization, rules-of-engagement, or evidence-handling constraints.
- Some NetHunter material describes offensive mobile capabilities in detail; this wiki should keep only the higher-level research and assessment framing.

## Open questions
- What is the precise governance and branding relationship between Kali Linux and OffSec as stated in primary project documentation rather than adjacent marketing pages?
- Should the wiki create a dedicated topic page for mobile security testing platforms, with NetHunter treated as one ecosystem example?
- Which Kali claims are best corroborated later with Debian packaging, GitLab build-script, or release-history sources?

## Suggested follow-up pages to update
- [[topics/penetration-testing]]
- [[topics/rules-of-engagement]]
- [[topics/kali-linux]]
- [[topics/practical-kali-linux]]
- [[topics/kali-as-an-assessment-environment]]
- [[entities/offsec]]
