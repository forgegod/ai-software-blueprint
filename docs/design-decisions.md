# Design Decisions

This document records durable rationale for irreversible forks. It is not the live architecture contract: root `AGENTS.md` and `architecture.md` define the current design.

## ADR-0001: Ship the blueprint without application code or technology direction

**Status:** Accepted

### Context

Earlier editions of this project bundled a web application, a persistence stack, and a database runtime. The intent is only to hand an AI coding agent and its harness the definition and structure a software project must be maintained under — not to direct its technology.

### Decision

Ship the maintenance framework only: the DOX hierarchy, the CAP/CHG record system, the record validator, optional agent-playbook installation references, and the quality gate. The blueprint proves its own pipeline with `node:test` suites; a product project adopts the framework and records its own behaviour.

### Consequences

No runtime boundary checks, database contracts, framework mandates, or external reference-project dependencies exist here. Introducing application code or technology direction into this repository is an architecture change requiring a new ADR.

## ADR-0002: Separate skill authority and public distribution

**Status:** Accepted

### Decision

The dedicated public [AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills)
repository owns reusable skill source, package tests, and GitHub Pages well-known
distribution. The blueprint documents installation and proves its own handoff,
but contains no duplicate skill tree, publisher, or hosting workflow.

### Consequences

- Skill releases and blueprint changes have independent source and verification authority.
- Blueprint verification remains local and credential-free, without a sibling-checkout or remote-service dependency.
- Community scanning remains active. All eight complete packages are published; seven use normal installation. The initializer's intentional project-instruction template is blocked by the current scanner, so its installation requires separate operator review/manual copying. The template is neither hidden nor weakened.
- Project DOX remains authoritative. Target-project initialization cannot remove a shared installed package.
