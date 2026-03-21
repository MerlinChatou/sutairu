import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Brightness.
 * Maps values to the --su-brightness CSS variable.
 * Matches: brightness-50 (darker), brightness-100 (normal), brightness-200 (brighter), !brightness-1/2
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * brightness-       -> Prefix
     * ([0-9./]+)        -> Group 2: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)brightness-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!brightness-150"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value (e.g., "150" -> 150, "3/2" -> 1.5)
      const numeric = resolveNumericValue(rawValue);

      /**
       * Logic: 
       * If the user provides a value > 3 (like 50, 100, 200), we treat it as a percentage (0.5, 1, 2).
       * We use 3 as a threshold to allow for high brightness (300%) while still 
       * supporting direct decimals/fractions like 0.8 or 1/2.
       */
      const finalDecimal = numeric > 3 ? numeric / 100 : numeric;

      return {
        isImportant,
        rules: [
          {
            selector: util, // Preserving original utility string
            declarations: [
              {
                "--su-brightness": `brightness(${Number(finalDecimal).toFixed(3) * 1})`,
              },
            ],
          },
        ],
      };
    },
  },
];