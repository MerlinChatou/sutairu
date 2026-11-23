#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { processFile } from "./add-icon.mjs";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "src/icons/raw");

async function collectSvgFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSvgFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

async function main() {
  const startTime = Date.now();

  try {
    await fs.access(RAW_DIR);
  } catch {
    console.error(`Raw icons directory not found: ${path.relative(ROOT, RAW_DIR)}`);
    process.exit(1);
  }

  const filter = process.argv[2];
  let svgFiles = await collectSvgFiles(RAW_DIR);
  if (filter) {
    svgFiles = svgFiles.filter((f) =>
      path.relative(ROOT, f).split(path.sep).join("/").includes(filter),
    );
  }

  if (svgFiles.length === 0) {
    console.log("No matching .svg files found.");
    return;
  }

  console.log(`Processing ${svgFiles.length} icon(s)...\n`);

  const failures = [];
  for (const file of svgFiles) {
    const relArg = path.relative(ROOT, file).split(path.sep).join("/");
    try {
      await processFile(relArg);
    } catch (err) {
      failures.push({ file: relArg, message: err.message });
      console.error(`✘ ${relArg}\n   ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\nDone in ${elapsed}s: ${svgFiles.length - failures.length}/${svgFiles.length} succeeded.`);

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});