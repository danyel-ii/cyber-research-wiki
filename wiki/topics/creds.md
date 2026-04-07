---
title: "Creds"
pageKind: "category"
categoryId: "creds"
summary: "Credential capture, relay, cracking, token handling, and identity material as an operational category."
related:
  - "topics/recon"
  - "topics/exploit"
  - "topics/post"
  - "topics/pivot"
---
# Creds

Creds organizes the identity and authentication side of offensive work. It is where hashes, tickets, challenge-response flows, password attacks, relay paths, and reusable credential material belong.

## How to use this category
Use Creds when the key question is how identity material is discovered, replayed, relayed, cracked, or reused across an assessment.

## What belongs here
- hashes, passwords, tickets, and authentication artifacts
- capture and relay tooling
- password and hash cracking workflows
- articles about identity as an attack surface

## Related categories
- [[topics/recon]] — Discovery, mapping, enumeration, and target understanding before deeper validation or exploitation.
- [[topics/exploit]] — Controlled validation of weaknesses through payloads, exploit frameworks, and exploit-adjacent tooling.
- [[topics/post]] — Post-exploitation, local context gathering, privilege escalation analysis, and evidence-rich follow-on work after initial access.
- [[topics/pivot]] — Movement across network, host, and trust boundaries through relays, tunnels, proxies, and remote-execution paths.

## Internal articles
<!-- ARTICLE-LIST:START -->
- [[articles/kali-as-an-assessment-environment]] — Kali becomes an assessment environment when it is treated as a controlled, repeatable workspace for evidence capture, toolchain trust, and operator hygiene.
- [[articles/kali-linux]] — Kali Linux is a Debian-based security distribution used as a portable, curated assessment platform across authorized testing and research work.
<!-- ARTICLE-LIST:END -->

## Companion bridge
The companion corpus gives this category practical anchors around credential capture, cracking, NTLM relay, and identity-centric tooling.

- [Open the Creds companion portal](../../../../WikiCompanion/output/wiki/schema/creds.md)
- [Responder](../../../../WikiCompanion/output/wiki/responder.md)
- [ntlmrelayx](../../../../WikiCompanion/output/wiki/ntlmrelayx.md)
- [Hashcat](../../../../WikiCompanion/output/wiki/hashcat.md)
- [Hydra](../../../../WikiCompanion/output/wiki/hydra.md)
- [John the Ripper](../../../../WikiCompanion/output/wiki/john-the-ripper.md)
- [Mimikatz](../../../../WikiCompanion/output/wiki/mimikatz.md)
- [Impacket](../../../../WikiCompanion/output/wiki/impacket.md)
- [CrackMapExec](../../../../WikiCompanion/output/wiki/crackmapexec.md)
