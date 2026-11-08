#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { optimize } from "svgo";
import svgpath from "svgpath";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "src/icons/raw");
const SVG_DIR = path.join(ROOT, "src/icons/svg");
const DATA_DIR = path.join(ROOT, "src/rules/icons/data");
const META_FILE = path.join(ROOT, "src/rules/icons/meta/icons-meta.json");
const SIZE = 24;
const PRECISION = 2;
const LAYER_NAME = "icon";
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const exists = (p) => fs.access(p).then(() => true, () => false);
const toCamel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const styleOf = (name) => name.match(/-(solid|thin|wide)$/)?.[1] ?? "regular";

/* ------------------------------ Input ------------------------------ */

async function resolveInput(arg) {
  const candidates = [path.resolve(ROOT, arg)];
  // Tolerate a leading slash ("/src/icons/...") as a path relative to the repo root
  if (path.isAbsolute(arg)) candidates.push(path.join(ROOT, arg));
  for (const c of candidates) if (await exists(c)) return c;
  throw new Error(`File not found: ${arg}`);
}

function parseTarget(file) {
  const r = path.relative(RAW_DIR, file);
  const parts = r.split(path.sep);
  if (r.startsWith("..") || parts.length !== 2 || !parts[1].endsWith(".svg")) {
    throw new Error(`File must be in src/icons/raw/<category>/<name>.svg (got: ${rel(file)})`);
  }
  const category = parts[0];
  const name = path.basename(parts[1], ".svg");
  if (!KEBAB.test(category) || !KEBAB.test(name)) {
    throw new Error(`Category and name must be kebab-case (got: ${category}/${name})`);
  }
  return { category, name };
}

/* --------------------------- SVG conversion --------------------------- */

function parseViewBox(svg) {
  const vb = svg.match(/<svg\b[^>]*\sviewBox\s*=\s*["']([^"']+)["']/i);
  if (vb) {
    const [x, y, w, h] = vb[1].trim().split(/[\s,]+/).map(Number);
    if ([x, y, w, h].every(Number.isFinite) && w > 0 && h > 0) return { x, y, w, h };
  }
  const w = svg.match(/<svg\b[^>]*\swidth\s*=\s*["']([\d.]+)/i)?.[1];
  const h = svg.match(/<svg\b[^>]*\sheight\s*=\s*["']([\d.]+)/i)?.[1];
  if (w && h) return { x: 0, y: 0, w: +w, h: +h };
  throw new Error("viewBox (or width/height) not found in the source SVG");
}

// Pass 0: keep only the "icon" layer (drops <defs>, metadata, other layers...).
// <style> elements are kept so that class-based styles can still be inlined.
const keepIconLayer = {
  name: "keepIconLayer",
  fn: () => ({
    root: {
      enter(root) {
        const svg = root.children.find((n) => n.type === "element" && n.name === "svg");
        if (!svg) throw new Error("no <svg> root element");

        const isLayer = (n) =>
          n.type === "element" &&
          n.name === "g" &&
          (n.attributes.id === LAYER_NAME || n.attributes["inkscape:label"] === LAYER_NAME);

        const find = (node, ancestors) => {
          for (const child of node.children ?? []) {
            if (isLayer(child)) return { layer: child, ancestors };
            const found = find(child, [...ancestors, child]);
            if (found) return found;
          }
          return null;
        };

        const found = find(svg, []);
        if (!found) throw new Error(`layer "${LAYER_NAME}" not found`);
        if (found.ancestors.some((a) => a.attributes?.transform)) {
          throw new Error(`a parent of layer "${LAYER_NAME}" has a transform, which is not supported`);
        }

        const styles = [];
        const collectStyles = (node) => {
          for (const c of node.children ?? []) {
            if (c.type === "element" && c.name === "style") styles.push(c);
            else collectStyles(c);
          }
        };
        collectStyles(svg);

        svg.children = [...styles, found.layer];
      },
    },
  }),
};

// Pass 1: normalize (shapes -> paths, transforms applied, styles inlined...)
function normalize(svg) {
  const isolated = optimize(svg, { plugins: [keepIconLayer] }).data;
  return optimize(isolated, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            mergePaths: false,
            convertPathData: { floatPrecision: 5 },
          },
        },
      },
    ],
  }).data;
}

function attrsOf(str) {
  const out = {};
  for (const [, k, v] of str.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) out[k] = v;
  return out;
}

function extractPaths(svg) {
  const paths = [];
  for (const [, tag, raw] of svg.matchAll(/<([a-zA-Z][\w:-]*)\b([^>]*)>/g)) {
    const a = attrsOf(raw);
    if ((a.stroke && a.stroke !== "none") || /stroke\s*:\s*(?!none\b)\S/.test(a.style ?? "")) {
      throw new Error(`the "${LAYER_NAME}" layer contains strokes: convert them to outlines first (Stroke to Path)`);
    }
    if (a.transform) throw new Error("a transform attribute could not be applied to the paths");
    if (tag === "svg" || tag === "g" || tag === "style") continue;
    if (tag !== "path") throw new Error(`unsupported <${tag}> element (only <path> can be merged)`);
    if (a.fill === "none") continue;
    if (a.d?.trim()) paths.push(a.d);
  }
  if (!paths.length) throw new Error(`no usable <path> in the "${LAYER_NAME}" layer`);
  return paths;
}

