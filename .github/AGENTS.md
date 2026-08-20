# GitHub automation

## Purpose

Own repository-hosted automation that independently enforces the quality contract.

## Ownership

| Path             | Owns                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| `workflows/ci.yml` | Required quality verification for pushes and pull requests.         |

## Local Contracts

- CI runs no credentialed or deployment operations.
- `ci.yml` must mirror the root verification gate: install, product-record checks, and the test suite.
- CI needs no services; the gate runs on the checkout alone.

## Work Guidance

Keep Node versions compatible with the root `engines` declaration. A quality-gate change must stay aligned with root `AGENTS.md`, package scripts, and README verification instructions.

## Verification

Validate YAML syntax and run the matching local commands before relying on a workflow change.

## Child DOX Index

No child DOX documents. Root contract: `../AGENTS.md`.
