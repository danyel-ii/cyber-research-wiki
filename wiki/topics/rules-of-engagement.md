---
aliases:
  - topics/lab-safety-and-rules-of-engagement
readNext:
  - label: Next page
    path: topics/kali-linux
    title: Kali Linux
  - label: After that
    path: topics/web-testing
    title: Web Testing
  - label: Formal assessment guide
    path: frameworks/nist-sp-800-115
    title: NIST SP 800-115
---

# Rules of Engagement

## Overview
Rules of engagement are the practical boundaries that make authorized security testing safe, reviewable, and useful. They define where testing can occur, what is off-limits, how risk is handled, how people communicate during the work, and what happens if something goes wrong.

## Why rules of engagement matter
Penetration testing is not just technical work. It is authorized work inside real systems, real organizations, and real risk boundaries. A good rules-of-engagement model prevents a test from turning into uncontrolled disruption, ambiguous behavior, or an avoidable incident.

## The main parts of rules of engagement
- scope: which systems, applications, users, and environments are included
- exclusions: what must not be touched
- timing: when testing is allowed
- communications: who gets notified and how
- prohibited techniques: what is not acceptable even in scope
- evidence handling: how observations and artifacts are stored
- incident handling: what happens if the test causes harm or exposes a critical issue

These elements matter because they tell the operator what kind of work is actually permitted, not just what kind of work is technically possible.

## Why this belongs early in the learning sequence
Many beginner explanations of pentesting jump too quickly to scanning, exploitation, or tools. That creates a distorted view. In practice, rules of engagement come first because they determine what counts as acceptable work and what evidence the client actually needs.

## Interaction with Kali and other environments
Portable environments such as Kali, live images, VMs, and cloud instances make lab setup easier, but they also raise questions about persistence, logging, credentials, and evidence storage. That is another reason to understand rules of engagement before getting too deep into tooling: the environment changes the operational shape of the work even if it does not determine the legitimacy of the work.

## Position in this wiki
This article is the boundary page in the eight-topic map. [[topics/penetration-testing]] explains the purpose of the discipline, and [[topics/pentest-workflow]] explains the flow of work. This page explains the conditions that make that work acceptable, reviewable, and professionally useful.

## What strong rules of engagement achieve
- they reduce ambiguity before the engagement begins
- they keep the operator and the owner aligned on risk
- they improve evidence quality because reporting expectations are clearer
- they reduce needless damage caused by over-testing or poor communication
- they make later dispute resolution easier if an incident occurs

## Common mistakes
- treating scope as a vague idea rather than a precise boundary
- assuming authorization once a technical contact says "go ahead"
- failing to define communication paths before high-risk work begins
- forgetting that exclusions matter as much as in-scope targets
- overlooking evidence handling and retention
- treating lab habits as if they automatically transfer to production environments

## Related topics
- [[topics/penetration-testing]]
- [[topics/pentest-workflow]]
- [[topics/kali-linux]]
- [[frameworks/nist-sp-800-115]]

## Evidence status
This article is primarily a synthesis and boundary-setting page. The current Kali corpus supports the environment-related caution around logging, persistence, and portability, but it does not by itself fully support the broader rules-of-engagement model. [[frameworks/nist-sp-800-115]] is the stronger current anchor.
