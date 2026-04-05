# Penetration-Testing Distributions

## Overview
Penetration-testing distributions are operating-system builds assembled to support authorized security assessment work with pre-packaged tools, packaging conventions, and deployment options that reduce setup friction compared with building an assessment environment from scratch.

## Why this matters
- They affect preparation time, reproducibility, and portability for authorized assessments.
- They shape which tools, defaults, and execution environments are easiest to use.
- They can support better standardization across lab work, training, and field assessment, but they can also encourage over-collection of tools that are irrelevant to a given scope.

## Common characteristics
- curated tool collections
- package or metapackage grouping
- support for live media, installer images, or virtualized deployments
- documentation for updates, customization, and image selection
- hardware or platform variants such as ARM, cloud, containers, or mobile adjuncts

## Research framing
This wiki treats a penetration-testing distribution as an enabling environment, not as a methodology. Distribution choice affects workflow and operational convenience, but authorization, scope, rules of engagement, evidence handling, and reporting discipline remain separate concerns.

## Kali Linux as a current example
The first ingested corpus in this repo describes [[entities/kali-linux]] as a purpose-built penetration-testing distribution with public build scripts, metapackage-based tool grouping, and support for installer, live, VM, container, cloud, WSL, ARM, and NetHunter-related deployment models.

## Defensive and operational implications
- Portable assessment environments can improve repeatability.
- Broad tool availability does not imply all tools should be installed or used in a given engagement.
- Live and mobile variants increase the importance of storage, credential, logging, and evidence-handling controls.

## Related pages
- [[topics/authorized-security-research]]
- [[topics/penetration-testing]]
- [[topics/lab-safety-and-rules-of-engagement]]
- [[entities/kali-linux]]

## Sources
- [[sources/kali-linux-website-corpus-2026-04-05]]

## Open questions
- Should this topic later compare Kali with other security-focused distributions or keep the page methodology-oriented?
- Which distribution traits matter most in practice: portability, package curation, customization, or release model?
