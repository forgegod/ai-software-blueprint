# Architecture

## Purpose and shape

This repository is a maintenance blueprint. It models how an agentic coding software project maintains changes — how work is proposed, tracked, proven, and recorded — without prescribing a technological or architectural direction.

It ships no application code, no framework, and no persistence runtime. The product project adopts the framework and picks its own stack.

## What the blueprint owns

- The **DOX hierarchy**: root `AGENTS.md` plus child contracts that stay binding at every depth. The hierarchy is the structure an AI coding agent complies with on every change.
- The **record system**: CAP capability contracts for current behaviour, CHG change records for progress, and lifecycle rules that keep them apart.
- The **record validator**: a dependency-free `node` script that enforces record structure, lifecycle placement, reference integrity, and local link integrity.
- The **agent playbooks**: optional, versioned execution aids under `skills/`.
- The **quality gate**: local scripts and a credential-free CI workflow.

The blueprint's own product surface is that machinery: its CAPs describe the record-validation and lifecycle pipeline, and the `node:test` suites under `tests/` prove it.

## Data and state

- No sessions, roles, product data, or persistence state belong in this repository.
- No secrets or credentials: records reference behaviour, not values.

## Non-goals

Current design deliberately excludes:

- An application, UI, or server runtime
- Language, framework, database, or persistence mandates
- A second progress system beside the active CHG
- Shipped wireframe artifacts before a product adopts a primary human-facing surface
- Telemetry, deployment, or operational tooling

## Enforcement

Root `AGENTS.md` requires explicit approval for changes that conflict with an architectural decision or non-goal. `pnpm records:check` (also run by `pnpm test` and CI) enforces record structure, lifecycle, and reference invariants. `design-decisions.md` records irreversible rationale; it does not override this specification.

## Verification

```bash
pnpm install
pnpm records:check
pnpm test
```

## Adoption

Adopting a product project copies the framework, then records the product's own behaviour:

1. Copy the DOX chain (`AGENTS.md` files), `docs/`, `scripts/`, `skills/`, `package.json`, `.github/`, and `README.md` conventions.
2. Replace the blueprint CAPs with the product's capability contracts, each backed by the product's implementation paths and executable tests.
3. Point `pnpm records:check` at the product's record roots (the script accepts an optional root argument; the default is the repository root).
4. Add the product's own verification commands to the root `package.json` and to `.github/workflows/ci.yml`, and re-state them in the root `AGENTS.md` → Workspace verification.
5. When the product has a primary human-facing surface, activate the wireframe workflow: add `docs/product/wireframes/` (generator, manifest, index, HTML/PNG pairs) and link them from the qualifying CAPs.
6. Keep `docs/design-decisions.md` for the product's irreversible forks; the blueprint's own decisions stay scoped to the framework.
