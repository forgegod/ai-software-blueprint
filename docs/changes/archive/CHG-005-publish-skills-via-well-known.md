# CHG-005 — Publish skills via a well-known endpoint

**Status:** cancelled
**External request:** Direct operator request: convert the repository so its skills install through the `.well-known` convention.
**Impacts:** CAP-003
**Baseline:** `173dbf23efbb4e77ab03a78a8534503f10fd2404`

| #   | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Define public skill-distribution contract | pending | Architecture, CAP-003, and decision record describe the public endpoint and its boundary |
| 2 | Build and deploy the endpoint artifact | pending | Generator creates a Hermes-compatible index and all advertised skill files |
| 3 | Verify repository integration | pending | `pnpm records:check && pnpm test` exits 0 |

## Phase 1 — Define public skill-distribution contract

**Goal:** Make the existing skill collection installable through a stable public endpoint without adding an application runtime.

1. Publish the static artifact through GitHub Pages at the repository project-page URL.
2. Keep `skills/` as the canonical, categorized authoring tree; generate a flat public endpoint so the source tree is not duplicated.
3. Use Hermes's current `/.well-known/skills/index.json` format and package every advertised support file.

**Verification gate:** Architecture, CAP-003, and decision record describe the public endpoint and its boundary.

## Phase 2 — Build and deploy the endpoint artifact

**Goal:** Generate and deploy the public, installable skill collection.

1. Add a dependency-free Node generator that discovers every `SKILL.md`, validates its public metadata, copies allowed support files, and emits `/.well-known/skills/index.json`.
2. Add a GitHub Pages workflow that runs the generator and deploys only its output on pushes to `main` and manual dispatches.
3. Add tests for the generated legacy Hermes index and every advertised artifact.

**Verification gate:** Generator creates a Hermes-compatible index and all advertised skill files.

## Phase 3 — Verify repository integration

**Goal:** Close the public-distribution change with aligned current-state records.

1. Update the user-facing installation instructions and DOX contracts.
2. Run the record check and full test suite.
3. Archive this receipt after its gates pass.

**Verification gate:** `pnpm records:check && pnpm test` exits 0.

## Out of scope

**Cancellation:** The operator chose a dedicated skills repository instead of hosting
from this blueprint. No blueprint-owned public endpoint was deployed, and the original
phase gates were not completed. Continued migration is tracked by
[CHG-006](../active/CHG-006-separate-skill-hosting.md). This cancelled receipt makes no implementation claim.

- An application runtime, API, or custom registry service.
- Publishing any secret, profile-local state, or repository control documents.
- Replacing direct GitHub or external-directory installation paths.