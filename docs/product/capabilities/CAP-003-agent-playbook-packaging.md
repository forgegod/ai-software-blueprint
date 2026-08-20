# CAP-003 — Agent playbook packaging

**Status:** implemented

## Behaviour

- The optional agent playbooks under `skills/` follow the Agent Skills format: each `SKILL.md` carries valid YAML frontmatter with `name`, `description`, and `version`, and the name matches its directory.
- Playbooks are execution aids, not product or architecture authority: the repository's DOX contracts remain authoritative even when no agent loads a skill.
- No credentials, profile-local paths, or agent-private state appear in repository skills.

## Implementation

- `skills/` — versioned playbooks: `software-development/application-records` (record lifecycle) and `software-development/capability-wireframes` (static wireframes).

## Rules and boundaries

- A skill is added only when it provides a reusable, checkable procedure beyond this repository's local contracts; project-specific behaviour stays in the adopting project.

## Verification

- `tests/skills.test.mjs` — frontmatter shape, name/directory match, DOX presence, and credential-marker scan against the packaged skills.

## Related contracts

- [Architecture](../../architecture.md)
