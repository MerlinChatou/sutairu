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
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const exists = (p) => fs.access(p).then(() => true, () => false);
const toCamel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const styleOf = (name) => name.match(/-(solid|thin|wide)$/)?.[1] ?? "regular";

/* ------------------------------ Entrées ------------------------------ */

async function resolveInput(arg) {
  const candidates = [path.resolve(ROOT, arg)];
  // Tolère "/src/icons/..." (slash initial) comme chemin relatif à la racine
  if (path.isAbsolute(arg)) candidates.push(path.join(ROOT, arg));
  for (const c of candidates) if (await exists(c)) return c;
  throw new Error(`Fichier introuvable : ${arg}`);
}

function parseTarget(file) {
  const r = path.relative(RAW_DIR, file);
  const parts = r.split(path.sep);
  if (r.startsWith("..") || parts.length !== 2 || !parts[1].endsWith(".svg")) {
    throw new Error(`Le fichier doit être dans src/icons/raw/<category>/<name>.svg (reçu : ${rel(file)})`);
  }
  const category = parts[0];
  const name = path.basename(parts[1], ".svg");
  if (!KEBAB.test(category) || !KEBAB.test(name)) {
    throw new Error(`Catégorie et nom doivent être en kebab-case (reçu : ${category}/${name})`);
  }
  return { category, name };
}

/* --------------------------- Conversion SVG --------------------------- */

function parseViewBox(svg) {
  const vb = svg.match(/<svg\b[^>]*\sviewBox\s*=\s*["']([^"']+)["']/i);
  if (vb) {
    const [x, y, w, h] = vb[1].trim().split(/[\s,]+/).map(Number);
    if ([x, y, w, h].every(Number.isFinite) && w > 0 && h > 0) return { x, y, w, h };
  }
  const w = svg.match(/<svg\b[^>]*\swidth\s*=\s*["']([\d.]+)/i)?.[1];
  const h = svg.match(/<svg\b[^>]*\sheight\s*=\s*["']([\d.]+)/i)?.[1];
  if (w && h) return { x: 0, y: 0, w: +w, h: +h };
  throw new Error("viewBox (ou width/height) introuvable dans le SVG source");
}

// Passe 1 : normalise (formes → path, transforms appliqués, styles inlinés…)
function normalize(svg) {
  return optimize(svg, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
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
      throw new Error("l'icône contient des traits (stroke) : convertissez-les en contours avant (Stroke to Path)");
    }
    if (a.transform) throw new Error("un attribut transform n'a pas pu être appliqué aux paths");
    if (tag === "svg" || tag === "g") continue;
    if (tag !== "path") throw new Error(`élément <${tag}> non supporté (seuls des <path> peuvent être fusionnés)`);
    if (a.fill === "none") continue;
    if (a.d?.trim()) paths.push(a.d);
  }
  if (!paths.length) throw new Error("aucun <path> exploitable dans le SVG");
  return paths;
}

function convertToSinglePath(rawSvg, precision) {
  const vb = parseViewBox(rawSvg);
  const paths = extractPaths(normalize(rawSvg));

  // Fit + centrage dans 24x24 en conservant le ratio
  const s = Math.min(SIZE / vb.w, SIZE / vb.h);
  const tx = (SIZE - vb.w * s) / 2 - vb.x * s;
  const ty = (SIZE - vb.h * s) / 2 - vb.y * s;
  const merged = paths
    .map((d) => svgpath(d).abs().matrix([s, 0, 0, s, tx, ty]).round(4).toString())
    .join("");

  // Passe 2 : optimisation de taille du path final
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}"><path d="${merged}"/></svg>`;
  const { data } = optimize(wrapped, {
    plugins: [{ name: "convertPathData", params: { floatPrecision: precision } }],
  });
  const d = data.match(/\sd="([^"]+)"/)?.[1];
  if (!d) throw new Error("échec de l'optimisation du path");
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
  if (!m) throw new Error(`${rel(file)} : "export const xxx = {" introuvable`);
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
    throw new Error(`${rel(file)} : impossible à parser (clés et valeurs entre guillemets doubles attendues)`);
  }

  // On garde l'ordre existant : remplacement en place ou insertion alphabétique
  const entries = Object.entries(icons);
  const idx = entries.findIndex(([k]) => k === name);
  let status;
  if (idx >= 0) {
    entries[idx] = [name, d];
    status = "remplacée";
  } else {
    const pos = entries.findIndex(([k]) => k > name);
    entries.splice(pos === -1 ? entries.length : pos, 0, [name, d]);
    status = "ajoutée";
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
    ? { ...prev, name, category } // conserve style, tags, related…
    : { name, category, style: styleOf(name), tags: [], related: [] };

  if (prev && prev.category !== category) {
    warnings.push(`"${name}" était dans la catégorie "${prev.category}" : pensez à supprimer l'ancienne entrée de data/${prev.category}.js`);
  }

  if (idx >= 0) {
    meta.icons[idx] = entry;
  } else {
    const pos = meta.icons.findIndex((i) => i.name > name);
    meta.icons.splice(pos === -1 ? meta.icons.length : pos, 0, entry);
  }

  if (!meta.categories.includes(category)) {
    meta.categories = [...meta.categories, category].sort();
    warnings.push(`nouvelle catégorie "${category}" ajoutée à icons-meta.json (pensez à l'enregistrer dans le framework)`);
  }

  // Même mise en forme que le fichier actuel : 1 icône par ligne
  const parts = Object.entries(meta).map(([k, v]) =>
    k === "icons"
      ? `  "icons": [\n${v.map((i) => "    " + JSON.stringify(i)).join(",\n")}\n  ]`
      : `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
  return { next: `{\n${parts.join(",\n")}\n}\n`, status: prev ? "remplacée (tags conservés)" : "ajoutée (tags vides)", warnings };
}

/* ------------------------------- Main ------------------------------- */

async function processFile(arg, precision) {
  const file = await resolveInput(arg);
  const { category, name } = parseTarget(file);

  const d = convertToSinglePath(await fs.readFile(file, "utf8"), precision);
  const svgOut = buildSvg(d);
  const data = await computeDataFile(category, name, d);
  const meta = await computeMeta(category, name);

  // Toutes les vérifications sont passées : on écrit
  const svgFile = path.join(SVG_DIR, category, `${name}.svg`);
  await fs.mkdir(path.dirname(svgFile), { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(svgFile, svgOut);
  await fs.writeFile(data.file, data.next);
  await fs.writeFile(META_FILE, meta.next);

  console.log(`✔ ${category}/${name}`);
  console.log(`   svg   ${rel(svgFile)} (${Buffer.byteLength(svgOut)} o)`);
  console.log(`   data  ${rel(data.file)} : ${data.status}${data.created ? " (fichier créé, à exporter dans votre index)" : ""}`);
  console.log(`   meta  ${rel(META_FILE)} : ${meta.status}`);
  for (const w of meta.warnings) console.warn(`   ⚠️  ${w}`);
}

async function main() {
  let precision = 2;
  const files = [];
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--precision=(\d+)$/);
    if (m) precision = Number(m[1]);
    else if (a.startsWith("--")) throw new Error(`Option inconnue : ${a}`);
    else files.push(a);
  }
  if (!files.length) {
    throw new Error("Usage : npm run add:icon src/icons/raw/<category>/<name>.svg [...autres fichiers]");
  }

  let failed = 0;
  for (const f of files) {
    try {
      await processFile(f, precision);
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