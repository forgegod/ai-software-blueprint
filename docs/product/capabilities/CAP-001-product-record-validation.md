# CAP-001 — Product record validation

**Status:** implemented
**Primary surface:** none

## Behaviour

- `pnpm records:check` validates every `docs/product/capabilities/CAP-*.md`: filename and title carry the same `CAP-<number>` ID, the status is one of `implemented`, `partial`, `retired`, and the `Behaviour`, `Implementation`, and `Verification` sections are present.
- Each `Implementation` reference that looks like a repository file must exist; each `Verification` reference to a `*.test.*` or `*.spec.*` file must exist, and at least one of each must be present.
- `pnpm test` executes the behaviour-test suites under `tests/` with the Node test runner.
- Every CAP declares `Primary surface: human` or `Primary surface: none`; missing or other values fail validation. CAPs cannot link review packages as current product references.
- A human-facing CAP or an existing `docs/product/wireframes/` directory requires `generate.mjs`, `manifest.json`, and `index.html`. Each human-facing CAP has exactly one manifest screen with matching HTML/PNG names and links under `## Links`; an empty or missing manifest cannot bypass this requirement.
- Manifest screens name known human-facing CAPs, a non-empty title, and positive integer viewport dimensions. Duplicate IDs, malformed entries, invalid paths, missing artifacts, unlisted HTML/PNG files, and missing index hyperlinks fail validation.

## Implementation

- `scripts/check-product-records.mjs` — validator: record shape, IDs, statuses, and file-reference invariants; exports `validateRecords(root)` and accepts an optional root argument.

## Rules and boundaries

- The validator is dependency-free and infers nothing about code changes; it enforces structure only.
- Surface classification, generator output freshness, and PNG rendering fidelity remain review and rendering gates. A valid inventory is not proof of those properties.
- This blueprint performs no build, lint, or format gate; a product adopting it adds its own commands to the root `package.json` and CI in the same change.

## Verification

- `tests/records.test.mjs` — capability identity, status, section, implementation, and test-reference invariants against fixture trees.
- `tests/artifacts.test.mjs` — explicit surface metadata, canonical visual inventory, manifest activation, CAP links, and proposal/product separation against synthetic fixtures.

## Related contracts

- [Architecture](../../architecture.md)
