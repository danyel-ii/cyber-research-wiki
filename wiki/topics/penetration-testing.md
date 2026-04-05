# Penetration Testing

## Overview
Penetration testing is an authorized form of active security testing used to find out whether real weaknesses in a system, application, or environment can actually be validated in practice. It sits between high-level security review and full adversary-emulation work: more active than a simple assessment, narrower than a red-team exercise.

## What penetration testing is for
The purpose of a pentest is not to show off tools or collect dramatic screenshots. Its purpose is to produce credible evidence about:
- where a defense or control actually fails
- which weaknesses are exploitable enough to matter
- what defenders or owners should change next

A good pentest helps a system owner make better decisions.

## Read next
- Next page: [[topics/pentest-workflow]]
- After that: [[topics/rules-of-engagement]]
- If you want the environment side next: [[topics/kali-linux]]

## Distinguish from adjacent practices
- Vulnerability assessment emphasizes identification and prioritization.
- Penetration testing adds active validation of exploitability or control weakness.
- Red teaming typically broadens the objective toward realistic adversary emulation and defensive response measurement.

## How to learn penetration testing
The best way to learn pentesting is to think in terms of workflow rather than tools:
1. define scope and authorization
2. prepare the environment
3. gather information
4. validate weaknesses carefully
5. collect evidence
6. report clearly

This is why the next page to read is [[topics/pentest-workflow]].

## Assessment environments
Assessment environments matter because they shape repeatability, portability, and tool availability. Kali Linux is a common example, but it remains an environment for pentesting, not the definition of pentesting itself. See [[topics/kali-linux]] and [[topics/kali-as-an-assessment-environment]].

## Where web testing fits
Web testing is one of the most common and most visible parts of pentesting, but it should still be learned as part of the same overall workflow and rules-of-engagement model. See [[topics/web-testing]].

## Related topics
- [[topics/pentest-workflow]]
- [[topics/rules-of-engagement]]
- [[topics/kali-linux]]
- [[topics/kali-as-an-assessment-environment]]
- [[topics/web-testing]]
- [[topics/red-teaming]]
- [[frameworks/nist-sp-800-115]]
- [[frameworks/owasp-wstg]]

## Sources
- [[sources/kali-linux-website-corpus-2026-04-05]]
