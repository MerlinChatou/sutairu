import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs';


// Load config file if exists
export async function loadUserConfig() {
  // Get sutairu.config.js in current folder
  const configPath = path.resolve(process.cwd(), 'sutairu.config.js');

  // If file exists, get config
  if (fs.existsSync(configPath)) {
    // We convert the path to a File URL for ESM compatibility on Windows
    const configUrl = pathToFileURL(configPath).href;
    const module = await import(configUrl);
    return module.default;
  }

  return null; // No config file found
}