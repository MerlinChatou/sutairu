import { Command } from 'commander';
import { loadUserConfig } from './loader.js';


// Create a placeholder object
export const config = {};

// Set required configuration 
// 1. CLI
// 2. config file
// 3. default values
export async function getResolvedConfig() {

  // Load user config if exists
  const userConfig = await loadUserConfig() || {};

  // Parse option CLI prioritary, then config file, then defaults
  const program = new Command();
  program
    .option('-w, --watch <dirs>', 'folders to monitor', userConfig.watch || './src')
    .option('-o, --output <file>', 'output CSS path', userConfig.output || './dist/sutairu.css')
    .option('-e, --ext <exts>', 'extensions', userConfig.ext || 'html,js,jsx,ts,tsx,vue,svelte,astro,php,md,mdx')
    .option('-t, --themes <names>', 'themes to include (comma separated)', userConfig.themes || 'default')    
    .option('-s, --safelist <classes>', 'manually include classes (comma separated)', '') 
    .option('-v, --verbose', 'show detailed logs', userConfig.verbose || false)  
    .option('--no-verbose', 'disable detailed logs')
    .option('-l, --label <name>', 'logger prefix', userConfig.label ?? 'SUTAIRU');

  // Processes the command-line arguments passed to the script
  program.parse(process.argv);
  const options = program.opts();

  // Populate the exported object instead of creating a new one
  config.output = options.output;
  config.watchDirs = options.watch.split(',').map(d => d.trim());
  config.extensions = options.ext.split(',').map(e => e.trim());
  config.themes = options.themes.split(',').map(t => t.trim());
  config.verbose = options.verbose;
  config.label = options.label;
    
  // --- Safelist Resolution ---
  // Combine CLI safelist with config file safelist
  const cliSafelist = options.safelist ? options.safelist.split(',').map(c => c.trim()) : [];
  const fileSafelist = Array.isArray(userConfig.safelist) ? userConfig.safelist : [];
  
  // Use a Set to ensure unique classes
  config.safelist = [...new Set([...cliSafelist, ...fileSafelist])];
  
  // Return config
  return config;
}