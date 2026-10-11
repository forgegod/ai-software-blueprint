# Migration-local agent skill

## Purpose

Own the one-time initializer that ships only with AI Software Blueprint copies so a project can migrate the copied framework into project-owned contracts.

## Ownership

| Path | Owns |
| --- | --- |
| `software-development/` | The migration-local blueprint initializer and its template. |

## Local Contracts

- This local package exists because the initializer's required project-instruction changes are blocked by the external skill scanner; it is not published or installed from `forgegod/ai-coding-agent-skills`.
- It is a one-time migration tool, not a source of product behaviour, progress, or architectural authority.
- When a copied blueprint is initialized, remove this package and its root routing from that target project after the initialized DOX tree replaces them.
- Do not add credentials, profile-local paths, agent-private state, or other reusable skill packages here.

## Work Guidance

Keep the package complete: `SKILL.md` and its template must move together. Keep generic CAP/CHG skills externally owned and preserve the target project's existing work during initialization.

## Verification

Run `pnpm records:check` and `pnpm test`. Read the package frontmatter and verify the template remains linked from `SKILL.md`.

## Child DOX Index

| Child | Owns | Read when editing… |
| --- | --- | --- |
| `software-development/AGENTS.md` | The migration-local initializer package. | Initializer procedure or template. |

Parent contract: `../AGENTS.md`.
