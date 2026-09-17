# Architecture

## Purpose and shape

This repository is a maintenance blueprint. It models how an agentic coding software project maintains changes — how work is proposed, tracked, proven, and recorded — without prescribing a technological or architectural direction.

It ships no application code, no framework, and no persistence runtime. The product project adopts the framework and picks its own stack.

## What the blueprint owns

- The **DOX hierarchy**: root `AGENTS.md` plus child contracts that stay binding at every depth. The hierarchy is the structure an AI coding agent complies with on every change.
- The **record system**: CAP capability contracts for current behaviour, CHG change records for progress, and CHG-owned review packages kept apart from canonical product wireframes.
- The **record validator**: a dependency-free `node` script that enforces record structure, lifecycle placement, reference integrity, and local link integrity.
- The **agent playbooks**: optional, versioned execution aids under `skills/`, including a self-contained CAP/CHG phase-workflow family that keeps active CHGs as progress authority.
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

Root `AGENTS.md` requires explicit approval for changes that conflict with an architectural decision or non-goal. `pnpm records:check` enforces record structure, lifecycle, review ownership, and reference invariants; `pnpm test` exercises those checks with synthetic fixtures, and CI runs both commands. `design-decisions.md` records irreversible rationale; it does not override this specification.

Every CAP explicitly declares `Primary surface: human` or `none`. A human-facing CAP or an existing wireframe directory requires the generator, manifest, index, and complete CAP-linked HTML/PNG inventory. Missing manifests cannot bypass validation. Generation, rendering freshness, truthful classification, and visual approval remain phase gates, not structural-validator claims.

Proposal assets and design notes live at `docs/changes/reviews/CHG-<number>/` with a review-only README linked from the owning CHG. Active/archive directories are record-only. Review packages retain their paths after closure as frozen receipts; product CAPs and manifests never consume them. The blueprint ships no empty review or product-wireframe scaffolding.

## Verification

```bash
pnpm install
pnpm records:check
pnpm test
```

## Adoption

Copying is not initialization. After the copy, explicitly ask the agent to
initialize the blueprint for the real project. The one-time initializer performs
this boundary:

1. Start the target root from the initial DOX template, scan the real source
   tree, and fill its project guidance, verification commands, and Child DOX
   Index. Do not retain this repository's populated root rail.
2. Keep and adapt the reusable framework: the DOX core, generic CAP/CHG lifecycle
   documentation, and CAP/CHG phase skills.
3. Rewrite the copied root README from the project's source-backed goal: name the
   project purpose, intended users, actual setup/run/verification commands, and
   current documentation links. Replace architecture, decisions, package
   configuration, and CI with the actual project's contracts and tooling. A
   copied Node validator or test runner is retained only when it fits the
   project's toolchain.
4. Remove this repository's CAPs, bootstrap CHGs, index rows, and proof-only
   tests/fixtures. Create product CAPs only for known current behaviour with
   implementation and executable evidence; create CHGs only for actual material
   product requests.
5. When the product has a primary human-facing surface, activate the wireframe
   workflow: add `docs/product/wireframes/` (generator, manifest, index,
   HTML/PNG pairs) and link them from the qualifying CAPs. Keep proposal reviews
   in CHG-owned packages under `docs/changes/reviews/`, not in the product tree.
6. Remove the one-time initializer, its routing, and tests that require it once
   the target has a project-owned DOX tree. Future agents continue through the
   initialized contracts and retained generic skills.
