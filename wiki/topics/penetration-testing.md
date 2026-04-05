# Penetration Testing

## Overview
Penetration testing is a form of active security testing used to verify how well a system resists compromise attempts within an authorized scope.

## Core idea
The point of a pentest is not to "hack for its own sake." It is to produce credible evidence about where defenses fail, how weaknesses can be validated, and what should be fixed inside an authorized scope.

## Distinguish from adjacent practices
- Vulnerability assessment emphasizes identification and prioritization.
- Penetration testing adds active validation of exploitability or control weakness.
- Red teaming typically broadens the objective toward realistic adversary emulation and defensive response measurement.

## Learn it as a workflow
The easiest way to learn pentesting is to treat it as a workflow: scope the work, prepare the environment, gather information, validate weaknesses, record evidence, and report clearly. See [[topics/pentest-workflow]].

## Assessment environments
Penetration testing also depends on the operator environment used to conduct authorized work. Purpose-built distributions such as [[entities/kali-linux]] can reduce setup time and improve portability, but they are enabling platforms rather than methodologies. See [[topics/penetration-testing-distributions]] and [[topics/kali-linux-for-pentesting]].

## What a beginner should read next
If you are learning this topic in order:
1. [[topics/pentest-workflow]]
2. [[topics/lab-safety-and-rules-of-engagement]]
3. [[topics/kali-linux-for-pentesting]]
4. [[frameworks/nist-sp-800-115]]
5. [[frameworks/owasp-wstg]]

## Related pages
- [[topics/pentest-workflow]]
- [[topics/kali-linux-for-pentesting]]
- [[topics/red-teaming]]
- [[topics/threat-modeling]]
- [[topics/penetration-testing-distributions]]
- [[frameworks/nist-sp-800-115]]
- [[frameworks/owasp-wstg]]

## Evidence and sources
- [[sources/kali-linux-website-corpus-2026-04-05]]

## Open questions
- Which pentest phases should become their own pages first?
- Should reporting templates live in this repo or a separate delivery repo?
