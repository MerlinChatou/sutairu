#!/usr/bin/env node
import { watch } from "chokidar";
import path from "node:path";
import { getResolvedConfig } from "../src/config.js";
import { logger } from "../src/utils/logger.js";
import { scanFile, fileClassMap, generateCSS } from "../src/processor.js";
import { processSafelist } from "../src/safelist.js";
import { report } from "../src/utils/report.js";

let watcher = null;

// Load Config
const config = await getResolvedConfig();
const safeList = processSafelist(config);

// Initialize Logger
logger.init(config.verbose, config.label);
logger.verbose(`Sutairu is running in: ${process.cwd()}`);
logger.info(`Sutairu v1.0.0 CSS active!\n`);

// Helper to check if a file should be processed
const isTargetFile = (filePath) => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return config.extensions.includes(ext);
};


/**
 * The core function that handles the rebuild logic
 */
let compilationTimer = null;
const DEBOUNCE_DELAY = 100; // milliseconds
async function triggerCompilation(updateStart, reason) {
  // Clear any existing scheduled compilation
  if (compilationTimer) clearTimeout(compilationTimer);

  compilationTimer = setTimeout(async () => {
    logger.verbose(`New compilation on ${reason} - Rebuilding...`);
    
    // Run CSS generation
    const stats = await generateCSS(config, safeList);
    
    // Report performance
    const updateEnd = performance.now();
    stats.duration = (updateEnd - updateStart).toFixed(1);
    report(stats);
    
    compilationTimer = null;
  }, DEBOUNCE_DELAY);
}


async function startWatcher() {
  const startTime = performance.now();

  // If a watcher already exists, shut it down properly
  if (watcher) {
    await watcher.close();
    fileClassMap.clear();
  }

  // Configure Watcher (Watching directories directly for better reliability)
  watcher = watch(config.watchDirs, {
    cwd: process.cwd(),
    ignored: [
      /(^|[\/\\])\../, // ignore dotfiles
      "**/node_modules/**",
      "**/.svelte-kit/**",
    ],
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  // 4. Event Handlers
  watcher
    .on("add", (filePath) => {
      const updateStart = performance.now();      
      if (isTargetFile(filePath)) {
        // If verbose is required display parsed file
        logger.verbose(`[NEW] Monitoring: ${filePath}`);
        scanFile(filePath);
        triggerCompilation(updateStart, "file added");
      }
    })
    .on("change", async (filePath) => {
      const updateStart = performance.now();
      if (isTargetFile(filePath)) {
        logger.verbose(`[UPDATE] Monitoring: ${filePath}`);
        scanFile(filePath);
        triggerCompilation(updateStart, "file change");
      }
    })
    .on("unlink", async (filePath) => {
      const updateStart = performance.now();
      if (isTargetFile(filePath)) {
        logger.verbose(`[DELETED] Monitoring: ${filePath}`);
        fileClassMap.delete(filePath);
        triggerCompilation(updateStart, "file deleted");
      }
    })
    .on("error", (error) => logger.error(`Watcher error: ${error}`));
}

startWatcher();
