#!/usr/bin/env node
import { watch } from "chokidar";
import path from "node:path";
import { getResolvedConfig } from "../src/config.js";
import { logger } from "../src/utils/logger.js";
import { scanFile, generateCSS } from "../src/processor.js";
import { processSafelist } from "../src/safelist.js";
import { report } from "../src/utils/report.js";

async function start() {
  const startTime = performance.now();

  // 1. Load Config
  const config = await getResolvedConfig();  
  const safeList = processSafelist(config);

  // 2. Initialize Logger
  logger.init(config.verbose, config.label);
  logger.verbose(`Sutairu is running in: ${process.cwd()}`);
  logger.info(`Sutairu v1.0.0 CSS active!`);


  // Helper to check if a file should be processed
  const isTargetFile = (filePath) => {
    const ext = path.extname(filePath).slice(1).toLowerCase();
    return config.extensions.includes(ext);
  };

  // 3. Configure Watcher (Watching directories directly for better reliability)
  const watcher = watch(config.watchDirs, {
    cwd: process.cwd(),
    ignored: [
      /(^|[\/\\])\../, // ignore dotfiles
      "**/node_modules/**",
      "**/.svelte-kit/**"
    ],
    persistent: true,
    ignoreInitial: false,
  });

  // 4. Event Handlers
  watcher
    .on("add", (filePath) => {
      if (isTargetFile(filePath)) {
        // No 'await' needed here usually, just queue the scan
        scanFile(filePath);
      }
    })
    .on("change", async (filePath) => {
      if (isTargetFile(filePath)) {
        const updateStart = performance.now();
        
        scanFile(filePath);
        const stats = await generateCSS(config, safeList);
        
        const updateEnd = performance.now();
        stats.duration = (updateEnd - updateStart).toFixed(1);
        report(stats);
      }
    })
    .on("unlink", (filePath) => {
      if (isTargetFile(filePath)) {
        logger.info(`[REMOVED] ${filePath}`);
        logger.error("Unlinking files is not yet supported");
      }
    })
    .on("ready", async () => {
      // Generate initial CSS after all 'add' events have been queued
      const stats = await generateCSS(config, safeList);
      const endTime = performance.now();
      stats.duration = (endTime - startTime).toFixed(0);
      report(stats);
    })
    .on("error", (error) => logger.error(`Watcher error: ${error}`));
}

start();