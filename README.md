# AI Software Blueprint

A maintenance blueprint for AI-coded software projects. It gives an AI coding agent — with or without an agent harness — the definition and structure a software project has to be maintained under, without giving a technological or architectural direction.

The repository ships the structure and proves the machinery works:

- **DOX hierarchy** — binding `AGENTS.md` contracts from root to leaves; the structure an agent complies with on every change.
- **Product records** — `docs/product/capabilities/CAP-*.md`, the current behavioural contract with executable evidence.
- **Change records** — `docs/changes/active|archive/CHG-*.md`, the single progress authority for material changes.
- **Record validator** — `scripts/check-product-records.mjs`, dependency-free structure, lifecycle, and reference enforcement.
- **Agent playbooks** — optional, versioned execution aids under `skills/` (product-record lifecycle, capability wireframes).
- **CI gate** — `.github/workflows/ci.yml` runs the record check and the test suite.

This edition deliberately contains no application code, no database, and no framework: `../ai-software-starter-rbac-db` is the reference instantiation, a TanStack Start web app with DocumentDB persistence maintained under this exact framework.

## Verification

```bash
pnpm install
pnpm records:check
pnpm test
```

## Adopting the blueprint

Copy the framework — this `AGENTS.md` chain, `docs/`, `scripts/`, `skills/`, and the CI workflow — into a product project, then record the product's own CAPs with its implementation paths and behaviour tests. The product picks its own stack; the blueprint fixes only the maintenance structure. See `docs/architecture.md` → Adoption for the full path.
