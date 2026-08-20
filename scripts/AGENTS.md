# Operator scripts

## Purpose

Own the record-validation script and its behaviour fixtures.

## Ownership

| File                      | Owns                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `check-product-records.mjs` | Dependency-free validation of capability/change-record identity, lifecycle, and references. |

## Local Contracts

- The script validates record shape, lifecycle placement, resolvable references, and local Markdown links only; it must not claim to infer whether arbitrary code changes alter user-visible behaviour.
- It accepts an optional repository-root argument (default: the script's parent directory) and exports `validateRecords(root)` so behaviour tests can run it against fixture trees.
- The wireframe manifest check activates only when `docs/product/wireframes/manifest.json` exists; blueprint checkouts without an activated wireframe workflow skip it.
- The script stays dependency-free: no installs, no network, no workspace tooling.

## Work Guidance

Extend the validator with new invariants by adding an explicit error and covering both a fixture that trips it and the happy path in `tests/`. Keep error messages stable: they are the test surface.

## Verification

Run `pnpm records:check`, `pnpm test`, and the CI workflow's equivalent steps.

## Child DOX Index

No child DOX documents. Root contract: `../AGENTS.md`.
