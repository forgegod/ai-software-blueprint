# Architecture and product documentation

## Purpose

Describe the live blueprint design, current capability contracts, and repository-tracked change progress.

## Ownership

| File                  | Owns                                                                              |
| --------------------- | --------------------------------------------------------------------------------- |
| `architecture.md`     | Blueprint shape, owned surface, non-goals, enforcement, verification, and adoption. |
| `design-decisions.md` | Rationale for irreversible architecture forks; it is not the live contract.       |
| `product/`            | Current material capability contracts, their executable evidence, and optional CAP-linked wireframes. |
| `changes/`            | Repository-tracked active change progress, archived implementation receipts, and optional CHG-owned review packages under `changes/reviews/`. |

## Local Contracts

- These documents describe the current design; Git history owns historical context.
- Product capability records describe current behaviour; active change records describe implementation progress. Tickets remain request/discussion sources only.
- This repository deliberately documents no privacy or session contract: it holds no session or product data.
- Proposal packages belong to `changes/`; canonical product visuals belong to `product/`. Read both child contracts before choosing a visual artifact's destination.

## Work Guidance

Update the owning document whenever a change alters a documented design, non-goal, enforcement rule, material capability, or active implementation progress. Verify source-backed claims before documenting them; do not copy secrets or real credentials into documentation. Keep non-goals aligned with root `AGENTS.md` Architectural non-goals. Record rationale in `design-decisions.md` only for irreversible forks; it must not contradict the live contract. Read the child product/change contract before editing its records.

## Verification

- Confirm `architecture.md` non-goals and enforcement claims still match root `AGENTS.md` and `scripts/AGENTS.md`.
- Confirm `design-decisions.md` rationale does not contradict root DOX or current-design documentation.
- Run `pnpm records:check` after adding or changing a capability/change record.
- Confirm each review package is linked from its owning CHG and never used as a canonical product visual.

## Child DOX Index

| Child               | Owns                                                         | Read when editing…                                                               |
| ------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `product/AGENTS.md` | Current capability contracts and evidence links.             | Current functionality, capability documentation, or behaviour-test traceability. |
| `changes/AGENTS.md` | Change progress, receipts, and review packages. | Change phases, review artifacts, dependencies, completion, or archiving. |

Root contract: `../AGENTS.md`.
