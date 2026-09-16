# AI Software Blueprint

A maintenance blueprint for AI-coded software projects. It gives an AI coding agent — with or without an agent harness — the definition and structure a software project has to be maintained under, without giving a technological or architectural direction.

The repository ships the structure and proves the machinery works:

- **DOX hierarchy** — binding `AGENTS.md` contracts from root to leaves; the structure an agent complies with on every change.
- **Product records** — `docs/product/capabilities/CAP-*.md`, the current behavioural contract with executable evidence.
- **Change records** — `docs/changes/active|archive/CHG-*.md`, the single progress authority for material changes.
- **Record validator** — `scripts/check-product-records.mjs`, dependency-free structure, lifecycle, and reference enforcement.
- **Agent playbooks** — optional, versioned execution aids under `skills/`: one-time adoption initialization, product-record lifecycle, capability wireframes, and self-contained CAP/CHG phase design, execution, overview, and restructuring.
- **CI gate** — `.github/workflows/ci.yml` runs the record check and the test suite.

This edition deliberately contains no application code, no database, and no framework: `../ai-software-starter-rbac-db` is the reference instantiation, a TanStack Start web app with DocumentDB persistence maintained under this exact framework.

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
2. Tell the project's agent to initialize the copy and provide the project's goal:

   ```text
   Initialize this AI Software Blueprint for this project.
   Project goal: <one concise, user- or operator-visible outcome>.
   ```

3. The one-time initializer starts from the initial DOX root template, scans the
   project, builds its DOX tree, and rewrites the copied root `README.md` around
   that goal. The new README states the project purpose, intended users, actual
   setup/run/verification commands, and current documentation links.
4. It removes the blueprint proof records and incompatible tooling, retains the
   generic DOX/CAP/CHG/phase skills that fit the project, and then removes itself.
   Future agents continue from the project-owned DOX contracts and README.

If the goal cannot be inferred from the request, source, or current documents,
the initializer stops for that input instead of inventing a product description.
See `docs/architecture.md` → Adoption for the retention and replacement boundary.
