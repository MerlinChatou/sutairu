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

function parseTarget(input) {
  if (!input || input.startsWith("-")) {
    throw new Error("Expected <from> <to> arguments");
  }

  let category;
  let name;

  if (input.includes("/") || input.includes("\\") || input.endsWith(".svg")) {
    const resolved = path.resolve(ROOT, input);
    const r = path.relative(RAW_DIR, resolved);
    const parts = r.split(path.sep);
    if (r.startsWith("..") || parts.length !== 2 || !parts[1].endsWith(".svg")) {
      throw new Error(`Expected src/icons/raw/<category>/<name>.svg (got: ${input})`);
    }
    category = parts[0];
    name = path.basename(parts[1], ".svg");
  } else {
    throw new Error(`Invalid target "${input}". Use src/icons/raw/<category>/<name>.svg`);
  }

  if (!KEBAB.test(category) || !KEBAB.test(name)) {
    throw new Error(`Category and name must be kebab-case (got: ${category}/${name})`);
  }

  return { category, name };
}

async function loadDataFile(category) {
  const file = path.join(DATA_DIR, `${category}.js`);
  const rawContent = (await exists(file)) ? await fs.readFile(file, "utf8") : null;
  let created = false;
  const content = rawContent ?? `export const ${toCamel(category)}Icons = {\n};\n`;
  if (rawContent === null) created = true;

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

  return {
    file,
    existed: rawContent !== null,
    created,
    head,
    tail,
    trailingComma,
    entries: Object.entries(icons),
  };
}

function upsertEntry(entries, key, value) {
  const idx = entries.findIndex(([k]) => k === key);
  if (idx >= 0) {
    entries[idx] = [key, value];
  } else {
    const pos = entries.findIndex(([k]) => k > key);
    entries.splice(pos === -1 ? entries.length : pos, 0, [key, value]);
  }
}

function removeEntry(entries, key) {
  const idx = entries.findIndex(([k]) => k === key);
  if (idx < 0) return null;
  const [, value] = entries[idx];
  entries.splice(idx, 1);
  return value;
}

function serializeDataFile(state) {
  if (state.entries.length === 0) {
    return `${state.head}\n${state.tail}`;
  }
  const lines = state.entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n");
  return `${state.head}\n${lines}${state.trailingComma ? "," : ""}\n${state.tail}`;
}

async function moveFileIfExists(src, dest) {
  if (!(await exists(src))) return false;
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.rename(src, dest);
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    throw new Error("Usage: move-icon.mjs src/icons/raw/<fromCat>/<fromName>.svg src/icons/raw/<toCat>/<toName>.svg");
  }

  const from = parseTarget(args[0]);
  const to = parseTarget(args[1]);

  if (from.category === to.category && from.name === to.name) {
    throw new Error(`Source and destination are identical (${from.category}/${from.name})`);
  }

  // 1. Move raw and generated SVG files
  const srcRaw = path.join(RAW_DIR, from.category, `${from.name}.svg`);
  const destRaw = path.join(RAW_DIR, to.category, `${to.name}.svg`);
  const rawMoved = await moveFileIfExists(srcRaw, destRaw);

  const srcSvg = path.join(SVG_DIR, from.category, `${from.name}.svg`);
  const destSvg = path.join(SVG_DIR, to.category, `${to.name}.svg`);
  const svgMoved = await moveFileIfExists(srcSvg, destSvg);

  // 2. Move <name> and <name>_box in category data files
  await fs.mkdir(DATA_DIR, { recursive: true });
  const fromData = await loadDataFile(from.category);
  const toData = from.category === to.category ? fromData : await loadDataFile(to.category);

  const pathVal = removeEntry(fromData.entries, from.name);
  const boxVal = removeEntry(fromData.entries, `${from.name}_box`);

  if (pathVal !== null) upsertEntry(toData.entries, to.name, pathVal);
  if (boxVal !== null) upsertEntry(toData.entries, `${to.name}_box`, boxVal);

  if (fromData.existed && (pathVal !== null || boxVal !== null)) {
    await fs.writeFile(fromData.file, serializeDataFile(fromData));
  }
  if (to.category !== from.category && (pathVal !== null || boxVal !== null)) {
    await fs.writeFile(toData.file, serializeDataFile(toData));
  }

  // 3. Update icons-meta.json
  const meta = JSON.parse(await fs.readFile(META_FILE, "utf8"));
  const oldIdx = meta.icons.findIndex((i) => i.name === from.name);
  const targetIdx = meta.icons.findIndex((i) => i.name === to.name);

  let metaUpdated = false;
  if (oldIdx >= 0) {
    const existing = meta.icons[oldIdx];
    meta.icons.splice(oldIdx, 1);

    const updated = {
      ...existing,
      name: to.name,
      category: to.category,
    };

    const insertAt = meta.icons.findIndex((i) => i.name > to.name);
    meta.icons.splice(insertAt === -1 ? meta.icons.length : insertAt, 0, updated);
    metaUpdated = true;
  } else if (targetIdx >= 0) {
    meta.icons[targetIdx] = {
      ...meta.icons[targetIdx],
      name: to.name,
      category: to.category,
    };
    metaUpdated = true;
  }

  if (!meta.categories.includes(to.category)) {
    meta.categories = [...meta.categories, to.category].sort();
    metaUpdated = true;
  }

  if (metaUpdated) {
    const parts = Object.entries(meta).map(([k, v]) =>
      k === "icons"
        ? `  "icons": [\n${v.map((i) => "    " + JSON.stringify(i)).join(",\n")}\n  ]`
        : `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`,
    );
    await fs.writeFile(META_FILE, `{\n${parts.join(",\n")}\n}\n`);
  }

  console.log(`✔ Moved ${from.category}/${from.name} → ${to.category}/${to.name}`);
  console.log(`   raw   ${rawMoved ? `${rel(srcRaw)} → ${rel(destRaw)}` : "not found"}`);
  console.log(`   svg   ${svgMoved ? `${rel(srcSvg)} → ${rel(destSvg)}` : "not found"}`);
  console.log(`   data  ${pathVal !== null || boxVal !== null ? "moved entries" : "no entries found"}`);
  console.log(`   meta  ${metaUpdated ? "updated" : "not found"}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});