# CHG-001 — Bootstrap the maintenance blueprint

**Status:** done
**External request:** Direct operator request: update this project into a self-contained blueprint startup template for AI-agent-supported software development, including the AGENTS.md and skills/ directory, with CAP/CHG-aware phased-plan skills.
**Impacts:** CAP-001, CAP-002, CAP-003
**Baseline:** `9d043be`

**Verification evidence:**

- Phase 1: `pnpm records:check` → "Product record check passed: 3 capabilities, 1 change record."
- Phase 2: `pnpm test` → 22 tests passed across 3 suites (record-validation fixtures, change-lifecycle fixtures, playbook packaging).
- Phase 3: `pnpm records:check && pnpm test` exits 0 after the self-contained CAP/CHG phase-workflow skills, packaging test, and DOX updates are present.

| #   | Phase                                | Status      | Verification gate                                                                 |
| --- | ------------------------------------ | ----------- | --------------------------------------------------------------------------------- |
| 1   | Ship the framework contracts         | done        | DOX chain, record templates, validator, and skills tree in place                 |
| 2   | Bootstrap records and proof          | done        | `pnpm records:check && pnpm test` exit 0 on the first product records            |
| 3   | Package self-contained phase workflow | done (`pnpm records:check && pnpm test`) | `pnpm records:check && pnpm test` exit 0 |

## Phase 1 — Ship the framework contracts

**Goal:** Make the maintenance structure a durable, repo-local contract an agent can follow without external reference.

1. Ship the DOX chain (root, docs, docs/product, docs/changes, scripts, skills, .github).
2. Ship the record templates and lifecycle rules (`docs/product/README.md`, `docs/changes/README.md`) and the dependency-free validator with optional root argument.
3. Ship the two portable playbooks under `skills/` with their own DOX.

**Verification gate:** `pnpm records:check` exits 0 on a minimal fixture tree.

## Phase 2 — Bootstrap records and proof

**Goal:** Prove the framework with its own product.

1. Record CAP-001 (record validation), CAP-002 (change-record lifecycle), and CAP-003 (playbook packaging) against `scripts/` and `skills/`.
2. Add the `node:test` suites under `tests/` that exercise the validator against fixture trees and the packaged skills.

**Verification gate:** `pnpm records:check && pnpm test` exit 0.

## Phase 3 — Package self-contained phase workflow

**Goal:** Package a portable CAP/CHG phase workflow that runs without profile-local planning state.

1. Add portable `phased-plan-design`, `phased-plan-execution`, `phased-plan-overview`, and `phased-plan-refactoring` skills under `skills/software-development/`.
2. Route `application-records` and the owning DOX contracts through the packaged workflow.
3. Prove the expected skill family, cross-links, and absence of agent-private paths in `tests/skills.test.mjs`.
4. Run the record and test commands, then archive this completed change.

**Verification gate:** `pnpm records:check && pnpm test` exit 0.

## Out of scope

- Application code, frameworks, persistence, and database runtimes (see [ADR-0001](../../design-decisions.md#adr-0001-ship-the-blueprint-without-application-code-or-technology-direction)).
- The DocumentDB/OpenReplay aspects of the reference instantiation `../ai-software-starter-rbac-db`.
- Wireframe artifacts: the workflow is documented and optional; it activates when a product has a primary human-facing surface.
