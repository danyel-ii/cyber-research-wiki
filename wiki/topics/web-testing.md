# Web Testing

## Overview
Web testing is the part of penetration testing that focuses on how web applications, APIs, and related web-facing components behave under security assessment. It sits naturally inside a broader pentest workflow, but it has its own methods, vocabulary, and framework support.

## Why web testing matters
Web applications are one of the most common public attack surfaces. They handle authentication, business logic, data processing, and user input, so mistakes there often lead directly to meaningful security failures.

## How web testing fits into pentesting
Web testing is not a separate universe from pentesting. It is one domain inside it. The same high-level logic still applies:
- define scope and constraints
- gather information about the target
- understand application behavior
- validate weaknesses carefully
- record evidence and impact

What changes is the subject matter: HTTP behavior, application logic, authentication, session handling, input handling, and backend interactions.

## OWASP WSTG as a framework anchor
The OWASP Web Security Testing Guide is the strongest current framework anchor in this wiki for web testing. It gives a structure for thinking about web assessment methodology, which makes it a better learning companion than a random collection of tool tricks.

## Burp and practical web testing
The current certification-oriented corpus adds useful support here because PortSwigger's Burp documentation makes two things clear:
- Burp is central to many web-testing workflows
- authorization still matters, because testing software can damage fragile targets

That fits the broader pattern of this wiki: tooling matters, but it stays subordinate to scope, safety, and evidence.

## What to learn first
For a learner, the most useful progression is:
1. understand [[topics/penetration-testing]]
2. understand [[topics/pentest-workflow]]
3. understand [[topics/rules-of-engagement]]
4. then begin web-specific methodology through this page and [[frameworks/owasp-wstg]]

## Read next
- Next page: [[frameworks/owasp-wstg]]
- After that: [[topics/kali-linux]]
- If you want certification-oriented web routes later: [[analyses/certification-to-learning-path-map]]

## Related topics
- [[topics/penetration-testing]]
- [[topics/pentest-workflow]]
- [[topics/rules-of-engagement]]
- [[frameworks/owasp-wstg]]

## Sources
- [[sources/certification-training-corpus-2026-04-05]]
