import { generateRegistry, spacingUnitPattern } from "../utils.js";

/**
 * 1. Static Font Scale
 * Standard T-shirt sizing for typography.
 */
const baseFontSizes = {
  "fs-xs":   "0.75rem",
  "fs-sm":   "0.875rem",
  "fs-base": "1rem",
  "fs-lg":   "1.125rem",
  "fs-xl":   "1.25rem",
  "fs-2xl":  "1.5rem",
  "fs-3xl":  "1.875rem",
  "fs-4xl":  "2.25rem",
  "fs-5xl":  "3rem",
};

const baseRules = Object.entries(baseFontSizes).reduce((acc, [key, value]) => {
  acc[key] = {
    rules: [{
      selector: key,
      declarations: [{ "font-size": value }]
    }]
  };
  return acc;
}, {});

export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns
 */
export const patterns = [
  {
    /**
     * Matches: fs-4 (1rem), !fs-16px, fs-2rem, !fs-1.5vh
     * 
     * Group 1: (!?)       -> Importance
     * Group 2: (\d...)    -> Numeric value
     * Group 3: (unit?)    -> Optional unit from spacingUnitPattern
     */
    test: new RegExp(`^(!?)fs-(\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const rawValue = match[2];
      const unit = match[3];

      let finalValue;
      if (!unit) {
        // Unitless Step (e.g., fs-4 -> 1rem)
        const num = parseFloat(rawValue);
        finalValue = num === 0 ? "0" : `${num * 0.25}rem`;
      } else {
        // Explicit Unit (e.g., fs-14px)
        finalValue = `${rawValue}${unit}`;
      }

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [{ "font-size": finalValue }]
        }]
      };
    },
  },
];