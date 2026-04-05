# Certification to Learning Path Map

## Question
How should the listed cybersecurity certifications map to the wiki's learning paths?

## Short answer
The cleanest model is to map certifications to curriculum paths by learning domain rather than to treat every certification as its own isolated track. Some certifications are broad entry routes, some are practical offensive-assessment routes, and some are specialist routes in web testing, exploit development, or forensics. As the wiki grows, new pages should be attached to these path families first, and only later split into certification-specific prep paths if enough material accumulates.

## Basis in the wiki
- [[paths/foundations]]
- [[paths/methodology-core]]
- [[paths/evidence-and-synthesis]]
- [[paths/foundational-certifications]]
- [[paths/practical-pentest-labs]]
- [[paths/network-and-internal-testing]]
- [[paths/web-application-testing]]
- [[paths/exploit-development]]
- [[paths/forensics-and-ir]]
- [[sources/certification-training-corpus-2026-04-05]]

## Comparison / reasoning
The certifications provided cluster into a small number of durable learning domains:

- Broad foundational and intermediate pentest framing:
  - CEH
  - CompTIA PenTest+
- Practical offensive assessment under lab conditions:
  - OSCP
  - HTB CPTS
- Network and internal methodology:
  - GPEN
- Web application assessment:
  - BSCP
- Advanced exploit development:
  - OSEE
- Forensics and incident response:
  - CHFI

The wiki should not overfit itself to vendor exam names too early. A better approach is:
1. build domain and method paths first
2. map certifications onto those paths
3. add certification-specific deltas only when the wiki contains enough material to justify them

This keeps the curriculum useful even as certifications change over time.

The current evidence base is uneven. After incorporating [[sources/certification-training-corpus-2026-04-05]], the wiki has better direct support for CEH-style training breadth, CompTIA-style objective-driven study ecosystems, Burp-centered web-testing safety framing, and evidence-handling concepts. It still lacks equally strong direct vendor-primary support for OSCP, GPEN, HTB CPTS, OSEE, and CHFI specifics, so those parts of the map remain partly inferential.

## Mapping
- Certified Ethical Hacker (CEH):
  - Primary: [[paths/foundational-certifications]]
  - Supporting: [[paths/foundations]], [[paths/methodology-core]]
  - Rationale: broad introductory offensive-security coverage spanning scanning, system hacking, and web vulnerabilities; this is now supported by the Cybrary CEH-prep style source in [[sources/certification-training-corpus-2026-04-05]].

- Offensive Security Certified Professional (OSCP):
  - Primary: [[paths/practical-pentest-labs]]
  - Supporting: [[paths/methodology-core]], [[paths/network-and-internal-testing]], [[paths/web-application-testing]]
  - Rationale: practical adversarial assessment under time pressure with strong emphasis on hands-on exploitation and pivoting.

- CompTIA PenTest+:
  - Primary: [[paths/foundational-certifications]]
  - Supporting: [[paths/methodology-core]], [[paths/network-and-internal-testing]]
  - Rationale: intermediate assessment framing with both conceptual and practical elements; still partly inferential here, but better aligned with the CompTIA-style objective and study-structure material in [[sources/certification-training-corpus-2026-04-05]].

- GIAC Penetration Tester (GPEN):
  - Primary: [[paths/network-and-internal-testing]]
  - Supporting: [[paths/methodology-core]], [[paths/foundations]]
  - Rationale: stronger emphasis on network pentesting methodology and legal/ethical issues.

- HTB Certified Penetration Testing Specialist (CPTS):
  - Primary: [[paths/practical-pentest-labs]]
  - Supporting: [[paths/network-and-internal-testing]], [[paths/web-application-testing]]
  - Rationale: advanced live-lab offensive assessment rather than broad theory-first coverage.

- Computer Hacking Forensic Investigator (CHFI):
  - Primary: [[paths/forensics-and-ir]]
  - Supporting: [[paths/evidence-and-synthesis]]
  - Rationale: shifts away from offensive assessment into evidence handling, investigation, and response; evidence-handling support improved through the chain-of-custody material in [[sources/certification-training-corpus-2026-04-05]], though CHFI itself is not directly evidenced by this corpus.

- OffSec Exploitation Expert (OSEE):
  - Primary: [[paths/exploit-development]]
  - Supporting: [[paths/practical-pentest-labs]]
  - Rationale: specialist exploit-development route, not a general pentest path.

- Burp Suite Certified Practitioner (BSCP):
  - Primary: [[paths/web-application-testing]]
  - Supporting: [[paths/methodology-core]]
  - Rationale: tool-centered but fundamentally web-assessment focused; strengthened by PortSwigger Burp documentation and its explicit authorization warning in [[sources/certification-training-corpus-2026-04-05]].

## Bottom line
The right curriculum model is a path family model:
- foundational certifications
- practical pentest labs
- network and internal testing
- web application testing
- exploit development
- forensics and incident response

Certifications should map onto these families. As the wiki grows, new pages should deepen those families first and only then branch into narrower certification-specific prep tracks.

## Follow-up updates suggested
- [[paths/index]]
- [[home]]
- [[wiki-index]]
