---
readNext:
  - label: Next page
    path: frameworks/owasp-wstg
    title: OWASP WSTG
  - label: After that
    path: topics/kali-linux
    title: Kali Linux
  - label: Comparative analysis
    path: analyses/certification-to-learning-path-map
    title: Certification to Learning Path Map
---

# Web Testing

## Overview
Web testing is the part of penetration testing that focuses on how web applications, APIs, and related web-facing components behave under security assessment. It sits naturally inside a broader pentest workflow, but it has its own methods, vocabulary, and framework support because web systems expose their logic through HTTP behavior, sessions, identity flows, state changes, and application-specific trust assumptions.

## Why web testing matters
Web applications are one of the most common public attack surfaces. They handle authentication, business logic, data processing, and user input, so mistakes there often lead directly to meaningful security failures. They are also common places where control weaknesses are subtle: logic, state, and trust assumptions often matter more than a single obvious bug class.

## How web testing fits into pentesting
Web testing is not a separate universe from pentesting. It is one domain inside it. The same high-level logic still applies:
- define scope and constraints
- gather information about the target
- understand application behavior
- validate weaknesses carefully
- record evidence and impact

What changes is the subject matter: HTTP behavior, application logic, authentication, session handling, input handling, and backend interactions.

## Position in this wiki
This article is the domain-specific branch of the eight-topic backbone. The earlier topics explain what pentesting is, how the workflow works, and why boundaries matter. This page shows how that same logic applies when the target is a web application or API.

## OWASP WSTG as a framework anchor
The OWASP Web Security Testing Guide is the strongest current framework anchor in this wiki for web testing. It gives a structure for thinking about web assessment methodology, which makes it a better learning companion than a random collection of tool tricks. It is useful not because it names every possible issue, but because it organizes the space of web testing into areas a serious reviewer should think through.

## Burp and practical web testing
The current certification-oriented corpus adds useful support here because PortSwigger's Burp documentation makes two things clear:
- Burp is central to many web-testing workflows
- authorization still matters, because testing software can damage fragile targets

That fits the broader pattern of this wiki: tooling matters, but it stays subordinate to scope, safety, and evidence.

## What makes web testing different
Web testing tends to put more weight on:
- request and response behavior
- authentication and session handling
- authorization logic
- business workflows and state transitions
- input handling, output handling, and trust boundaries between components

These are not separate from penetration testing. They are domain-specific expressions of the same assessment logic.

## What to learn first
For a learner, the most useful progression is:
1. understand [[topics/penetration-testing]]
2. understand [[topics/pentest-workflow]]
3. understand [[topics/rules-of-engagement]]
4. then begin web-specific methodology through this page and [[frameworks/owasp-wstg]]

## Common mistakes
- treating web testing as only a list of payload tricks
- ignoring application logic in favor of generic scanning
- forgetting that authorization and scope still govern the work
- focusing on one tool rather than on how the application behaves
- skipping evidence discipline because the target is "just a web app"

## Related topics
- [[topics/penetration-testing]]
- [[topics/pentest-workflow]]
- [[topics/rules-of-engagement]]
- [[frameworks/owasp-wstg]]

## Evidence status
This article is supported partly by the certification/training corpus, especially for Burp-related safety framing, but it relies heavily on [[frameworks/owasp-wstg]] as its stronger methodological anchor.
