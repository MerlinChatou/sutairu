// src/logger.js
let isVerbose = false;
let formattedPrefix;

// Logger for logging messages
export const logger = {
  // Call this once at startup
  init(verbose, prefix) {
    isVerbose = verbose;

    // If label exists, wrap it. If not, use the default.
    if (prefix && prefix.trim() !== "") {
      formattedPrefix = `[${prefix.trim()}] `;
    } else {
      formattedPrefix = "";
    }
  },

  // Display info messages
  log: (msg) => info(msg),
  info: (msg) => console.log(`${formattedPrefix}${msg}`),

  // Display message, only when verbose = true
  verbose: (msg) => {
    if (isVerbose) console.log(`\x1b[90m${formattedPrefix}[DEBUG] ${msg}\x1b[0m`);
  },
  // Display warning messages
  warn: (msg) => {
    console.warn(`\x1b[33m${formattedPrefix}[WARN] ${msg}\x1b[0m`);
  },
  // Display errors
  error: (msg, err) => {
    console.error(`\x1b[31m${formattedPrefix}[ERROR] ${msg}\x1b[0m`);
    if (err) console.error(err);
  },
};
