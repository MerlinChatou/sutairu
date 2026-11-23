import { test } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "src/icons/raw");
const SVG_DIR = path.join(ROOT, "src/icons/svg");
const DATA_DIR = path.join(ROOT, "src/rules/icons/data");
const META_FILE = path.join(ROOT, "src/rules/icons/meta/icons-meta.json");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectRawIcons() {
  if (!(await exists(RAW_DIR))) return [];

  const categories = await fs.readdir(RAW_DIR, { withFileTypes: true });
  const icons = [];

  for (const catEntry of categories) {
    if (!catEntry.isDirectory()) continue;
    const category = catEntry.name;
    const catDir = path.join(RAW_DIR, category);
    const files = await fs.readdir(catDir, { withFileTypes: true });

    for (const fileEntry of files) {
      if (!fileEntry.isFile() || !fileEntry.name.endsWith(".svg")) continue;
      const name = path.basename(fileEntry.name, ".svg");
      icons.push({ category, name });
    }
  }

  return icons.sort((a, b) =>
    `${a.category}/${a.name}`.localeCompare(`${b.category}/${b.name}`),
  );
}

async function loadCategoryIcons(category) {
  const file = path.join(DATA_DIR, `${category}.js`);
  assert.ok(await exists(file), `Missing data file: src/rules/icons/data/${category}.js`);

  const content = await fs.readFile(file, "utf8");
  const match = content.match(/export\s+const\s+\w+\s*=\s*\{/);
  assert.ok(match, `Invalid export object in src/rules/icons/data/${category}.js`);

  const start = match.index + match[0].length;
  const end = content.lastIndexOf("}");
  assert.ok(end > start, `Missing closing brace in src/rules/icons/data/${category}.js`);

  const body = content.slice(start, end).trim().replace(/,$/, "");
  if (!body) return {};

  return JSON.parse(`{${body}}`);
}

test("all raw icons are generated in svg, data, and icons-meta.json", async () => {
  const rawIcons = await collectRawIcons();
  assert.ok(rawIcons.length > 0, "Expected at least one raw icon in src/icons/raw");

  assert.ok(await exists(META_FILE), "Missing src/rules/icons/meta/icons-meta.json");
  const meta = JSON.parse(await fs.readFile(META_FILE, "utf8"));
  const metaByName = new Map((meta.icons ?? []).map((entry) => [entry.name, entry]));

  const dataCache = new Map();

  for (const { category, name } of rawIcons) {
    const id = `${category}/${name}`;

    // 1. Generated SVG file exists in the right category
    const generatedSvg = path.join(SVG_DIR, category, `${name}.svg`);
    assert.ok(
      await exists(generatedSvg),
      `[${id}] Missing generated SVG at src/icons/svg/${category}/${name}.svg`,
    );

    // 2. Entry and bounding box exist in src/rules/icons/data/<category>.js
    if (!dataCache.has(category)) {
      dataCache.set(category, await loadCategoryIcons(category));
    }
    const categoryData = dataCache.get(category);

    assert.equal(
      typeof categoryData[name],
      "string",
      `[${id}] Missing path string "${name}" in src/rules/icons/data/${category}.js`,
    );
    assert.ok(
      categoryData[name].trim().length > 0,
      `[${id}] Empty path string "${name}" in src/rules/icons/data/${category}.js`,
    );

    const boxKey = `${name}_box`;
    assert.equal(
      typeof categoryData[boxKey],
      "string",
      `[${id}] Missing bounding box "${boxKey}" in src/rules/icons/data/${category}.js`,
    );
    assert.match(
      categoryData[boxKey].trim(),
      /^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?){3}$/,
      `[${id}] Invalid bounding box "${boxKey}" value "${categoryData[boxKey]}" in src/rules/icons/data/${category}.js`,
    );

    // 3. Entry in icons-meta.json has right category, >= 1 tag, and >= 1 related
    const metaEntry = metaByName.get(name);
    assert.ok(
      metaEntry,
      `[${id}] Missing "${name}" in src/rules/icons/meta/icons-meta.json`,
    );
    assert.equal(
      metaEntry.category,
      category,
      `[${id}] Expected category "${category}" in icons-meta.json, got "${metaEntry.category}"`,
    );
    assert.ok(
      Array.isArray(metaEntry.tags) && metaEntry.tags.length >= 1,
      `[${id}] Expected at least one tag in icons-meta.json`,
    );
    assert.ok(
      Array.isArray(metaEntry.related) && metaEntry.related.length >= 1,
      `[${id}] Expected at least one related icon in icons-meta.json`,
    );
  }
});