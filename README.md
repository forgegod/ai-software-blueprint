# AI Software Blueprint

A maintenance blueprint for AI-coded software projects. It gives an AI coding agent — with or without an agent harness — the definition and structure a software project has to be maintained under, without giving a technological or architectural direction.

The repository ships the structure and proves the machinery works:

- **DOX hierarchy** — binding `AGENTS.md` contracts from root to leaves; the structure an agent complies with on every change.
- **Product records** — `docs/product/capabilities/CAP-*.md`, the current behavioural contract with executable evidence.
- **Change records** — `docs/changes/active|archive/CHG-*.md`, the single progress authority for material changes.
- **Record validator** — `scripts/check-product-records.mjs`, dependency-free structure, lifecycle, and reference enforcement.
- **Agent playbook handoff** — installation references for optional generic skills owned by [AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills), plus a local one-time initializer carried only for blueprint migration.
- **CI gate** — `.github/workflows/ci.yml` runs the record check and the test suite.

The blueprint deliberately contains no application code, database, or application framework. Adopting projects choose their own stack; no external reference project is required.

## Verification

```bash
pnpm install
pnpm records:check
pnpm test
```

## How to use this blueprint

1. Copy the framework into the real project. Preserve existing source and project
   instructions; do not treat this repository's CAPs, CHGs, README, package
   scripts, CI, or tests as the product's truth.
2. Tell the project's agent to read the copied local initializer and initialize the
   copy. Provide the project's goal:

   ```text
   Read skills/software-development/blueprint-initialization/SKILL.md, then initialize this AI Software Blueprint for this project.
   Project goal: <one concise, user- or operator-visible outcome>.
   ```

3. The one-time initializer starts from the initial DOX root template, scans the
   project, builds its DOX tree, and rewrites the copied root `README.md` around
   that goal. The new README states the project purpose, intended users, actual
   setup/run/verification commands, and current documentation links.
4. It removes the blueprint proof records and incompatible tooling, retains the
   generic DOX/CAP/CHG contracts and optional installed skills that fit the project,
   then removes its copied local package and one-time routing.
   Future agents continue from the project-owned DOX contracts and README.

If the goal cannot be inferred from the request, source, or current documents,
the initializer stops for that input instead of inventing a product description.
See `docs/architecture.md` → Adoption for the retention and replacement boundary.

## Install optional agent skills

[AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills) is the
canonical source and publisher. Its discovery index is:

https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/index.json

Install the seven scanner-compatible packages through the normal Hermes installer:

```sh
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/application-records --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/capability-wireframes --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/git-commit-message --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/phased-plan-design --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/phased-plan-execution --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/phased-plan-overview --category software-development
hermes skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/phased-plan-refactoring --category software-development
```

For a named profile, use `-p`; for example:

```sh
hermes -p hermes-dev skills install well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/application-records --category software-development
```

`blueprint-initialization` is intentionally not published. Its complete local
package is copied with this repository at
`skills/software-development/blueprint-initialization/`, because its required
project-instruction updates are blocked by the external community scanner. Read it
only for an explicit migration request; do not install, publish, conceal, or bypass
a scanner to use it.

All skills remain optional execution aids subordinate to this project's DOX.
Installations become available in new agent sessions; existing local edits must
be compared before replacement. Other Agent Skills-compatible agents use their
own package installation mechanism. The blueprint's local checks remain
credential-free and do not fetch or test the external packages.
