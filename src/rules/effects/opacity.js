import { resolveNumericValue, generateRegistry } from "../utils.js";

/**
 * 1. Static Opacity Keywords
 */
const baseOpacityRules = {
  "opacity-inherit": { "opacity": "inherit" },
  "opacity-initial": { "opacity": "initial" },
  "opacity-revert": { "opacity": "revert" },
  "opacity-unset": { "opacity": "unset" },
};

const baseRules = Object.entries(baseOpacityRules).reduce((acc, [key, decl]) => {
  acc[key] = {
    rules: [{
      selector: key,
      declarations: [decl]
    }]
  };
  return acc;
}, {});

// generateRegistry creates both standard and !important versions
export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Opacity Patterns
 * Matches: opacity-50, !opacity-1/2, opacity-0.75
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)       -> Group 1: Optional importance flag
     * opacity-    -> Prefix
     * ([0-9./]+)  -> Group 3: Value (Integer, Fraction, or Decimal)
     */
    test: /^(!?)opacity-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!opacity-1/2"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value with 3-digit precision
      const numeric = resolveNumericValue(rawValue, 3);

      /**
       * Logic:
       * If value > 1 (e.g., 50, 100), treat as percentage (0.5, 1).
       * If value <= 1 (e.g., 0.5, 1/2), treat as raw decimal.
       * Clamp at 1 to prevent invalid opacity values.
       */
      const decimalValue = Math.min(numeric > 1 ? numeric / 100 : numeric, 1);

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "opacity": decimalValue,
              },
            ],
          },
        ],
      };
    },
  },
];