---
aliases:
  - topics/lab-safety-and-rules-of-engagement
---

# Rules of Engagement

## Overview
Rules of engagement are the practical boundaries that make authorized security testing safe, reviewable, and useful. They define where testing can occur, what is off-limits, how risk is handled, and how the people involved communicate before something goes wrong.

## Why rules of engagement matter
Penetration testing is not just technical work. It is an authorized activity inside real systems, real organizations, and real risk boundaries. A good rules-of-engagement model prevents a test from turning into uncontrolled disruption or ambiguous behavior.

## The main parts of rules of engagement
- scope: which systems, applications, users, and environments are included
- exclusions: what must not be touched
- timing: when testing is allowed
- communications: who gets notified and how
- prohibited techniques: what is not acceptable even in scope
- evidence handling: how observations and artifacts are stored
- incident handling: what happens if the test causes harm or exposes a critical issue

## Why this belongs early in the learning sequence
Many beginner explanations of pentesting jump too quickly to scanning, exploitation, or tools. That creates a distorted view. In practice, rules of engagement come first because they determine what counts as acceptable work.

## Interaction with Kali and other environments
Portable environments such as Kali, live images, VMs, and cloud instances make lab setup easier, but they also raise questions about persistence, logging, credentials, and evidence storage. That is another reason to understand rules of engagement before getting too deep into tooling.

## Read next
- Next page: [[topics/kali-linux]]
- After that: [[topics/web-testing]]
- If you want the formal assessment guide next: [[frameworks/nist-sp-800-115]]

## Related topics
- [[topics/penetration-testing]]
- [[topics/pentest-workflow]]
- [[topics/kali-linux]]
- [[frameworks/nist-sp-800-115]]

## Sources
- [[sources/kali-linux-website-corpus-2026-04-05]]
