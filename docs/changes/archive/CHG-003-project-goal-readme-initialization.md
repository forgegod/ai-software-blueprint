# CHG-003 — Project-goal README during initialization

**Status:** done
**External request:** Direct operator request: update the blueprint's README how-to-use guidance and require initialization to rewrite the copied README for the future project's goal.
**Impacts:** CAP-003
**Baseline:** `9d043be`

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Specify project-goal README initialization | done (README, initializer, adoption contract, CAP, and packaging test) | README, initializer, adoption contract, CAP, and packaging test reviewed |
| 2 | Integrate and archive the change | done (`pnpm records:check && pnpm test`) | `pnpm records:check && pnpm test` exits 0 |

## Phase 1 — Specify project-goal README initialization

**Goal:** The adoption path requires a project-owned root README rather than leaving blueprint usage instructions in a real project.

1. Make the root README give a complete copy-and-initialize procedure.
2. Require the initializer to derive or request the future project's goal and rewrite its root README around that goal.
3. Add executable packaging coverage and update the capability/adoption contracts.

**Verification gate:** README, initializer, adoption contract, CAP, and packaging test reviewed.

## Phase 2 — Integrate and archive the change

**Goal:** Verify the full blueprint package and retain this request as an implementation receipt.

1. Run record validation and the complete test suite.
2. Mark both phase rows with verification evidence, set this CHG `done`, move it to `archive/`, and refresh the change index.

**Verification gate:** `pnpm records:check && pnpm test` exits 0.

## Out of scope

- Writing the README for a particular future project without its goal and source evidence.
