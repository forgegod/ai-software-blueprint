# Product-record development skills

## Purpose

Own optional, portable agent workflows for maintaining the canonical capability (CAP) and change-progress (CHG) record structure and the CAP-linked wireframe artifacts.

## Ownership

| Path                              | Owns                                                          |
| --------------------------------- | ------------------------------------------------------------- |
| `application-records/SKILL.md`    | Canonical CAP/CHG material-change lifecycle and wireframe handoff. |
| `capability-wireframes/SKILL.md`  | Static HTML/PNG wireframes for primary human-facing CAP surfaces. |

## Local Contracts

- These skills use `docs/product/capabilities/CAP-*.md` for current behaviour and `docs/changes/{active,archive}/CHG-*.md` for implementation progress.
- `capability-wireframes` owns the portable `docs/product/wireframes/` artifact layout. Its HTML and PNG assets illustrate a CAP; implementation and executable tests remain the proof of behaviour.
- Generic phase sequencing remains owned by the shared `phased-plan-*` skills; these skills decide which CAP and CHG records a material change must maintain.

## Work Guidance

Keep the skills complementary: normal material work uses `application-records`; primary human-facing surface work also uses `capability-wireframes`.

## Verification

Read changed SKILL frontmatter, execute the project's CAP/CHG record validation, and validate Markdown links from its repository root.

## Child DOX Index

No child DOX documents. Parent contract: `../AGENTS.md`.
