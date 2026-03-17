import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the absolute path of the current file (css-loader.js)
const __filename = fileURLToPath(import.meta.url);
// 2. Get the directory (utils)
const __dirname = path.dirname(__filename);
// 3. Move up to the "src" root
const SRC_ROOT = path.resolve(__dirname, '..');

let cachedStyles = null;

export async function getStaticStyles(relativePaths) {
  if (cachedStyles !== null) return cachedStyles;

  try {
    const contents = await Promise.all(
      relativePaths.map(relPath => {
        // relPath is something like "./base/reset.css" or "themes/default.css"
        // We join it with the library's SRC_ROOT, not the user's CWD
        const absolutePath = path.resolve(SRC_ROOT, relPath.replace('./', ''));
        return fs.readFile(absolutePath, 'utf-8');
      })
    );

    cachedStyles = contents.join('\n');
    return cachedStyles;
  } catch (error) {
    console.error(`[SUTAIRU] Error loading static CSS: ${error.message}`);
    return '';
  }
}