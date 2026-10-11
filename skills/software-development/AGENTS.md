# Migration-local blueprint initializer

## Purpose

Own the one-time local workflow that turns a copied AI Software Blueprint into a project-owned maintenance system.

## Ownership

| Path | Owns |
| --- | --- |
| `blueprint-initialization/SKILL.md` | Explicit copied-blueprint initialization and local cleanup. |
| `blueprint-initialization/templates/root-AGENTS.md` | Initial root DOX template for the adopted project. |

## Local Contracts

- `blueprint-initialization` runs only after an explicit operator request to initialize a copied blueprint.
- The copied package is target-project-owned and must be removed with its one-time root routing after successful initialization. It never deletes installed external packages or modifies an agent profile.
- The package is intentionally local because the external community scanner rejects its required project-instruction template. Do not publish, install, or conceal it to evade that review boundary.

## Work Guidance

Keep the template project-neutral and the procedure explicit about preserving unrelated work. Normal material work uses the externally owned CAP/CHG skills after initialization; this package does not replace those contracts.

## Verification

Run `pnpm records:check` and `pnpm test`; confirm `SKILL.md` references `templates/root-AGENTS.md` and both files remain present.

## Child DOX Index

No child DOX documents. Parent contract: `../AGENTS.md`.
