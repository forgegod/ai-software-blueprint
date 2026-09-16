# CHG-002 — Initialize an adopted blueprint

**Status:** done
**External request:** Direct operator request: when this blueprint is transferred to a real project, remove blueprint-specific details while leaving future AI agents able to continue under the initialized DOX and CAP/CHG framework.
**Impacts:** CAP-003
**Baseline:** `9d043be`

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Define and package adoption initialization | done (adoption skill, initial DOX template, CAP, routing, and packaging test) | Adoption skill, root routing, CAP, and packaging test reviewed |
| 2 | Integrate and archive the change | done (`pnpm records:check && pnpm test`) | `pnpm records:check && pnpm test` exits 0 |

## Phase 1 — Define and package adoption initialization

**Goal:** An explicit initialization request turns the copied framework into project-owned contracts and records without retaining blueprint proof as product truth.

1. Add a portable initialization playbook that classifies retained framework, replaced project contracts, and deleted blueprint proof.
2. Route explicit adoption requests from the root DOX contract to that playbook.
3. Update adoption documentation and CAP-003 with executable packaging coverage.

**Verification gate:** Adoption skill, root routing, CAP, and packaging test reviewed.

## Phase 2 — Integrate and archive the change

**Goal:** Prove the initialized-template workflow and retain this record only as an implementation receipt.

1. Run record validation and the complete test suite.
2. Mark both phase rows with verification evidence, set this CHG `done`, move it to `archive/`, and refresh the change index.

**Verification gate:** `pnpm records:check && pnpm test` exits 0.

## Out of scope

- Initializing a particular product repository.
- Inventing a product architecture, CAP, CHG, verification command, or technology choice.
