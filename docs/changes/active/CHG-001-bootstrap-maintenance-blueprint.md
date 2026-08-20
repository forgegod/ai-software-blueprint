# CHG-001 — Bootstrap the maintenance blueprint

**Status:** in-progress
**External request:** Direct operator request: create a further stripped-down edition of the starter as a pure blueprint — the maintenance framework and record structure for AI coding agents, without the DocumentDB and OpenReplay aspects.
**Impacts:** CAP-001, CAP-002, CAP-003
**Baseline:** `<first commit of this repository>`

**Verification evidence (2026-08-20):**

- Phase 1: `pnpm records:check` → "Product record check passed: 3 capabilities, 1 change record."
- Phase 2: `pnpm test` → 22 tests passed across 3 suites (record-validation fixtures, change-lifecycle fixtures, playbook packaging).
- Phase 3: `pnpm records:check && pnpm test` exit 0 locally; `.github/workflows/ci.yml` mirrors the same gate and runs on the first push.

| #   | Phase                                | Status      | Verification gate                                                                 |
| --- | ------------------------------------ | ----------- | --------------------------------------------------------------------------------- |
| 1   | Ship the framework contracts         | done        | DOX chain, record templates, validator, and skills tree in place                 |
| 2   | Bootstrap records and proof          | done        | `pnpm records:check && pnpm test` exit 0 on the first product records            |
| 3   | Integrate the quality gate           | in-progress | `pnpm records:check && pnpm test` exit 0 and CI workflow runs the same gate       |

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

## Phase 3 — Integrate the quality gate

**Goal:** Keep the gate aligned for local use and CI.

1. Run the record and test commands locally.
2. Confirm `.github/workflows/ci.yml` mirrors the gate; mark the evidence in this CHG and archive it.

**Verification gate:** `pnpm records:check && pnpm test` exit 0.

## Out of scope

- Application code, frameworks, persistence, and database runtimes (see [ADR-0001](../../design-decisions.md#adr-0001-ship-the-blueprint-without-application-code-or-technology-direction)).
- The DocumentDB/OpenReplay aspects of the reference instantiation `../ai-software-starter-rbac-db`.
- Wireframe artifacts: the workflow is documented and optional; it activates when a product has a primary human-facing surface.
