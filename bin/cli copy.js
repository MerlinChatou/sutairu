#!/usr/bin/env node
import { watch } from "chokidar";
import path from "path";
import { getResolvedConfig } from "../src/config.js";
import { logger } from "../src/utils/logger.js";
import { scanFile, generateCSS, getFileCount } from "../src/processor.js";
import { processSafelist } from "../src/safelist.js";
import { report } from "../src/utils/report.js";

async function start() {
  // Measure computation time
  const startTime = performance.now(); // ⏱️ Start the clock

  // Get config from CLI or config file
  const config = await getResolvedConfig();

  // Initialize the logger globally
  logger.init(config.verbose, config.label);
  logger.verbose(`Sutairu is running in: ${process.cwd()}`);

  // Prepare targets files

  const targets = config.watchDirs.map((dir) => {
    const relativeDir = path.relative(process.cwd(), dir);
    return `${relativeDir}/**/*.{${config.extensions.join(",")}}`;
    //path.resolve(dir, `**/*.{${config.extensions.join(",")}}`);
  });

  
  logger.info(`Sutairu v1.0.0 CSS active!`);
  
  // Configure Chokidar watcher

  const watcher = chokidar.watch(targets, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: false, // Run the generator once at the start
  });


  // Process safe list from config file
  const safeList = processSafelist(config);

  // Set the handlers on file add, change, delete ...
  watcher
    .on("all", (event) => {
      console.log(event);
    })
    .on("add", (filePath) => {
      console.log(filePath);
      return scanFile(filePath);
    })

    .on("change", async (filePath) => {
      const updateStart = performance.now();
      scanFile(filePath);
      const stats = await generateCSS(config, safeList);
      const updateEnd = performance.now();
      stats.duration = (updateEnd - updateStart).toFixed(1); // One decimal place for precision
      report(stats);
    })
    .on("unlink", (filePath) => {
      logger.info(`[REMOVED] ${filePath}`);
      logger.error("Unlinking files is not yet supported");
    })
    .on("ready", async () => {
      let stats = await generateCSS(config, safeList);
      const endTime = performance.now();
      stats.duration = (endTime - startTime).toFixed(0); // Round to nearest ms

      report(stats);
    });
}

start();
