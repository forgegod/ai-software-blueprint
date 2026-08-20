#!/usr/bin/env node
/**
 * Product capability/change-record checks.
 *
 * This validates structural, lifecycle, and reference invariants. It cannot
 * infer whether an arbitrary source change altered observable behaviour; that
 * remains a review and agent responsibility.
 *
 * Usage:
 *   node check-product-records.mjs [rootDir]
 *
 * `rootDir` (optional) is the repository root to validate; it defaults to the
 * parent directory of this script. The argument exists so the behaviour can be
 * exercised against fixture trees from the `node:test` suites in `tests/`.
 *
 * The validator is importable: `validateRecords(root)` returns
 * `{ errors, capabilities, changes, manifest }` without touching the process
 * exit code, so tests assert on the returned error list.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const capabilityStatuses = new Set(["implemented", "partial", "retired"]);
const activeChangeStatuses = new Set(["planned", "in-progress", "blocked"]);
const archivedChangeStatuses = new Set(["done", "cancelled"]);
const changeTableHeader =
  /^\|\s*#\s*\|\s*Phase\s*\|\s*Status\s*\|\s*Verification gate\s*\|/m;

/**
 * A candidate is treated as a repository reference when it is relative,
 * contains no whitespace or path traversal, and is either a file reference
 * (its base name carries an extension) or an explicit directory reference
 * (trailing slash). This keeps the "points at a real path" invariant
 * checkable without misfiring on backticked prose.
 *
 * @param {string} candidate
 */
function isRepositoryReference(candidate) {
  if (
    !/^[A-Za-z0-9@._/-]+$/.test(candidate) ||
    path.isAbsolute(candidate) ||
    candidate.includes("..")
  ) {
    return false;
  }
  const base = candidate.split("/").at(-1);
  return base.includes(".") || candidate.endsWith("/");
}

/**
 * Backticked candidates in a section that look like repository files.
 *
 * @param {string} source
 * @param {string} heading
 * @param {(candidate: string) => boolean} filter
 * @returns {string[]}
 */
function sectionFileRefs(source, heading, filter) {
  const body = section(source, heading);
  if (!body) return [];
  return [...body.matchAll(/`([^`]+)`/g)]
    .map((match) => match[1].trim())
    .filter(filter);
}

/** @param {string} directory */
async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(
    (error) => {
      if (error && typeof error === "object" && error.code === "ENOENT") {
        return [];
      }
      throw error;
    },
  );
  const files = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(file)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(file);
    }
  }
  return files.sort();
}

/** @param {string} source @param {string} label */
function requiredField(source, label) {
  const match = source.match(
    new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, "m"),
  );
  return match?.[1]?.trim() ?? null;
}

/** @param {string} source @param {string} heading */
function section(source, heading) {
  const marker = `## ${heading}`;
  const start = source.indexOf(marker);
  if (start < 0) return null;

  const afterHeading = source.indexOf("\n", start);
  if (afterHeading < 0) return "";
  const remainder = source.slice(afterHeading + 1);
  const nextHeading = remainder.search(/^## /m);
  return nextHeading < 0 ? remainder : remainder.slice(0, nextHeading);
}

/** @param {string} file @param {string} root @param {string[]} errors */
async function validateLocalMarkdownLinks(file, root, errors) {
  const source = await readFile(file, "utf8");
  const prose = source.replace(/```[\s\S]*?```/g, "");
  for (const match of prose.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, "");
    if (
      !target ||
      target.startsWith("#") ||
      /^(?:https?:|mailto:)/.test(target)
    ) {
      continue;
    }

    const targetPath = target.split("#", 1)[0];
    if (!targetPath) continue;

    const resolved = path.resolve(path.dirname(file), targetPath);
    const relative = path.relative(root, resolved);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      errors.push(
        `${path.relative(root, file)} links outside the repository: ${target}`,
      );
      continue;
    }

    const targetInfo = await stat(resolved).catch(() => null);
    if (!targetInfo) {
      errors.push(`${path.relative(root, file)} has broken local link: ${target}`);
    }
  }
}

