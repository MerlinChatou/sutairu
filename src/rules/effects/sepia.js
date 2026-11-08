import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Sepia.
 * Maps values to the --su-sepia CSS variable.
 * Matches: sepia-100 (vintage), !sepia-50, sepia-1/4
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * sepia-            -> Prefix
     * ([0-9./]+)        -> Group 4: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)sepia-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "sepia-100"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value with 3-digit precision (e.g., "2/3" -> 0.667)
      const numeric = resolveNumericValue(rawValue, 3);

      /**
       * Logic: 
       * If value > 1 (e.g., 50, 100), treat as percentage (0.5, 1).
       * If value <= 1 (e.g., 0.5, 1/2), treat as raw decimal.
       */
      const finalDecimal = numeric > 1 ? numeric / 100 : numeric;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "--su-sepia": `sepia(${finalDecimal})`,
              },
            ],
          },
        ],
      };
    },
  },
];