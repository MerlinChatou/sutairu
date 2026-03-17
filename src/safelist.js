import { logger } from "./utils/logger.js";
/**
 * Processes the safelist from config.
 * Only strings are accepted to keep the engine lean and performant.
 * * @param {Object} config - The resolved configuration object.
 * @returns {string[]} An array of unique class names to force-generate.
 */
export function processSafelist(config) {
  const forcedClasses = new Set();

  // Ensure safelist exists and is an array before processing
  const list = Array.isArray(config.safelist) ? config.safelist : [];

  list.forEach((item) => {
    if (typeof item === "string") {
      forcedClasses.add(item);
    } else {
      // Log an error if a non-string (like a Regex or Object) is passed
      logger.error(`[SAFELIST] Invalid entry: "${JSON.stringify(item)}". Only strings are allowed.`);
    }
  });

  return Array.from(forcedClasses);
}