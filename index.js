#!/usr/bin/env node

import { Command } from 'commander';
import chokidar from 'chokidar';
import path from 'path';

const program = new Command();

program
  .name('css-on-demand')
  .description('A surgical CSS generation tool')
  .version('1.0.0');

// Define command line options
program
  .option('-w, --watch <directories>', 'folders to monitor (comma separated)', './src')
  .option('-o, --output <file>', 'path to the generated CSS file', './dist/on-demand.css')
  .option('-e, --ext <extensions>', 'file extensions to watch (comma separated)', 'html,js');

program.parse(process.argv);

const options = program.opts();


// --- Core Logic ---


const watchDirs = options.watch.split(',').map(dir => dir.trim());
const extensions = options.ext.split(',').map(e => e.trim());
console.log (extensions)
//const finalWatchTargets = watchDirs.map(dir => `${dir}/**/${extPattern}`);
const finalWatchTargets = watchDirs.map(dir => path.resolve(dir, `**/*.{${extensions.join(',')}}`));


console.log(`CSS on Demand is active!`);
console.log(`Watching directories: ${watchDirs.join(', ')}`);
console.log(`Output: ${options.output}`);



// 4. Pass the array directly to Chokidar
const watcher = chokidar.watch(finalWatchTargets, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: false, // Run the generator once at the start
});

watcher
  .on('add', handleAdd)
  .on('change', handleChange)
  .on('ready', handleReady)



/**
 * Handles new files found during the initial scan or newly created files.
 */
function handleAdd(filePath) {
  console.log(`[NEW] Monitoring: ${filePath}`);
  // When a file is added, we scan it immediately
  //scanFile(filePath);
}

/**
 * Handles updates to existing files.
 */
function handleChange(filePath) {
  console.log(`[UPDATE] ${filePath} changed. Re-scanning...`);
  // Re-scan the specific file that changed
  //scanFile(filePath);
}

/**
 * Called once the initial "Inventory" of the folders is complete.
 */
function handleReady() {
  console.log(`---`);
  console.log(`✅ System Ready. Watching: ${watchDirs.join(', ')}`);
  console.log(`---`);
  //generateCSS();
}


// Add this to the bottom of your file
process.on('SIGINT', () => {
  watcher.close().then(() => {
    console.log('👋 CSS on Demand stopped.');
    process.exit(0);
  });
});