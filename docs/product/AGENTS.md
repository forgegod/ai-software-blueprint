# Product capability records

## Purpose

Own the repository's concise, current-state account of material product behaviour and the executable evidence that proves it.

## Ownership

| Path                    | Owns                                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| `README.md`             | Capability-record lifecycle, scope rule, metadata, and authoring templates. |
| `index.md`              | Navigable catalogue of current capabilities without duplicating their behaviour. |
| `capabilities/CAP-*.md` | One current behavioural contract per material capability.                 |
| `wireframes/`           | Optional, activated when a product has a primary human-facing surface.    |

## Local Contracts

- A CAP document describes present behaviour at the repository revision, not a request, plan, or historical narrative.
- A material claim links to the implementation and at least one executable behaviour test. Code and its tests decide a conflict; correct the CAP in the same change.
- Capability-local decisions belong in the CAP; irreversible or cross-cutting decisions belong in `../design-decisions.md`.
- A CAP with a primary human-facing surface links its static wireframe HTML and PNG under `## Links` when the wireframe workflow is active; the wireframe illustrates the interface and never replaces behaviour-test evidence.

## Work Guidance

- Add or amend a CAP in the same change as a material user-visible, operator-visible, or tool-behaviour change.
- Do not create CAP churn for refactors that preserve observable behaviour.
- Keep the index as links and status only; do not duplicate CAP prose.
- Read `README.md` before creating or completing a CAP.

## Verification

Run `pnpm records:check` and the affected behaviour tests.

## Child DOX Index

No child DOX documents while the wireframe workflow is inactive. Parent contract: `../AGENTS.md`; active implementation status: `../changes/AGENTS.md`.
