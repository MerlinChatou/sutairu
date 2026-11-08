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
     * Updated regex to handle fractions.
     * Matches: fs-4, fs-5/3, !fs-20/3rem, fs-1.5rem
     * * Group 1: (!?)              -> Importance
     * Group 2: (\d*\.?\d+)       -> Numerator (Value)
     * Group 3: (\/(\d*\.?\d+))?  -> Optional /Denominator (Group 4 is the actual divisor)
     * Group 5: (unit?)           -> Optional unit
     */
    test: new RegExp(`^(!?)fs-(\\d*\\.?\\d+)(\\/(\\d*\\.?\\d+))?(${spacingUnitPattern})?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const numerator = parseFloat(match[2]);
      const denominator = match[4] ? parseFloat(match[4]) : null;
      const unit = match[5];

      // Calculate the numeric result
      let calculatedValue = denominator ? numerator / denominator : numerator;
      calculatedValue = parseFloat(calculatedValue.toFixed(3));

      let finalValue;
      if (!unit) {
        // Unitless Step (e.g., fs-4 -> 1rem, fs-5/3 -> 1.25rem)
        finalValue = calculatedValue === 0 ? "0" : `${calculatedValue * 0.25}rem`;
      } else {
        // Explicit Unit (e.g., fs-20/3rem)
        finalValue = `${calculatedValue}${unit}`;
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

