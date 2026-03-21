import { generateRegistry } from "../utils.js";

/**
 * 1. Static Semantic Ratios
 * Standard industry aspect ratios.
 */
const baseAspectRatios = {
  "ar-square": "1 / 1",
  "ar-video":  "16 / 9",
  "ar-cinema": "21 / 9",
  "ar-auto":   "auto",
};

const baseRules = Object.entries(baseAspectRatios).reduce((acc, [key, value]) => {
  acc[key] = {
    rules: [{
      selector: key, // e.g., "ar-square"
      declarations: [{ "aspect-ratio": value }]
    }]
  };
  return acc;
}, {});

// generateRegistry creates both standard and !important versions for the static map
export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns
 */
export const patterns = [
  {
    /**
     * Matches: ar-2, ar-16/10, !ar-4/3
     * 
     * Group 1: (!?) -> Optional importance
     * Group 2: (...) -> The ratio (integer, decimal, or fraction)
     */
    test: /^(!?)ar-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
    parse: (match) => {
      const util = match[0]; 
      const isImportant = match[1] === "!";
      const ratioValue = match[2];

      return {
        isImportant,
        rules: [{
          selector: util, // Original utility preserved as selector
          declarations: [{ "aspect-ratio": ratioValue }]
        }]
      };
    }
  }
];