/**
 * Validate the record tree under `root`.
 *
 * @param {string} root
 * @returns {Promise<{errors: string[], capabilities: number, changes: number, manifest: boolean}>}
 */
export async function validateRecords(root) {
  const errors = [];
  const productRoot = path.join(root, "docs", "product");
  const capabilitiesRoot = path.join(productRoot, "capabilities");
  const changesRoot = path.join(root, "docs", "changes");
  const activeChangesRoot = path.join(changesRoot, "active");
  const archiveChangesRoot = path.join(changesRoot, "archive");
  const wireframesRoot = path.join(productRoot, "wireframes");

  const capabilityFiles = await markdownFiles(capabilitiesRoot);
  const capabilityIds = new Set();

  for (const file of capabilityFiles) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");
    const filename = path.basename(file);
    const filenameMatch = filename.match(/^(CAP-\d+)-[a-z0-9-]+\.md$/);
    const titleMatch = source.match(/^# (CAP-\d+) — .+$/m);
    const status = requiredField(source, "Status");

    if (!filenameMatch) {
      errors.push(`${relative} must use CAP-<number>-<slug>.md`);
    }
    if (!titleMatch) {
      errors.push(`${relative} must begin with '# CAP-<number> — <name>'`);
    }
    if (filenameMatch && titleMatch && filenameMatch[1] !== titleMatch[1]) {
      errors.push(`${relative} filename and title capability IDs differ`);
    }
    if (titleMatch && capabilityIds.has(titleMatch[1])) {
      errors.push(`${relative} duplicates capability ID ${titleMatch[1]}`);
    }
    if (titleMatch) capabilityIds.add(titleMatch[1]);
    if (!status || !capabilityStatuses.has(status)) {
      errors.push(
        `${relative} has invalid capability status '${status ?? "missing"}'`,
      );
    }
    if (!section(source, "Behaviour")) {
      errors.push(`${relative} must include a Behaviour section`);
    }
    if (!section(source, "Implementation")) {
      errors.push(`${relative} must include an Implementation section`);
    }
    if (!section(source, "Verification")) {
      errors.push(`${relative} must include a Verification section`);
    }

    const implementation = sectionFileRefs(
      source,
      "Implementation",
      isRepositoryReference,
    );
    if (implementation.length === 0) {
      errors.push(
        `${relative} must reference at least one existing implementation file in Implementation`,
      );
    }
    for (const implementationPath of implementation) {
      const info = await stat(
        path.join(root, implementationPath),
      ).catch(() => null);
      if (!info) {
        errors.push(
          `${relative} references missing implementation file: ${implementationPath}`,
        );
      }
    }

    const tests = sectionFileRefs(
      source,
      "Verification",
      (candidate) =>
        isRepositoryReference(candidate) &&
        /(?:^|\/)[^/]+\.(test|spec)\.[cm]?[jt]sx?$/.test(candidate),
    );
    if (tests.length === 0) {
      errors.push(
        `${relative} must reference at least one executable behaviour test in Verification`,
      );
    }
    for (const testPath of tests) {
      const info = await stat(path.join(root, testPath)).catch(() => null);
      if (!info?.isFile()) {
        errors.push(`${relative} references missing behaviour test: ${testPath}`);
      }
    }

    await validateLocalMarkdownLinks(file, root, errors);
  }

  const changeFiles = [
    ...(await markdownFiles(activeChangesRoot)).map((file) => ({
      file,
      place: "active",
    })),
    ...(await markdownFiles(archiveChangesRoot)).map((file) => ({
      file,
      place: "archive",
    })),
  ];
  const changeIds = new Set();

  for (const { file, place } of changeFiles) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");
    const filename = path.basename(file);
    const filenameMatch = filename.match(/^(CHG-\d+)-[a-z0-9-]+\.md$/);
    const titleMatch = source.match(/^# (CHG-\d+) — .+$/m);
    const status = requiredField(source, "Status");
    const externalRequest = requiredField(source, "External request");
    const impacts = requiredField(source, "Impacts");
    const baseline = requiredField(source, "Baseline");

    if (!filenameMatch) {
      errors.push(`${relative} must use CHG-<number>-<slug>.md`);
    }
    if (!titleMatch) {
      errors.push(`${relative} must begin with '# CHG-<number> — <name>'`);
    }
    if (filenameMatch && titleMatch && filenameMatch[1] !== titleMatch[1]) {
      errors.push(`${relative} filename and title change IDs differ`);
    }
    if (titleMatch && changeIds.has(titleMatch[1])) {
      errors.push(`${relative} duplicates change ID ${titleMatch[1]}`);
    }
    if (titleMatch) changeIds.add(titleMatch[1]);

    const validStatuses =
      place === "active" ? activeChangeStatuses : archivedChangeStatuses;
    if (!status || !validStatuses.has(status)) {
      errors.push(
        `${relative} status '${status ?? "missing"}' is invalid for ${place}/`,
      );
    }
    if (!externalRequest)
      errors.push(`${relative} must name an External request`);
    if (!impacts) errors.push(`${relative} must name impacted CAP IDs`);
    if (!baseline) errors.push(`${relative} must name a Baseline`);
    if (!changeTableHeader.test(source)) {
      errors.push(`${relative} must include the canonical phase table header`);
    }
    if (!/^## Phase \d+ — /m.test(source)) {
      errors.push(
        `${relative} must include at least one numbered Phase section`,
      );
    }
    const inProgressPhases = [
      ...source.matchAll(/^\|\s*\d+\s*\|.*\|\s*in-progress\s*\|/gm),
    ];
    if (status === "in-progress" && inProgressPhases.length !== 1) {
      errors.push(`${relative} must have exactly one in-progress phase`);
    }
    if (status === "planned" && inProgressPhases.length !== 0) {
      errors.push(`${relative} cannot have an in-progress phase while planned`);
    }
    if (inProgressPhases.length > 1) {
      errors.push(`${relative} has more than one in-progress phase`);
    }

    const impactedCapabilities = impacts?.match(/CAP-\d+/g) ?? [];
    if (impactedCapabilities.length === 0) {
      errors.push(`${relative} must reference at least one CAP ID in Impacts`);
    }
    for (const capabilityId of impactedCapabilities) {
      if (!capabilityIds.has(capabilityId)) {
        errors.push(`${relative} references unknown capability ${capabilityId}`);
      }
    }

    await validateLocalMarkdownLinks(file, root, errors);
  }

  for (const file of [
    path.join(productRoot, "README.md"),
    path.join(productRoot, "index.md"),
    path.join(changesRoot, "README.md"),
  ]) {
    const info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      errors.push(`${path.relative(root, file)} is required`);
    } else {
      await validateLocalMarkdownLinks(file, root, errors);
    }
  }

  const productIndex = path.join(productRoot, "index.md");
  const indexSource = await readFile(productIndex, "utf8").catch(() => "");
  for (const capabilityId of capabilityIds) {
    if (!indexSource.includes(capabilityId)) {
      errors.push(`docs/product/index.md must link ${capabilityId}`);
    }
  }

  // Optional wireframe inventory: when a product activates the wireframe
  // workflow, docs/product/wireframes/manifest.json must match the on-disk
  // html/ and exports/ pairs, index.html must link every manifest screen, and
  // each CAP's `## Links` section must point at the same HTML and PNG paths.
  let manifest = false;
  const manifestPath = path.join(wireframesRoot, "manifest.json");
  const manifestInfo = await stat(manifestPath).catch(() => null);
  if (manifestInfo?.isFile()) {
    manifest = true;
    let parsed;
    try {
      parsed = JSON.parse(await readFile(manifestPath, "utf8"));
    } catch {
      parsed = null;
      errors.push("docs/product/wireframes/manifest.json is not valid JSON");
    }
    if (parsed && Array.isArray(parsed.screens)) {
      const listedHtml = new Set();
      for (const screen of parsed.screens) {
        const id = typeof screen.id === "string" ? screen.id : "";
        if (!/^CAP-\d+$/.test(id)) {
          errors.push(
            `wireframe manifest screen must carry a CAP-<number> id: ${JSON.stringify(screen)}`,
          );
          continue;
        }
        if (!capabilityIds.has(id)) {
          errors.push(`wireframe manifest lists unknown capability ${id}`);
        }
        const htmlPattern = new RegExp(`^html/${id}-[a-z0-9-]+\\\.html$`);
        const pngPattern = new RegExp(`^exports/${id}-[a-z0-9-]+\\\.png$`);
        for (const [artifact, pattern, label] of [
          [screen.html, htmlPattern, "html"],
          [screen.png, pngPattern, "png"],
        ]) {
          if (typeof artifact !== "string" || !pattern.test(artifact)) {
            errors.push(
              `wireframe manifest ${label} path must be ${label === "html" ? "html" : "exports"}/${id}-<slug>${label === "html" ? ".html" : ".png"}: ${artifact}`,
            );
            continue;
          }
          const info = await stat(
            path.join(wireframesRoot, artifact),
          ).catch(() => null);
          if (!info?.isFile()) {
            errors.push(`wireframe manifest lists missing artifact: ${artifact}`);
          }
        }
        listedHtml.add(screen.html);
        const capFile = capabilityFiles.find(
          (file) => path.basename(file).startsWith(`${id}-`),
        );
        if (capFile) {
          const source = await readFile(capFile, "utf8");
          const capLinks = [...source.matchAll(/\]\(([^)]+)\)/g)]
            .map((match) => match[1].split("#", 1)[0].trim())
            .filter((target) => target && !/^(?:https?:|mailto:)/.test(target))
            .map((target) =>
              path.relative(
                wireframesRoot,
                path.resolve(path.dirname(capFile), target),
              ),
            );
          const missing = [screen.html, screen.png].filter(
            (artifact) => !capLinks.includes(artifact),
          );
          if (missing.length > 0) {
            errors.push(
              `${path.relative(root, capFile)} must link its wireframe HTML and PNG (${missing.join(", ")})`,
            );
          }
        }
      }
      const htmlDir = path.join(wireframesRoot, "html");
      const htmlFiles = (await readdir(htmlDir).catch(() => []))
        .filter((file) => /^CAP-\d+-[a-z0-9-]+\.html$/.test(file))
        .map((file) => `html/${file}`);
      for (const file of htmlFiles) {
        if (!listedHtml.has(file)) {
          errors.push(
            `wireframe html artifact is missing from the manifest: ${file}`,
          );
        }
      }
      const indexFile = path.join(wireframesRoot, "index.html");
      const indexInfo = await stat(indexFile).catch(() => null);
      if (indexInfo?.isFile()) {
        const indexSource = await readFile(indexFile, "utf8");
        for (const screen of parsed.screens) {
          if (
            typeof screen.html === "string" &&
            !indexSource.includes(screen.html)
          ) {
            errors.push(`wireframe index.html must link ${screen.html}`);
          }
        }
      } else {
        errors.push("docs/product/wireframes/index.html is required with a manifest");
      }
    } else if (parsed) {
      errors.push("wireframe manifest must contain a `screens` array");
    }
  }

  return {
    errors,
    capabilities: capabilityFiles.length,
    changes: changeFiles.length,
    manifest,
  };
}

/** @returns {Promise<number>} process exit code */
async function main() {
  const arg = process.argv[2];
  const root = arg ? path.resolve(arg) : scriptRoot;
  const { errors, capabilities, changes, manifest } = await validateRecords(root);

  if (errors.length > 0) {
    console.error(`Product record check failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }

  console.log(
    `Product record check passed: ${capabilities} capabilities, ${changes} change records${
      manifest ? ", wireframe manifest in sync" : ""
    }.`,
  );
  return 0;
}

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectRun) {
  process.exit(await main());
}
