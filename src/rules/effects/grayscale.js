import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Grayscale.
 * Maps values to the --su-grayscale CSS variable.
 * Matches: grayscale-100, !grayscale-50, grayscale-1/2, !grayscale-0.75
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * grayscale-        -> Prefix
     * ([0-9./]+)        -> Group 2: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)grayscale-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!grayscale-50"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value (e.g., "50" -> 50, "1/2" -> 0.5)
      const numeric = resolveNumericValue(rawValue);

      /**
       * Logic: 
       * If the user provides a value > 1 (like 50 or 100), we treat it as a percentage (0.5 or 1).
       * If they provide a small decimal/fraction (like 0.5 or 1/2), we keep it as is.
       */
      const finalDecimal = numeric > 1 ? numeric / 100 : numeric;

      return {
        isImportant,
        rules: [
          {
            selector: util, // Preserving original utility string
            declarations: [
              {
                "--su-grayscale": `grayscale(${finalDecimal})`,
              },
            ],
          },
        ],
      };
    },
  },
];