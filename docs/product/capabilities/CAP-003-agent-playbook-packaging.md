# CAP-003 — External agent-skill installation handoff

**Status:** implemented
**Primary surface:** none

## Behaviour

- README documents normal well-known installation for seven optional engineering skills and a named-profile example.
- README names the separately published eighth package, blueprint-initialization, and links operator-reviewed manual installation because its complete DOX template is blocked by the current community scanner. It does not recommend a scanner bypass.
- This repository contains no skill source tree, endpoint generator, or publishing workflow. Package implementation and distribution are owned by the dedicated skills repository.
- Adoption routing loads an installed initializer only on an explicit operator request, stops if unavailable, and preserves shared profile installations.
- Installed skills remain execution aids subordinate to project DOX. Local verification does not fetch external packages or require a sibling checkout.

## Implementation

- `README.md` — public installation commands, scanner exception, and adoption handoff.
- `AGENTS.md` — external source ownership and explicit adoption routing.

## Rules and boundaries

- The dedicated [AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills) repository owns package tests and hosting evidence. This blueprint's handoff evidence does not prove remote package safety, availability, or behavior.

## Verification

- `tests/skill-installation.test.mjs` — absence of local source/publisher, seven normal installation references, named-profile syntax, explicit initializer exception, and current ownership/routing boundaries.

## Related contracts

- [Architecture](../../architecture.md)
