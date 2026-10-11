# CAP-003 — Agent-skill migration handoff

**Status:** implemented
**Primary surface:** none

## Behaviour

- README documents normal well-known installation for seven optional generic engineering skills and a named-profile example.
- A copied blueprint contains `skills/software-development/blueprint-initialization/` with its complete DOX template. It is read only for an explicit migration request, then removed with its root routing from the initialized target project.
- The initializer is not published or installed from the dedicated skills repository because the current community scanner blocks its required project-instruction updates. The repository does not bypass or conceal that boundary.
- This repository has no generic-skill endpoint generator or publishing workflow. Generic package implementation and distribution are owned by the dedicated skills repository.
- Installed skills remain execution aids subordinate to project DOX. Local verification does not fetch external packages or require a sibling checkout.

## Implementation

- `README.md` — public generic-skill installation commands and local migration handoff.
- `AGENTS.md` — external generic-skill ownership and explicit local adoption routing.
- `skills/software-development/blueprint-initialization/` — local migration package and initial root-DOX template.

## Rules and boundaries

- The dedicated [AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills) repository owns generic package tests and hosting evidence. This blueprint's handoff evidence does not prove remote package safety, availability, or behavior.

## Verification

- `tests/skill-installation.test.mjs` — local initializer package and routing, seven normal generic installation references, named-profile syntax, and current ownership boundaries.

## Related contracts

- [Architecture](../../architecture.md)
