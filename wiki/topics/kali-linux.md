---
aliases:
  - entities/kali-linux
  - topics/kali-linux-for-pentesting
---

# Kali Linux

## Overview
Kali Linux is a security-focused Linux distribution built to support authorized security assessment work. Its value is not that it magically makes someone a penetration tester, but that it reduces the friction of building and maintaining a usable testing environment.

## What Kali Linux is
Kali Linux is a prepared operating environment for security work. According to the currently ingested source material, Kali is presented as a penetration-testing platform with:
- pre-packaged security tooling
- installer and live images
- virtual machine images
- container, cloud, and WSL variants
- ARM builds and mobile-adjacent NetHunter variants
- public build scripts and documented customization workflows

## Why Kali matters
For learners and practitioners, Kali matters because it concentrates common assessment tooling and packaging decisions into one maintained environment. That makes lab work easier to start, repeat, and adapt across different hardware and deployment situations.

## What Kali does well
- reduces setup time for labs and practice environments
- gives a common baseline for training and demonstrations
- supports multiple delivery models, from bare metal to VMs to cloud
- allows narrower or broader tool installation through metapackages
- supports customization when default images are not a good fit

## What Kali does not do for you
Kali does not provide:
- authorization
- rules of engagement
- a testing methodology
- disciplined evidence collection
- reporting quality

Those come from the operator and the assessment process, not from the distribution itself.

## Kali as an assessment environment
The most useful way to think about Kali is as an assessment environment. It helps with operator readiness, portability, and repeatability, but it remains subordinate to scope, rules of engagement, and testing goals. See [[topics/kali-as-an-assessment-environment]].

## Learning Kali in the right order
If you are using this wiki to learn:
1. Start with [[topics/penetration-testing]]
2. Continue to [[topics/pentest-workflow]]
3. Then read this page
4. Next read [[topics/practical-kali-linux]]
5. Then read [[topics/web-testing]] or [[frameworks/owasp-wstg]] depending on what you want to practice

## Read next
- Next page: [[topics/practical-kali-linux]]
- After that: [[topics/kali-as-an-assessment-environment]]
- If you want to continue the main learning sequence: [[topics/web-testing]]

## Related topics
- [[topics/penetration-testing]]
- [[topics/pentest-workflow]]
- [[topics/rules-of-engagement]]
- [[topics/kali-as-an-assessment-environment]]
- [[topics/practical-kali-linux]]
- [[frameworks/nist-sp-800-115]]

## Sources
- [[sources/kali-linux-website-corpus-2026-04-05]]

## Open questions
- Which parts of Kali usage deserve their own articles next: image selection, metapackages, or custom builds?
- When more primary material is ingested, should NetHunter become its own topic?
