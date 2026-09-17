# Design Decisions

This document records durable rationale for irreversible forks. It is not the live architecture contract: root `AGENTS.md` and `architecture.md` define the current design.

## ADR-0001: Ship the blueprint without application code or technology direction

**Status:** Accepted

### Context

Earlier editions of this project bundled a web application, a persistence stack, and a database runtime. The intent is only to hand an AI coding agent and its harness the definition and structure a software project must be maintained under — not to direct its technology.

### Decision

Ship the maintenance framework only: the DOX hierarchy, the CAP/CHG record system, the record validator, the agent playbooks, and the quality gate. The blueprint proves its own pipeline with `node:test` suites; a product project adopts the framework and records its own behaviour.

### Consequences

No runtime boundary checks, database contracts, framework mandates, or external reference-project dependencies exist here. Introducing application code or technology direction into this repository is an architecture change requiring a new ADR.
