// ./src/utils/writeThemesJson.js
import { logger } from "./logger.js";
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Generates and writes the themes.json file if configured.
 * @param {Object} config - The resolved configuration object
 */
export async function writeThemesJson(config) {
  if (!config.themesJson) return;

  const payload = {
    generatedAt: new Date().toISOString(),
    themes: config.themes,
  };

  try {
    await fs.mkdir(path.dirname(config.themesJson), { recursive: true });
    await fs.writeFile(config.themesJson, JSON.stringify(payload, null, 2), 'utf-8');
    logger.info(`Themes JSON written to ${config.themesJson}`);
  } catch (error) {
    logger.error(`Failed to write themes JSON:`, error);
  }
}