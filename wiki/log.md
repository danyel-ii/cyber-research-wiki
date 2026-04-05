# Log

## [2026-04-05] structure | Learner-first reframe
- Created: [[topics/pentest-workflow]], [[topics/kali-linux-for-pentesting]]
- Created: [[paths/learn-penetration-testing]], [[paths/learn-kali-linux]], [[paths/learn-web-testing]], [[paths/learn-certification-routes]]
- Updated: [[topics/penetration-testing]], [[index]], [[paths/index]], [[wiki-index]], [[overview]]
- Notes: Reframed the wiki around learner-facing subject paths so readers can study penetration testing and Kali Linux directly without being forced through wiki-maintenance material.

## [2026-04-05] ingest | Certification training corpus
- Created: [[sources/certification-training-corpus-2026-04-05]]
- Created: [[analyses/certification-corpus-ingest-audit-2026-04-05]]
- Updated: [[analyses/certification-to-learning-path-map]]
- Updated: [[paths/foundational-certifications]], [[paths/network-and-internal-testing]], [[paths/web-application-testing]], [[paths/forensics-and-ir]], [[paths/evidence-and-synthesis]]
- Updated: [[index]], [[wiki-index]]
- Notes: Incorporated a mixed external certification corpus from `/Users/danyel-ii/IngestionEngine/controlled-ingestion-codex-kit/data/projects/certs/pages`; strongest gains were CEH-style breadth, CompTIA-style study structure, Burp authorization framing, and evidence-handling concepts, while OSCP/GPEN/CPTS/OSEE/CHFI remained under-evidenced.

## [2026-04-05] lint | Post-certification-ingest health check
- Updated: [[log]]
- Notes: Audited the ingest outcome and found the curriculum stronger but still uneven; no major structural breakage found, but the corpus quality was heterogeneous and supports adding a future pre-ingest filter for empty or marketing-only pages.

## [2026-04-05] curriculum | Certification mapping
- Created: [[analyses/certification-to-learning-path-map]]
- Created: [[paths/foundational-certifications]], [[paths/practical-pentest-labs]], [[paths/network-and-internal-testing]]
- Created: [[paths/web-application-testing]], [[paths/exploit-development]], [[paths/forensics-and-ir]]
- Updated: [[paths/index]], [[index]], [[wiki-index]]
- Notes: Added certification-aligned path families and mapped CEH, OSCP, PenTest+, GPEN, CPTS, CHFI, OSEE, and BSCP onto the curriculum without collapsing the wiki into vendor-specific exam prep.

## [2026-04-05] structure | Curriculum layer
- Created: [[paths/index]], [[paths/foundations]], [[paths/methodology-core]], [[paths/evidence-and-synthesis]]
- Created: [[templates/path-template]]
- Updated: [[index]], [[wiki-index]], [[overview]]
- Notes: Added a first-class curriculum layer with ordered learning tracks and explicit maintenance rules so paths can be extended incrementally as the wiki grows.

## [2026-04-05] structure | Obsidian homepage
- Created: [[home]]
- Updated: [[index]], [[overview]]
- Notes: Added a top-level landing page for Obsidian with start points, current research lanes, framework anchors, and recent ingest links.

## [2026-04-05] structure | Quartz website entrypoint
- Created: [[wiki-index]]
- Updated: [[index]], [[home]]
- Notes: Reassigned `[[index]]` to be the Quartz root homepage so `home.md` can render at `/`; moved the full page map to `[[wiki-index]]`.

## [2026-04-05] structure | Quartz nav and domain path
- Updated: [[index]], [[wiki-index]]
- Notes: Added a Quartz top nav and custom footer links; configured optional custom-domain publishing through `QUARTZ_CUSTOM_DOMAIN` and `QUARTZ_BASE_URL` with automatic `CNAME` generation when enabled.

## [2026-04-05] ingest | Kali Linux website corpus
- Created: [[sources/kali-linux-website-corpus-2026-04-05]]
- Created: [[topics/penetration-testing-distributions]]
- Created: [[entities/kali-linux]], [[entities/offsec]]
- Updated: [[topics/penetration-testing]], [[topics/lab-safety-and-rules-of-engagement]], [[index]]
- Notes: Ingested a first external corpus snapshot from `/Users/danyel-ii/IngestionEngine/controlled-ingestion-codex-kit/data/projects/kali-linux/pages` without modifying `raw/`; recorded Kali as an assessment environment and kept OffSec relationship claims conservative pending stronger governance sources.

## [2026-04-04] bootstrap | Initial repo scaffold created
- Created: [[overview]], [[scope]], [[taxonomy]]
- Created: [[topics/authorized-security-research]], [[topics/penetration-testing]], [[topics/red-teaming]]
- Created: [[topics/gray-hat]], [[topics/red-hat-label]], [[topics/threat-modeling]], [[topics/attack-mapping]], [[topics/lab-safety-and-rules-of-engagement]]
- Created: [[frameworks/nist-sp-800-115]], [[frameworks/owasp-wstg]], [[frameworks/mitre-attack]]
- Notes: starter structure only; no raw-source ingest has occurred yet.
