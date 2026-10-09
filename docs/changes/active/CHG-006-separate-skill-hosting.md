# CHG-006 — Separate skill hosting from the blueprint

**Status:** blocked
**External request:** Direct operator request: Instead of modifing this project create a new project dedicated to host ai coding agent skills as proposed by https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills/#security-scanning using .well-known/ technique. Move all skills from this project to the new one and reference the installation of these skills. In order to create the new project at https://github.com/forgegod make suggestions to the operator and let the operator choose
**Impacts:** CAP-003
**Baseline:** `173dbf23efbb4e77ab03a78a8534503f10fd2404`

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Transfer complete packages and update ownership | done (eight packages and unchanged template verified; four handoff tests pass) | Complete source packages verified in the new repository; installation-handoff tests pass |
| 2 | Publish and verify the external distribution | done (new repo b5fd719; CI and Pages pass; eight packages/nine live files verified; seven installs and one scanner block; 75 blueprint tests pass) | Public index and every advertised file match source; Hermes discovers eight packages, installs seven, and blocks the initializer as documented; blueprint record check and full tests pass |
| 3 | Operator review and blueprint integration | pending | Operator approves and commits the blueprint migration; rerun record check and tests before archive |

## Phase 1 — Transfer complete packages and update ownership

**Goal:** The blueprint consumes separately hosted optional skills and owns no skill source or publisher.

1. Preserve all eight packages, their support template, packaging tests, and publisher in the selected public `forgegod/ai-coding-agent-skills` repository.
2. Verify transfer before removing blueprint copies. Replace local ownership and adoption routing with installation references, update CAP-003, architecture, DOX, and tests.
3. Cancel the superseded blueprint-hosted publisher request without claiming deployment.

**Verification gate:** Complete source packages verified in the new repository; installation-handoff tests pass.

## Phase 2 — Publish and verify the external distribution

**Goal:** The chosen GitHub Pages project endpoint serves complete installable packages with honest scanner boundaries.

1. Commit and push only the new repository; verify CI and Pages deployment.
2. Fetch `https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/index.json` and every advertised file; compare against the new repository's source.
3. Probe Hermes discovery and normal installation in an isolated scratch home. Preserve and document the initializer's scanner block; its template remains complete and manual installation requires separate operator review.
4. Run `npm run records:check`, `npm test`, and `git diff --check` in the blueprint. These invoke the same scripts as the pnpm gate when pnpm is unavailable.

**Verification gate:** Public index and every advertised file match source; Hermes discovers eight packages, installs seven, and blocks the initializer as documented; blueprint record check and full tests pass.

**Evidence:**

- New repository commit: [b5fd719379e5e2156bd1e5754800f2a79a6dfdb9](https://github.com/forgegod/ai-coding-agent-skills/commit/b5fd719379e5e2156bd1e5754800f2a79a6dfdb9).
- [Verify skills run](https://github.com/forgegod/ai-coding-agent-skills/actions/runs/37950308648) and [Publish skills run](https://github.com/forgegod/ai-coding-agent-skills/actions/runs/37950308252) completed successfully for that commit.
- Live index matches the local generated index exactly; all nine advertised files across eight packages byte-match canonical source. Hermes well-known discovery returns all eight identifiers under the project URL.
- Actual normal installer probes in an isolated scratch home install and byte-verify seven packages. The initializer is rejected with `DANGEROUS`/`BLOCKED` for `templates/root-AGENTS.md:27` and leaves no installed package. No scanner bypass was used.
- `npm run records:check`, `npm test`, and `git diff --check` pass in the blueprint; 75 tests pass. The dedicated repository passes 15 tests and its build; npm audit reports zero known vulnerabilities.
- Independent review service failed twice with HTTP 429. Operator explicitly authorized final self-review and passing checks instead; no completed independent approval is claimed.

## Phase 3 — Operator review and blueprint integration

**Goal:** The blueprint migration is merged only after operator approval.

1. Leave all blueprint changes unstaged and uncommitted, as explicitly requested.
2. After operator approval and commit, rerun verification and archive this record with the resulting evidence.

**Verification gate:** Operator approves and commits the blueprint migration; rerun record check and tests before archive.

**Blocker:** Awaiting operator review and integration. Implementation and publication are verified, but the blueprint migration intentionally remains unstaged/uncommitted. Do not archive this record as completed before that boundary.

## Boundaries

- Operator selected public `forgegod/ai-coding-agent-skills`, GitHub Pages, and permission to commit/push that new repository only.
- All eight complete packages are published; seven use normal scanned installation. `blueprint-initialization` requires separate operator-reviewed manual installation because the current community scanner blocks its DOX instruction-update template. No `--force`, concealed template, or weakened DOX contract.
- Skills remain optional execution aids; project DOX remains authoritative. Installed shared packages are never removed during target-project initialization.
- No new primary visual product surface exists in the blueprint; CAP-003 declares `none`. No product wireframe or review package is required.
- Existing profile installations are unchanged. No application runtime, custom registry service, or foreign project checkout dependency is introduced into the blueprint checks.
