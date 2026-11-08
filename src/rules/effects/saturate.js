import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Saturation.
 * Maps values to the --su-saturate CSS variable.
 * Matches: saturate-0 (B&W), saturate-100 (normal), !saturate-200, saturate-1/2
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * saturate-         -> Prefix
     * ([0-9./]+)        -> Group 3: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)saturate-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!saturate-150"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value with 3-digit precision
      const numeric = resolveNumericValue(rawValue, 3);

      /**
       * Logic: 
       * If value > 3 (e.g., 50, 100, 200), treat as percentage (0.5, 1, 2).
       * Using 3 as a threshold allows for high saturation while 
       * supporting decimals/fractions like 1.5 or 3/2.
       */
      const finalDecimal = numeric > 3 ? numeric / 100 : numeric;

      return {
        isImportant,
        rules: [
          {
            selector: util, // Preserving original utility string for the engine
            declarations: [
              {
                "--su-saturate": `saturate(${finalDecimal})`,
              },
            ],
          },
        ],
      };
    },
  },
];