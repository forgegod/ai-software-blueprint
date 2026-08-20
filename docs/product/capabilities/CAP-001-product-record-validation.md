# CAP-001 — Product record validation

**Status:** implemented

## Behaviour

- `pnpm records:check` validates every `docs/product/capabilities/CAP-*.md`: filename and title carry the same `CAP-<number>` ID, the status is one of `implemented`, `partial`, `retired`, and the `Behaviour`, `Implementation`, and `Verification` sections are present.
- Each `Implementation` reference that looks like a repository file must exist; each `Verification` reference to a `*.test.*` or `*.spec.*` file must exist, and at least one of each must be present.
- `pnpm test` executes the behaviour-test suites under `tests/` with the Node test runner.

## Implementation

- `scripts/check-product-records.mjs` — validator: record shape, IDs, statuses, and file-reference invariants; exports `validateRecords(root)` and accepts an optional root argument.

## Rules and boundaries

- The validator is dependency-free and infers nothing about code changes; it enforces structure only.
- This blueprint performs no build, lint, or format gate; a product adopting it adds its own commands to the root `package.json` and CI in the same change.

## Verification

- `tests/records.test.mjs` — capability identity, status, section, implementation, and test-reference invariants against fixture trees.

## Related contracts

- [Architecture](../../architecture.md)
