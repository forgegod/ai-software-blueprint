# Product capability records

`capabilities/CAP-*.md` is the repository's current, human-readable product-behaviour index. It complements executable code and tests; it does not replace them.

## Authority

| Question                                                | Authority                                                               |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| Why should work happen?                                 | External ticket or direct operator request                              |
| What does this repository revision do?                  | CAP contract, implementation, and executable tests at the same revision |
| How far is a requested change implemented?              | `../changes/active/CHG-*.md`                                            |
| Why was an irreversible or cross-cutting option chosen? | `../design-decisions.md`                                                |

## When a CAP changes

Update a CAP in the same change when behaviour visible to a user, caller, operator, or tool contract changes. Do not update it for a refactor that preserves those outcomes.

A CAP claim must be specific enough for a test to falsify. Link existing architecture contracts instead of copying their text.

## CAP shape

```markdown
# CAP-001 — Capability name

**Status:** implemented

## Behaviour

- <present-tense, falsifiable outcome>

## Implementation

- `<repository source path>` — <where the behaviour is implemented>

## Rules and boundaries

- <durable local rule or link to an architecture contract>

## Verification

- `<test path>` — <what the test proves>

## Related contracts

- [Architecture](../../architecture.md)
```

Allowed status values: `implemented`, `partial`, `retired`. `partial` states the implemented boundary precisely; it is not a substitute for a future-work list.

## Capability-local decisions

Record a decision in the CAP only when it changes how a reader must use or understand the current behaviour. Put irreversible runtime, persistence, privacy, or observability decisions in `../design-decisions.md` instead.

## Wireframes

Optional. The blueprint ships no `wireframes/` directory. When a product has a primary human-facing surface (a screen, pane, dialog, or multi-step interaction a person uses), activate the workflow: add `wireframes/generate.mjs` (the only editable screen-definition source), the `manifest.json` inventory, `index.html`, and the per-CAP `html/` and `exports/` artifacts, and link both outputs from the qualifying CAP's `## Links` section. Wireframes illustrate the intended interface and are never behaviour evidence; pre-implementation review artifacts stay under the active CHG and never enter the product manifest. `pnpm records:check` validates the wireframe manifest against the disk inventory whenever one exists.

## Hermes integration

This repository ships optional agent playbooks under `../../skills/`. They include
the CAP/CHG lifecycle, capability wireframes, and a self-contained phase workflow:
design, execute, inspect, or restructure an active CHG without a profile-private
progress plan. Hermes discovers them only when the checkout's skill directory is
configured as an external skill directory, for example:

```yaml
skills:
  external_dirs:
    - ${BLUEPRINT_ROOT}/skills
```

Set `BLUEPRINT_ROOT` to this checkout before starting Hermes. The repository contracts remain authoritative even when no agent loads a skill.

## Verification

Run `pnpm records:check`, then the affected behaviour tests.
