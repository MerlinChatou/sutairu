#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "src/icons/raw");
const SVG_DIR = path.join(ROOT, "src/icons/svg");
const DATA_DIR = path.join(ROOT, "src/rules/icons/data");
const META_FILE = path.join(ROOT, "src/rules/icons/meta/icons-meta.json");
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const exists = (p) =>
  fs.access(p).then(
    () => true,
    () => false,
  );
const toCamel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function parseTarget(arg) {
  if (!arg || arg.startsWith("-")) {
    throw new Error("Usage: remove-icon.mjs src/icons/raw/<category>/<name>.svg");
  }

  const resolved = path.resolve(ROOT, arg);
  const r = path.relative(RAW_DIR, resolved);
  const parts = r.split(path.sep);

  if (r.startsWith("..") || parts.length !== 2 || !parts[1].endsWith(".svg")) {
    throw new Error(`Path must be src/icons/raw/<category>/<name>.svg (got: ${arg})`);
  }

  const category = parts[0];
  const name = path.basename(parts[1], ".svg");

  if (!KEBAB.test(category) || !KEBAB.test(name)) {
    throw new Error(`Category and name must be kebab-case (got: ${category}/${name})`);
  }

  return { rawFile: resolved, category, name };
}

async function removeSvgFile(category, name) {
  const svgFile = path.join(SVG_DIR, category, `${name}.svg`);
  if (!(await exists(svgFile))) return { file: svgFile, removed: false };
  await fs.unlink(svgFile);
  return { file: svgFile, removed: true };
}

async function removeFromDataFile(category, name) {
  const file = path.join(DATA_DIR, `${category}.js`);
  if (!(await exists(file))) return { file, removed: false };

  const content = await fs.readFile(file, "utf8");
  const m = content.match(/export\s+const\s+\w+\s*=\s*\{/);
  if (!m) throw new Error(`${rel(file)}: "export const xxx = {" not found`);

  const start = m.index + m[0].length;
  const end = content.lastIndexOf("}");
  const head = content.slice(0, start);
  const body = content.slice(start, end);
  const tail = content.slice(end);
  const trailingComma = body.trim() === "" ? true : /,\s*$/.test(body);

  let icons;
  try {
    icons = JSON.parse(`{${body.trim().replace(/,$/, "")}}`);
  } catch {
    throw new Error(`${rel(file)}: cannot be parsed (double-quoted keys and values expected)`);
  }

  const before = Object.keys(icons).length;
  delete icons[name];
  delete icons[`${name}_box`];
  const entries = Object.entries(icons);
  const removed = entries.length < before;

  if (!removed) return { file, removed: false };

  if (entries.length === 0) {
    const empty = `${head}\n${tail}`;
    return { file, next: empty, removed: true };
  }

  const lines = entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n");
  const next = `${head}\n${lines}${trailingComma ? "," : ""}\n${tail}`;
  return { file, next, removed: true };
}

async function removeFromMeta(name) {
  if (!(await exists(META_FILE))) return { file: META_FILE, removed: false };

  const meta = JSON.parse(await fs.readFile(META_FILE, "utf8"));
  const before = meta.icons.length;
  meta.icons = meta.icons.filter((i) => i.name !== name);
  const removed = meta.icons.length < before;

  if (!removed) return { file: META_FILE, removed: false };

  const parts = Object.entries(meta).map(([k, v]) =>
    k === "icons"
      ? `  "icons": [\n${v.map((i) => "    " + JSON.stringify(i)).join(",\n")}\n  ]`
      : `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`,
  );
  return {
    file: META_FILE,
    next: `{\n${parts.join(",\n")}\n}\n`,
    removed: true,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    throw new Error("Expected exactly one argument: src/icons/raw/<category>/<name>.svg");
  }

  const { category, name } = parseTarget(args[0]);

  const svgRes = await removeSvgFile(category, name);
  const dataRes = await removeFromDataFile(category, name);
  const metaRes = await removeFromMeta(name);

  if (dataRes.removed) {
    await fs.writeFile(dataRes.file, dataRes.next);
  }
  if (metaRes.removed) {
    await fs.writeFile(metaRes.file, metaRes.next);
  }

  console.log(`✔ Removed ${category}/${name}`);
  console.log(`   svg   ${rel(svgRes.file)}: ${svgRes.removed ? "removed" : "not found"}`);
  console.log(`   data  ${rel(dataRes.file)}: ${dataRes.removed ? "removed" : "not found"}`);
  console.log(`   meta  ${rel(metaRes.file)}: ${metaRes.removed ? "removed" : "not found"}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});