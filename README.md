# AI Software Blueprint

A maintenance blueprint for AI-coded software projects. It gives an AI coding agent — with or without an agent harness — the definition and structure a software project has to be maintained under, without giving a technological or architectural direction.

The repository ships the structure and proves the machinery works:

- **DOX hierarchy** — binding `AGENTS.md` contracts from root to leaves; the structure an agent complies with on every change.
- **Product records** — `docs/product/capabilities/CAP-*.md`, the current behavioural contract with executable evidence.
- **Change records** — `docs/changes/active|archive/CHG-*.md`, the single progress authority for material changes.
- **Record validator** — `scripts/check-product-records.mjs`, dependency-free structure, lifecycle, and reference enforcement.
- **Agent playbook handoff** — installation references for optional skills owned by [AI Coding Agent Skills](https://github.com/forgegod/ai-coding-agent-skills). This blueprint owns no skill source, package publisher, or hosting workflow.
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
2. Install the optional skills below, including the separately reviewed initializer
   if adoption automation is wanted. Tell the project's agent to initialize the copy
   and provide the project's goal:

   ```text
   Initialize this AI Software Blueprint for this project.
   Project goal: <one concise, user- or operator-visible outcome>.
   ```

3. The one-time initializer starts from the initial DOX root template, scans the
   project, builds its DOX tree, and rewrites the copied root `README.md` around
   that goal. The new README states the project purpose, intended users, actual
   setup/run/verification commands, and current documentation links.
4. It removes the blueprint proof records and incompatible tooling, retains the
   generic DOX/CAP/CHG contracts and installed skills that fit the project. It removes
   only target-project-owned one-time routing and legacy copies, never a shared
   profile installation.
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

The eighth package, `blueprint-initialization`, is published with its complete
DOX template, but the current Hermes community scanner marks it **dangerous**
because it requires updates to project AGENTS.md. Follow the dedicated repository's
[operator-reviewed manual initializer installation](https://github.com/forgegod/ai-coding-agent-skills#manual-initializer-installation)
only after reviewing both the skill and template. Do not bypass the block with
`--force`, hide the template, or weaken the DOX contract. Manual installation has
no hub scanner approval or hub update tracking.

All skills remain optional execution aids subordinate to this project's DOX.
Installations become available in new agent sessions; existing local edits must
be compared before replacement. Other Agent Skills-compatible agents use their
own package installation mechanism. The blueprint's local checks remain
credential-free and do not fetch or test the external packages.
