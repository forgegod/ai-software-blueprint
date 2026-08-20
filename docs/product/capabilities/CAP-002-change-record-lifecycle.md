# CAP-002 — Change-record lifecycle

**Status:** implemented

## Behaviour

- `pnpm records:check` validates every `docs/changes/active|archive/CHG-*.md`: filename and title carry the same `CHG-<number>` ID, required metadata (`Status`, `External request`, `Impacts`, `Baseline`) is present, and the canonical phase table header and at least one numbered `## Phase` section exist.
- Records with status `planned`, `in-progress`, or `blocked` belong in `active/`; records with status `done` or `cancelled` belong in `archive/`; a misplaced status fails the check.
- An `in-progress` record must have exactly one in-progress phase; a `planned` record must have none; `Impacts` must reference at least one existing `CAP-<number>`.
- Local Markdown links inside CAPs and CHGs resolve inside the repository; links that escape the repository fail the check.

## Implementation

- `scripts/check-product-records.mjs` — validator: change-record lifecycle, phase, and reference invariants.

## Rules and boundaries

- Tickets remain the request/discussion authority; a CHG is the repository progress authority. Archived CHGs are receipts, never current-behaviour authority.

## Verification

- `tests/changes.test.mjs` — lifecycle placement, metadata, phase, and reference invariants against fixture trees.

## Related contracts

- [Architecture](../../architecture.md)
