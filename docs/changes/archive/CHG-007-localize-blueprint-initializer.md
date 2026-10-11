# CHG-007 — Localize the blueprint initializer

**Status:** done
**External request:** Direct operator request: The blueprint-initialization skill will never be installed from the only source due to security concerns so move it back to the ../ai-software-blueprint/ project as local skill/tool for the migration. Reference the usage for migration purposes in ../ai-software-blueprint/ himself
**Impacts:** CAP-003
**Baseline:** `f6f5a55`

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Restore the migration-local package and routing | done (`pnpm records:check` passed: 3 capabilities, 7 change records) | `pnpm records:check` exits 0 |
| 2 | Remove the blocked package from external distribution | done (`npm test`: 22 passing; `npm run build`: 8 skills) | `npm test && npm run build` exits 0 in `ai-coding-agent-skills` |
| 3 | Integrate records and evidence | done (`pnpm records:check && pnpm test`: 75 passing; `npm test && npm run build`: 22 passing, 8 skills) | `pnpm records:check && pnpm test` and `npm test && npm run build` exit 0 |

## Phase 1 — Restore the migration-local package and routing

**Goal:** A copied blueprint carries the one-time initializer locally and its repository contracts explain how to invoke and remove it during migration.

1. Restored the initializer and its root-DOX template under `skills/software-development/` with local-copy cleanup semantics.
2. Added the local skill DOX boundary and updated root, architecture, README, product, and CAP-003 contracts so the externally published generic skills remain separate from the migration-only package.
3. Updated blueprint installation-handoff tests to prove the local package and routing without asserting external scanner approval or a remote manual-install path.

**Verification gate:** `pnpm records:check` passed: 3 capabilities, 7 change records.

## Phase 2 — Remove the blocked package from external distribution

**Goal:** The public skill endpoint and its installer documentation no longer advertise or package the scanner-blocked initializer.

1. Deleted the initializer source package from `ai-coding-agent-skills` and removed it from catalog, installation, packaging, and native-copy documentation.
2. Updated focused tests so the generated inventory contains only the remaining external packages and does not rely on a manual initializer exception.
3. Built the endpoint and ran the complete external repository test suite.

**Verification gate:** `npm test` passed 22 tests and `npm run build` generated 8 skills.

## Phase 3 — Integrate records and evidence

**Goal:** Current capability documentation, change indexes, and both repositories' gates agree on local-only migration ownership.

1. Synchronized CAP-003 and both repositories' ownership documentation with the implemented split.
2. Ran the full blueprint and external repository gates, then archived this CHG and refreshed the change index.

**Verification gate:** `pnpm records:check && pnpm test` passed with 75 tests; `npm test && npm run build` passed with 22 tests and an 8-skill endpoint.

## Out of scope

- Publishing the initializer through another registry, bypassing a scanner, or weakening its DOX template.
- Changing the seven generic software-development packages or the autonomous review package.
- Installing or modifying skills in any agent profile.
