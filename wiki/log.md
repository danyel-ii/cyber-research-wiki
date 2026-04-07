# Log

## [2026-04-07] structure | Removed in-repo authoring surface
- Removed: the `Add New Article` feature from the site chrome and the obsolete local authoring app from this repo
- Moved: category metadata into the Quartz layer so the public wiki no longer depends on deleted app code
- Updated: sidebar categories to render as cards with short flash intros for each phase
- Notes: the repo is now a read-only publishing surface again; content changes should be made directly to the markdown source.

## [2026-04-07] structure | Reorganized wiki into six-phase schema
- Replaced: previous public category backbone with [[topics/recon]], [[topics/web]], [[topics/exploit]], [[topics/creds]], [[topics/post]], and [[topics/pivot]]
- Removed: legacy topic and framework category pages that no longer fit the phase model
- Updated: [[index]], [[topics/index]], [[articles/index]], and the Kali article frontmatter to align with the six-phase schema
- Bridged: local companion corpus through `/Users/danyel-ii/WikiCompanion/output/wiki/schema/` so the flat companion article set can be explored through the same six categories
- Notes: The app source of truth now matches the public wiki, so future article additions will preserve the six-phase structure instead of regenerating the old eight-category layout.

## [2026-04-07] lint | Bridge refresh and broken-link fix
- Verified: the live site at `https://danyel-ii.github.io/cyber-research-wiki/` and the main category/article routes returned HTTP 200
- Fixed: broken relative wiki-links in the Kali article cluster that could route readers to missing pages after the six-phase reorganization
- Refreshed: category bridge lists from `/Users/danyel-ii/WikiCompanion/output/wiki-openai-oscp-state.json` to include recent companion outputs such as `nmap`, `dnsrecon`, `nikto`, `ffuf`, `impacket`, `enum4linux-ng`, `wireshark`, `tcpdump`, `bettercap`, and `aircrack-ng-suite`
- Notes: the most likely source of the reported 404 was stale internal article navigation rather than a failed Pages deployment

## [2026-04-05] structure | Clean category-first reset
- Deleted: previous topic, source, analysis, entity, path, and template content from the public layer
- Kept: the eight-category backbone
- Created: [[articles/index]]
- Updated: [[index]], [[topics/index]], the eight category pages
- Notes: Reset the wiki to a clean authoring baseline so new articles can be added manually and maintained automatically by the article app.

## [2026-04-05] article | Kali Linux
- Created: [[articles/kali-linux]]
- Categorized under (current schema): [[topics/recon]], [[topics/web]], [[topics/exploit]], [[topics/creds]], [[topics/post]], [[topics/pivot]]
- Related: none yet
- Notes: Added through the article app and propagated into category indexes and related-article metadata.

## [2026-04-05] article | Kali as an Assessment Environment
- Created: [[articles/kali-as-an-assessment-environment]]
- Categorized under (current schema): [[topics/recon]], [[topics/creds]], [[topics/post]], [[topics/pivot]]
- Related: [[articles/kali-linux]]
- Notes: Added through the article app and propagated into category indexes and related-article metadata.

## [2026-04-06] article | Practical Kali Linux
- Created: [[articles/practical-kali-linux]]
- Categorized under (current schema): [[topics/recon]], [[topics/web]], [[topics/exploit]]
- Related: [[articles/kali-as-an-assessment-environment]], [[articles/kali-linux]]
- Notes: Added through the article app and propagated into category indexes and related-article metadata.
