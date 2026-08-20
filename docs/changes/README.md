# Change records

A `CHG-*.md` file is the repository's progress record for one material implementation request. The external tracker remains the request and discussion source; it does not define current behaviour or implementation progress.

## Lifecycle

```text
planned → in-progress → blocked → done
                    ↘ cancelled
```

`planned`, `in-progress`, and `blocked` records live in `active/`. `done` and `cancelled` records move to `archive/`. Archived records are implementation receipts, not product specifications; update the affected CAP files before archiving.

## Required metadata

Every CHG names:

- its stable `CHG-<number>` identity;
- the external ticket or direct operator request;
- affected CAP IDs;
- the baseline commit or release being changed;
- execution phases with a status and executable verification gate.

Use `pending`, `in-progress`, and `done (<evidence>)` for phase rows. A phase is done only after its gate passes. Keep one phase in progress at a time.

## CHG shape

```markdown
# CHG-001 — Change name

**Status:** planned
**External request:** <ticket URL or direct operator request>
**Impacts:** CAP-001
**Baseline:** `<commit or release>`

| #   | Phase                           | Status  | Verification gate                                          |
| --- | ------------------------------- | ------- | ---------------------------------------------------------- |
| 1   | Specify changed behaviour       | pending | CAP and behaviour-test change reviewed                     |
| 2   | Implement vertical slice        | pending | Targeted test command exits 0                              |
| 3   | Integrate current-state records | pending | `pnpm records:check && pnpm test` exits 0                  |

## Phase 1 — Specify changed behaviour

**Goal:** <observable target>

1. <exact steps>

**Verification gate:** <executable predicate>

## Out of scope

- <tempting but excluded work>
```

## Splitting and decisions

Split a CHG only at a verified phase boundary. Link the direct dependency and keep the external request plus impacted CAPs in every resulting active record.

A local implementation choice belongs in the affected CAP only if it constrains current behaviour. An irreversible or cross-cutting decision belongs in `../design-decisions.md`. Do not use a CHG as a decision diary.

## Hermes integration

The optional `application-records` skill drives this lifecycle for Hermes agents. When a material change uses this repository's records, the active CHG file is the tracked execution plan rather than a profile-private plan.

## Verification

Run `pnpm records:check` before the relevant phase gate and again before archiving. The repository's test gate remains required for the implementation itself.
