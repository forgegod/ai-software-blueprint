# CAP-002 — Change-record lifecycle

**Status:** implemented
**Primary surface:** none

## Behaviour

- `pnpm records:check` validates every `docs/changes/active|archive/CHG-*.md`: filename and title carry the same `CHG-<number>` ID, required metadata (`Status`, `External request`, `Impacts`, `Baseline`) is present, and the canonical phase table header and at least one numbered `## Phase` section exist.
- Records with status `planned`, `in-progress`, or `blocked` belong in `active/`; records with status `done` or `cancelled` belong in `archive/`; a misplaced status fails the check.
- An `in-progress` record must have exactly one in-progress phase; a `planned` record must have none; `Impacts` must reference at least one existing `CAP-<number>`.
- Local Markdown links inside CAPs and CHGs resolve inside the repository; links that escape the repository fail the check.
- `active/` and `archive/` accept only flat CHG record files; loose assets, design notes, and nested directories fail with a review-location diagnostic.
- Optional `docs/changes/reviews/CHG-<number>/` packages have an existing active or archived CHG owner, a `README.md` declaring `Status: review-only`, and a link from the owner to that README. Malformed directory names, orphaned packages, missing labels, and missing owner links fail validation.
- Markdown inside review packages is link-checked without being parsed or counted as CHG records. Packages remain valid at the same path when their owner becomes `done` or `cancelled` in the archive.

## Implementation

- `scripts/check-product-records.mjs` — validator: change-record lifecycle, phase, and reference invariants.

## Rules and boundaries

- Tickets remain the request/discussion authority; a CHG is the repository progress authority. Archived CHGs are receipts, never current-behaviour authority.
- Review retention and freezing after closure are workflow obligations; validation checks the working tree, not historical immutability or visual approval.

## Verification

- `tests/changes.test.mjs` — lifecycle placement, metadata, phase, and reference invariants against fixture trees.
- `tests/artifacts.test.mjs` — review ownership, labeling, location, Markdown links, and stable-path archive/cancellation fixtures.

## Related contracts

- [Architecture](../../architecture.md)
