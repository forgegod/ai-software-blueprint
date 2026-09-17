# DOX framework

- DOX is the AGENTS.md hierarchy installed in this repository.
- Follow applicable DOX instructions for every edit.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees.
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it.

## Read Before Editing

1. Read the root AGENTS.md.
2. Identify every file or folder you expect to touch.
3. Walk from the repository root to each target path.
4. Read every AGENTS.md found along each route.
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there.
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules.
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX.

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Adoption initialization

Only when an operator explicitly asks to initialize a copied blueprint for a
real project, load `skills/software-development/blueprint-initialization` before
ordinary project work. It replaces this populated blueprint rail with the
initial DOX template, establishes project-owned contracts, removes blueprint
proof records, and then removes its own one-time routing. Do not initialize this
blueprint repository merely because it contains the framework.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index.
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index.
- Each parent explains what its direct children cover and what stays owned by the parent.
- The closer a doc is to the work, the more specific and practical it must be.

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards.
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty.
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists.

Default section order:

- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational.
- Document stable contracts, not diary entries.
- Put broad rules in parent docs and concrete details in child docs.
- Prefer direct bullets with explicit names.
- Do not duplicate rules across many files unless each scope needs a local version.
- Delete stale notes instead of explaining history.
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist.

## Closeout

1. Re-check changed paths against the DOX chain.
2. Update nearest owning docs and any affected parents or children.
3. Refresh every affected Child DOX Index.
4. Remove stale or contradictory text.
5. Run existing verification when relevant.
6. Report any docs intentionally left unchanged and why.

## User Preferences

- Documentation describes the current design only; Git history carries history and rationale that no longer affects the live contract.
- Use explicit file markers such as `@file:` in communication rather than inferring file-path intent.
- Keep blueprint files self-contained and project-independent: use generic examples and synthetic fixtures, not references to foreign projects or checkouts.

## Blueprint intent

- This repository is a maintenance blueprint for AI-coded software projects: it defines how changes are proposed, tracked, proven, and recorded, and keeps an AI coding agent on track through the DOX hierarchy, records, and executable evidence.
- It deliberately ships no application code, framework, or persistence technology. The product project picks its own stack; this blueprint fixes only the maintenance structure.
- The blueprint's own record system is its living surface: its CAPs describe the record-validation and lifecycle pipeline, and the `node:test` suites under `tests/` prove it.

## Architectural decisions

- **Record authority.** `docs/product/capabilities/CAP-*.md` states the current, material product behaviour of this repository revision. Every material claim links to executable behaviour evidence; code and tests decide any conflict.
- **Change progress.** `docs/changes/active/CHG-*.md` is the single repository authority for progress on a material requested change. Tickets remain the request/discussion authority, not the implementation-progress or current-behaviour authority.
- **Material changes.** A material user-visible or operator-visible behaviour change updates the affected CAP, behaviour tests, and active CHG in the same change. A refactor with no observable behaviour change does not create CAP churn.
- **Receipts.** A completed CHG moves to `docs/changes/archive/` only after its CAP and tests state the merged behaviour. Archived CHGs are implementation receipts, never the current product contract.
- **Playbooks.** `skills/` ships optional, versioned agent playbooks for product records, capability wireframes, and self-contained CHG phase design, execution, overview, and restructuring. They are execution aids; the DOX contracts remain authoritative.

## Architectural non-goals

These shapes are out of scope until the live contract is deliberately changed:

- No application code, UI, or server runtime: the blueprint owns no product runtime to adopt.
- No technology mandates: language, framework, database, and persistence choices belong to the adopting product.
- No second progress system: tickets, issue trackers, or private plans never replace the active CHG as progress authority.
- No shipped wireframe artifacts by default: the wireframe workflow activates when a product has a primary human-facing surface (see `docs/product/README.md` → Wireframes).
- No session, role, or product data in this repository.

## Architecture change control

If proposed work conflicts with an Architectural decision or non-goal, stop and obtain explicit approval. Do not silently introduce a forbidden technology, record system, or dependency.

An approved architecture change updates, in the same change:

1. these Architectural decisions and non-goals;
2. `docs/architecture.md`;
3. affected behavior tests and child DOX contracts; and
4. `docs/design-decisions.md` when it is an irreversible fork.

## Product and change records

- Read `docs/product/README.md` and `docs/changes/README.md` before creating, changing, splitting, or closing a CAP/CHG record.
- A CAP with a primary human-facing surface links its static wireframe HTML and PNG from `docs/product/wireframes/` under `## Links` when the wireframe workflow is active. Wireframes are generated from `docs/product/wireframes/generate.mjs` and illustrate the interface; they are never behaviour evidence, and pre-implementation review artifacts stay under the active CHG. Optional repository agent playbooks under `skills/` do not replace these contracts.

## Workspace verification

- `pnpm records:check` validates product/change record structure, lifecycle, and references (and the wireframe manifest when one exists).
- `pnpm test` runs the `node:test` suites that prove the record validator and the playbook packaging.
- `.github/workflows/ci.yml` runs the same gate for GitHub pushes and pull requests.

## Child DOX Index

| Child            | Owns                                         | Read when editing…                                                                 |
| ---------------- | -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `docs/AGENTS.md` | Architecture, product, and change documentation. | Blueprint design, current-capability, or implementation-progress documentation. |
| `scripts/AGENTS.md` | Record-validation script.                  | The product-record validator, its behaviour, or its test fixtures.                |
| `.github/AGENTS.md` | Repository-hosted quality automation.     | GitHub Actions workflows or CI policy.                                             |
| `skills/AGENTS.md` | Versioned optional agent playbooks.        | Repository-shipped agent workflows (adoption initialization, product records, CHG phases, capability wireframes). |

### Root-owned cross-cutting files

| Path                                 | Contract                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `package.json`                         | Package manager, engine declaration, and root commands.                      |
| `.gitignore`                         | Node artifact and secret exclusion.                                          |
| `README.md`                          | Blueprint overview, verification, and adoption entry point.                  |
| `docs/design-decisions.md`           | Rationale for irreversible architecture forks; never the live architecture contract. |
| `.github/workflows/ci.yml`           | Credential-free CI quality gate.                                             |
| `scripts/check-product-records.mjs`  | Record structure, lifecycle, and reference enforcement.                     |
