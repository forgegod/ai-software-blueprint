# CHG-004 — Review artifact placement and wireframe handoff

**Status:** done
**External request:** Direct operator request: Apply the sugesstions. Do not apply on central wireframe directory for every visual artifact -- as proposed
**Impacts:** CAP-001, CAP-002, CAP-003
**Baseline:** `8149234`

**Local verification:** `node scripts/check-product-records.mjs` passed (3 CAPs, 4 CHGs); `node --test "tests/**/*.test.mjs"` passed (77 tests); `git diff --check` passed; strict Markdown link/anchor scan reported 0 issues. The underlying Node commands were used because `pnpm` was unavailable on PATH.
**Closure boundary:** The verified implementation, current CAPs, tests, and this archived receipt ship together in the approved implementation commit.
**DOX closeout:** Owning contracts, CAPs, and shipped skills match the validator. CI and `skills/AGENTS.md` remain unchanged because their command routing and top-level ownership still apply. No product wireframe or review-package scaffolding is needed for this headless blueprint change.

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Enforce review ownership and canonical visual handoff | done (record validation and full test suite passed) | `node scripts/check-product-records.mjs && node --test "tests/**/*.test.mjs"` exits 0; focused negative fixtures reject misplaced or unowned reviews and missing canonical wireframes |
| 2 | Integrate contracts and verify the complete change | done (77 tests, record check, Markdown links, and diff checks passed) | Record check, full test suite, and `git diff --check` exit 0; DOX, skills, and CAPs agree with validator behavior; archive in the verified implementation commit |

## Phase 1 — Enforce review ownership and canonical visual handoff

**Goal:** Proposal packages have one CHG owner and cannot replace current CAP visuals.

1. Add regression fixtures before changing the validator.
2. Use `docs/changes/reviews/CHG-<number>/` for optional review packages with a review-only README linked from the owning CHG. Keep active/archive directories record-only.
3. Require explicit CAP primary-surface metadata and validate complete canonical wireframe inventory and CAP links.
4. Update affected CAPs and packaged workflows in the same slice.

**Verification gate:** `node scripts/check-product-records.mjs && node --test "tests/**/*.test.mjs"` exits 0; focused negative fixtures reject misplaced or unowned reviews and missing canonical wireframes.

## Phase 2 — Integrate contracts and verify the complete change

**Goal:** The adopted workflow has an explicit placement, implementation, and closure contract.

1. Align root and child DOX, product/change READMEs, architecture, and portable skills. Keep examples synthetic and project-independent; remove foreign-project references from blueprint files.
2. Verify review Markdown is checked for links without being parsed as a CHG; review packages remain at stable paths after done/cancelled closure.
3. Run all gates and review the diff. Archive this receipt with the approved implementation commit and refresh the change index.

**Verification gate:** Record check, full test suite, and `git diff --check` exit 0; DOX, skills, and CAPs agree with validator behavior; archive in the verified implementation commit.

## Out of scope

- Changes to adopting repositories or installed profile skills.
- A shared product directory for every visual artifact.
- Inferring visual changes from source diffs or treating screenshots as behavior evidence.
- Browser rendering or pixel-freshness verification inside the dependency-free validator.
