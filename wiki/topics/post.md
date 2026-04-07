---
title: "Post"
pageKind: "category"
categoryId: "post"
summary: "Post-exploitation, local context gathering, privilege escalation analysis, and evidence-rich follow-on work after initial access."
related:
  - "topics/creds"
  - "topics/pivot"
  - "topics/exploit"
---
# Post

Post is where the wiki covers what happens after access is established. It includes host and identity context gathering, local privilege work, persistence evaluation, evidence capture, and the analysis needed to explain what access really means.

## How to use this category
Use Post when an article is about working from a foothold rather than reaching one. It should connect strongly to Creds and Pivot.

## What belongs here
- host and directory-context analysis after access
- privilege escalation and local situational awareness
- evidence capture from compromised hosts
- articles about turning initial access into defensible understanding

## Related categories
- [[topics/creds]] — Credential capture, relay, cracking, token handling, and identity material as an operational category.
- [[topics/pivot]] — Movement across network, host, and trust boundaries through relays, tunnels, proxies, and remote-execution paths.
- [[topics/exploit]] — Controlled validation of weaknesses through payloads, exploit frameworks, and exploit-adjacent tooling.

## Internal articles
<!-- ARTICLE-LIST:START -->
- [[articles/kali-as-an-assessment-environment]] — Kali becomes an assessment environment when it is treated as a controlled, repeatable workspace for evidence capture, toolchain trust, and operator hygiene.
- [[articles/kali-linux]] — Kali Linux is a Debian-based security distribution used as a portable, curated assessment platform across authorized testing and research work.
<!-- ARTICLE-LIST:END -->

## Companion bridge
The companion corpus gives Post its first serious body of material, especially around host context, Active Directory analysis, and local-enumeration helpers.

- [Open the Post companion portal](../../../../WikiCompanion/output/wiki/schema/post.md)
- [BloodHound](../../../../WikiCompanion/output/wiki/bloodhound.md)
- [CrackMapExec](../../../../WikiCompanion/output/wiki/crackmapexec.md)
- [wmiexec](../../../../WikiCompanion/output/wiki/wmiexec.md)
- [winPEAS](../../../../WikiCompanion/output/wiki/winpeas.md)
- [linPEAS](../../../../WikiCompanion/output/wiki/linpeas.md)
- [Mimikatz](../../../../WikiCompanion/output/wiki/mimikatz.md)
- [Sysinternals Autoruns](../../../../WikiCompanion/output/wiki/sysinternals-autoruns.md)
- [Volatility](../../../../WikiCompanion/output/wiki/volatility.md)
