# CAP-003 — Agent playbook packaging

**Status:** implemented
**Primary surface:** none

## Behaviour

- The optional agent playbooks under `skills/` follow the Agent Skills format: each `SKILL.md` carries valid YAML frontmatter with `name`, `description`, and `version`, and the name matches its directory.
- Playbooks are execution aids, not product or architecture authority: the repository's DOX contracts remain authoritative even when no agent loads a skill.
- No credentials, profile-local paths, or agent-private state appear in repository skills.
- The packaged CAP/CHG workflow is self-contained: `application-records` routes material work to phase design, execution, overview, and refactoring playbooks; an active CHG remains the only progress authority.
- The visual workflow separates CHG review packages from canonical CAP wireframes. Phase design and execution include an explicit visual handoff for new and existing capabilities, with review retention checked at closure.
- A copied blueprint can be initialized into a project-owned DOX tree through a one-time playbook that replaces the populated blueprint rail, removes proof-only records, and removes itself before normal project work resumes.
- The initializer rewrites the copied root README from the future project's source-backed goal; it stops rather than inventing a product description when that goal is unknown.

## Implementation

- `skills/software-development/` — one-time blueprint initialization, record lifecycle, capability wireframes, and portable CHG phase design, execution, overview, and refactoring playbooks.

## Rules and boundaries

- A skill is added only when it provides a reusable, checkable procedure beyond this repository's local contracts; project-specific behaviour stays in the adopting project.

## Verification

- `tests/skills.test.mjs` — frontmatter shape, name/directory match, DOX presence, credential-marker scan, and self-contained CAP/CHG phase-workflow packaging.

## Related contracts

- [Architecture](../../architecture.md)
