---
readNext:
  - label: Next page
    path: topics/kali-linux
    title: Kali Linux
  - label: Broader subject
    path: topics/penetration-testing
    title: Penetration Testing
---

# OWASP WSTG

## Overview
The OWASP Web Security Testing Guide is a major reference for web application security testing methodology. In this wiki it functions as the framework anchor for the web-testing topic, giving structure to an area that is otherwise often taught as a loose collection of exploits, payloads, and tools.

## Why it matters
WSTG gives web testing a structure. Instead of approaching web security as a random list of exploits or tools, it provides a framework for thinking about what should be tested, in what areas, and with what level of coverage. That structure matters because web assessment often becomes shallow when the tester jumps from one bug class to another without a model of the application.

## How to use it in this wiki
Use this framework page after reading [[topics/web-testing]]. The goal here is not to memorize the guide line by line. The goal is to understand that web testing has its own testing logic and that WSTG is one of the best anchors for that logic.

## What WSTG contributes
In practical terms, WSTG contributes:
- a way to break web testing into coherent areas rather than isolated tricks
- a reminder that coverage matters, not just isolated findings
- a bridge between methodology and test execution
- a vocabulary that helps organize what a reviewer should inspect

## How it differs from a tool guide
WSTG is not primarily about which tool to click next. It is about what kinds of questions a web tester should ask:
- how is the application mapped and understood?
- how are identities established and maintained?
- where are trust boundaries and state transitions?
- how are input, output, storage, and business logic handled?

That is why it belongs in the eight-topic backbone even though it is a framework page rather than a topic page.

## Position in this wiki
This is the framework anchor for [[topics/web-testing]]. It is not the front door to the wiki, but it is the page that gives the web-testing branch most of its methodological structure.

## Limits
WSTG does not replace the broader pentest workflow, rules of engagement, or environment choices described elsewhere in the wiki. It sharpens one domain inside that larger model. A reader should therefore treat it as a domain framework, not as a complete theory of penetration testing by itself.

## Related pages
- [[topics/penetration-testing]]
- [[topics/web-testing]]
