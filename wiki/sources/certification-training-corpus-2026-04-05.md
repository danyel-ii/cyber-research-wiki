# Certification Training Corpus (2026-04-05)

## Overview
This source page summarizes an external corpus of certification-oriented training and documentation pages captured on 2026-04-05. The corpus is mixed-quality but useful for understanding how commercial and community training providers frame introductory and intermediate cybersecurity learning, especially around CEH-style ethical hacking coverage, CompTIA Network+/Security+ study structure, and Burp Suite documentation with explicit authorization warnings.

## Bibliographic details
- Title: Certification and training website corpus snapshot
- Author / organization: Mixed; includes Cybrary, Professor Messer, PortSwigger, and other training or documentation sources
- Date: 2026-04-05 capture; individual pages carry their own dates where present
- Source type: mixed vendor documentation, training-course landing pages, and certification-adjacent material
- Raw file path: `/Users/danyel-ii/IngestionEngine/controlled-ingestion-codex-kit/data/projects/certs/pages`
- Reliability notes: uneven corpus; strongest where pages describe official or maintained documentation and structured course/exam framing, weaker where pages are marketing-heavy, empty, stale, or duplicated from unrelated projects

## Key points
- The corpus directly supports a breadth-first, certification-oriented learning lane for CEH-style and CompTIA-style study.
- It provides stronger evidence for training-path structure than for certification authority or exam validity.
- PortSwigger's Burp documentation contributes a clear authorization and risk warning that strengthens the web-application-testing path.
- Professor Messer pages provide useful evidence about current Network+ and Security+ course structure and the role of exam objectives in study planning.
- The corpus does not, by itself, strongly evidence OSCP, GPEN, CPTS, OSEE, or CHFI specifics in a way that should override the wiki's current cautious mapping.

## Extracted claims
- Claim: CEH-style preparation is commonly framed as a broad introductory offensive-security path covering reconnaissance, enumeration, system hacking, web applications, wireless, and cloud topics.
  - Support level: moderate
  - Notes: Supported by Cybrary's penetration-testing and ethical-hacking prep page; useful as a market-facing training framing, but not an official EC-Council exam specification.
- Claim: CompTIA-oriented study ecosystems emphasize exam-objective alignment, version-specific materials, and mixed free/premium study resources.
  - Support level: moderate
  - Notes: Supported by Professor Messer's Network+ and Security+ pages and exam-objectives page; stronger for study structure than for certification comparison.
- Claim: Burp Suite documentation explicitly warns users to test only with authorization and to understand the risk of damaging vulnerable targets.
  - Support level: strong
  - Notes: Supported by PortSwigger documentation; directly relevant to safe use framing in the wiki.
- Claim: Evidence handling concepts such as chain of custody appear in mainstream certification-oriented security training, not only in specialist forensic tracks.
  - Support level: moderate
  - Notes: Supported by Professor Messer's Security+ chain-of-custody page.
- Claim: Some captured pages are empty or too thin to support durable wiki claims.
  - Support level: strong
  - Notes: TryHackMe path pages in this corpus snapshot appear empty and should not be treated as evidence.

## Relevance to the wiki
- Affects: [[topics/penetration-testing]]
- Affects: [[topics/web-testing]]
- Affects: [[frameworks/owasp-wstg]]
- Affects: [[topics/rules-of-engagement]]
- Affects: [[analyses/certification-to-learning-path-map]]

## Tensions / contradictions
- The corpus is strongest on learning-product framing and weaker on authoritative certification scope.
- Some pages push "ethical hacking" language, while this wiki prefers the more formal term [[topics/penetration-testing]] unless quoting sources.
- The corpus improves coverage for CEH-like and CompTIA-like routes more than it does for OffSec, GIAC, HTB, or advanced exploit-development certifications.

## Open questions
- Which official vendor pages should be ingested next to support OSCP, GPEN, CPTS, OSEE, BSCP, and CHFI directly?
- Should the wiki create dedicated entity pages for training providers only when they materially shape curriculum decisions?
- Which certification claims should be backed by official exam-objective or exam-guide sources rather than training-provider summaries?

## Suggested follow-up pages to update
- [[topics/penetration-testing]]
- [[topics/web-testing]]
- [[frameworks/owasp-wstg]]
- [[topics/rules-of-engagement]]
- [[analyses/certification-to-learning-path-map]]
