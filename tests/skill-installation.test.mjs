import { test } from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (relative) => readFile(path.join(root, relative), "utf8");
const base = "well-known:https://forgegod.github.io/ai-coding-agent-skills/.well-known/skills/";
const normal = ["application-records", "capability-wireframes", "git-commit-message", "phased-plan-design", "phased-plan-execution", "phased-plan-overview", "phased-plan-refactoring"];

test("blueprint owns only its migration-local initializer, not publication machinery", async () => {
  for (const relative of ["scripts/build-well-known-skills.mjs", ".github/workflows/publish-skills.yml", "tests/well-known-skills.test.mjs"]) {
    await assert.rejects(access(path.join(root, relative)), { code: "ENOENT" });
  }
  await access(path.join(root, "skills/software-development/blueprint-initialization/SKILL.md"));
  await access(path.join(root, "skills/software-development/blueprint-initialization/templates/root-AGENTS.md"));
});

test("README documents all seven normal well-known installations", async () => {
  const source = await read("README.md");
  for (const name of normal) {
    assert.ok(source.includes(`hermes skills install ${base}${name} --category software-development`), `missing ${name} install`);
  }
  assert.match(source, /hermes -p hermes-dev skills install/);
  assert.doesNotMatch(source, /BLUEPRINT_ROOT|external_dirs/);
});

test("initializer is a local migration tool rather than a scan bypass", async () => {
  const source = await read("README.md");
  assert.match(source, /blueprint-initialization/);
  assert.match(source, /intentionally not published/i);
  assert.match(source, /do not install, publish, conceal, or bypass/i);
  const contracts = await read("AGENTS.md");
  assert.match(contracts, /explicitly asks/);
  assert.match(contracts, /copied local/);
  const initializer = await read("skills/software-development/blueprint-initialization/SKILL.md");
  assert.match(initializer, /Remove the local initializer after use/);
  assert.match(initializer, /templates\/root-AGENTS\.md/);
});

test("current contracts delegate skill ownership without claiming remote behavior proof", async () => {
  for (const relative of ["AGENTS.md", "docs/architecture.md", "docs/product/README.md"]) {
    const source = await read(relative);
    assert.match(source, /forgegod\/ai-coding-agent-skills/);
    assert.doesNotMatch(source, /BLUEPRINT_ROOT|external_dirs/);
  }
  const cap = await read("docs/product/capabilities/CAP-003-agent-playbook-packaging.md");
  assert.match(cap, /Primary surface:\*\* none/);
  assert.match(cap, /tests\/skill-installation\.test\.mjs/);
  assert.match(cap, /does not prove.*remote/is);
});