function convertToSinglePath(rawSvg) {
  const vb = parseViewBox(rawSvg);
  const paths = extractPaths(normalize(rawSvg));

  // Fit and center into 24x24 while keeping the aspect ratio
  const s = Math.min(SIZE / vb.w, SIZE / vb.h);
  const tx = (SIZE - vb.w * s) / 2 - vb.x * s;
  const ty = (SIZE - vb.h * s) / 2 - vb.y * s;
  const merged = paths
    .map((d) => svgpath(d).abs().matrix([s, 0, 0, s, tx, ty]).round(4).toString())
    .join("");

  // Pass 2: size optimization of the final path
  const wrapped = buildSvg(merged);
  const { data } = optimize(wrapped, {
    plugins: [{ name: "convertPathData", params: { floatPrecision: PRECISION } }],
  });
  const d = data.match(/\sd="([^"]+)"/)?.[1];
  if (!d) throw new Error("path optimization failed");
  return d;
}

const buildSvg = (d) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}"><path d="${d}"/></svg>`;

/* ----------------------- data/<category>.js ----------------------- */

async function computeDataFile(category, name, d) {
  const file = path.join(DATA_DIR, `${category}.js`);
  let content = (await exists(file)) ? await fs.readFile(file, "utf8") : null;
  let created = false;
  if (content === null) {
    created = true;
    content = `export const ${toCamel(category)}Icons = {\n};\n`;
  }

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

  // Keep the existing order: replace in place, or insert alphabetically
  const entries = Object.entries(icons);
  const idx = entries.findIndex(([k]) => k === name);
  let status;
  if (idx >= 0) {
    entries[idx] = [name, d];
    status = "replaced";
  } else {
    const pos = entries.findIndex(([k]) => k > name);
    entries.splice(pos === -1 ? entries.length : pos, 0, [name, d]);
    status = "added";
  }

  const lines = entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n");
  const next = `${head}\n${lines}${trailingComma ? "," : ""}\n${tail}`;
  return { file, next, status, created };
}

/* ------------------------- icons-meta.json ------------------------- */

async function computeMeta(category, name) {
  const meta = JSON.parse(await fs.readFile(META_FILE, "utf8"));
  const idx = meta.icons.findIndex((i) => i.name === name);
  const prev = idx >= 0 ? meta.icons[idx] : null;
  const warnings = [];

  const entry = prev
    ? { ...prev, name, category } // keep style, tags, related...
    : { name, category, style: styleOf(name), tags: [], related: [] };

  if (prev && prev.category !== category) {
    warnings.push(`"${name}" was in category "${prev.category}": remember to remove the old entry from data/${prev.category}.js`);
  }

  if (idx >= 0) {
    meta.icons[idx] = entry;
  } else {
    const pos = meta.icons.findIndex((i) => i.name > name);
    meta.icons.splice(pos === -1 ? meta.icons.length : pos, 0, entry);
  }

  if (!meta.categories.includes(category)) {
    meta.categories = [...meta.categories, category].sort();
    warnings.push(`new category "${category}" added to icons-meta.json (remember to register it in the framework)`);
  }

  // Same formatting as the current file: one icon per line
  const parts = Object.entries(meta).map(([k, v]) =>
    k === "icons"
      ? `  "icons": [\n${v.map((i) => "    " + JSON.stringify(i)).join(",\n")}\n  ]`
      : `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
  return {
    next: `{\n${parts.join(",\n")}\n}\n`,
    status: prev ? "replaced (tags kept)" : "added (empty tags)",
    warnings,
  };
}

/* ------------------------------- Main ------------------------------- */

async function processFile(arg) {
  const file = await resolveInput(arg);
  const { category, name } = parseTarget(file);

  const d = convertToSinglePath(await fs.readFile(file, "utf8"));
  const svgOut = buildSvg(d);
  const data = await computeDataFile(category, name, d);
  const meta = await computeMeta(category, name);

  // All checks passed: write everything
  const svgFile = path.join(SVG_DIR, category, `${name}.svg`);
  await fs.mkdir(path.dirname(svgFile), { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(svgFile, svgOut);
  await fs.writeFile(data.file, data.next);
  await fs.writeFile(META_FILE, meta.next);

  console.log(`✔ ${category}/${name}`);
  console.log(`   svg   ${rel(svgFile)} (${Buffer.byteLength(svgOut)} B)`);
  console.log(`   data  ${rel(data.file)}: ${data.status}${data.created ? " (file created, export it from your index)" : ""}`);
  console.log(`   meta  ${rel(META_FILE)}: ${meta.status}`);
  for (const w of meta.warnings) console.warn(`   ⚠️  ${w}`);
}

async function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    throw new Error("Usage: npm run add:icon src/icons/raw/<category>/<name>.svg [...more files]");
  }

  let failed = 0;
  for (const f of files) {
    try {
      await processFile(f);
    } catch (err) {
      failed++;
      console.error(`✘ ${f}\n   ${err.message}`);
    }
  }
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});