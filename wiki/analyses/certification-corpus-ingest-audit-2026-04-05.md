# Certification Corpus Ingest Audit (2026-04-05)

## Question
What happened when the external certification corpus was incorporated into the wiki, what worked, what difficulties arose, and did the curriculum improve?

## Short answer
The incorporation improved the wiki, but selectively rather than uniformly. The strongest gains were in the foundational-certification, CompTIA-aligned, Burp/web, and evidence-handling parts of the curriculum. The main difficulty was corpus quality: the directory mixes relevant training and documentation pages with empty pages, marketing pages, stale course fragments, and material not equally useful for all certification tracks. The wiki is better after this ingest because the learning paths are now more honest about which routes are evidence-backed and which still need stronger primary sources.

## Basis in the wiki
- [[sources/certification-training-corpus-2026-04-05]]
- [[analyses/certification-to-learning-path-map]]
- [[paths/foundational-certifications]]
- [[paths/network-and-internal-testing]]
- [[paths/web-application-testing]]
- [[paths/forensics-and-ir]]

## What worked
- The existing `sources/ -> paths/ -> analyses/` structure handled the corpus well once the noisy pages were filtered out.
- The curriculum-family model absorbed new evidence without needing to rewrite the whole path system.
- PortSwigger documentation added a strong, explicit authorization warning that fits this wiki's safety stance.
- Professor Messer pages improved support for CompTIA-oriented study structure and exam-objective alignment.
- The ingest surfaced where certification-path claims were strong versus where they were still largely inferential.

## Difficulties
- The corpus is heterogeneous: official documentation, training landing pages, stale fragments, and empty pages are mixed together.
- Several expected high-value pages, such as the captured TryHackMe path outlines, were effectively empty in this snapshot.
- The corpus did not provide equally strong direct evidence for OSCP, GPEN, CPTS, OSEE, and CHFI, so the prior certification mapping could not simply be "confirmed" across the board.
- Some pages use broad or marketing-oriented "ethical hacking" language that needed to be translated carefully into the wiki's more formal taxonomy.

## Process observations
- Corpus-level triage mattered more than file count. The effective process was to identify a few representative, high-signal pages rather than ingesting the entire directory indiscriminately.
- Existing path families were a good design choice: they allowed incremental strengthening without turning the wiki into a vendor-exam cram sheet.
- The current ingest workflow would be improved by a lightweight pre-ingest filter for empty pages, duplicate captures, and weak marketing-only pages.

## Is the wiki improved?
Yes, but in a scoped way.

- The wiki now has stronger evidence for:
  - CEH-style breadth-first prep framing
  - CompTIA-style objective-driven study structure
  - Burp-related web-testing safety framing
  - evidence-handling concepts relevant to forensics and incident response

- The wiki is still weak on direct primary-source support for:
  - OSCP
  - GPEN
  - HTB CPTS
  - OSEE
  - CHFI

That is still an improvement, because the curriculum is now calibrated to the actual evidence rather than to assumed symmetry across certifications.

## Are the learning paths strengthened?
Yes.

- [[paths/foundational-certifications]] is stronger because it now rests on actual CEH-style and CompTIA-style training-path evidence rather than on abstraction alone.
- [[paths/network-and-internal-testing]] is stronger because current Network+ course structure now supports the breadth-to-network transition more clearly.
- [[paths/web-application-testing]] is stronger because the Burp documentation adds a concrete vendor-documentation anchor with an explicit authorization caveat.
- [[paths/forensics-and-ir]] is modestly stronger because chain-of-custody material now supports evidence-handling as a live curriculum concern.

Other paths are mostly unchanged in evidentiary strength, which is the correct outcome given the corpus.

## Bottom line
The ingest was worthwhile. It did not validate every certification mapping equally, but it improved the curriculum by adding real support where the corpus was strong and by clarifying where stronger vendor-primary sources are still needed. The wiki is therefore more reliable, and the learning paths are more defensible.

## Follow-up updates suggested
- [[paths/index]]
- [[analyses/certification-to-learning-path-map]]
- [[sources/certification-training-corpus-2026-04-05]]
