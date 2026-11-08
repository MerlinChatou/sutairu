import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Contrast.
 * Maps values to the --su-contrast CSS variable.
 * Matches: contrast-0, !contrast-50, contrast-150, contrast-1/2
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * contrast-         -> Prefix
     * ([0-9./]+)        -> Group 2: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)contrast-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!contrast-200"
      const isImportant = match[1] === "!";
      const rawValue = match[2];

      // Resolve numeric value (e.g., "200" -> 200, "1/2" -> 0.5)
      const numeric = resolveNumericValue(rawValue);

      /**
       * Logic: 
       * If the user provides a value > 3 (like 50, 100, 200), we treat it as a percentage (0.5, 1, 2).
       * We use 3 as a threshold to allow for high contrast while still 
       * supporting direct decimals/fractions like 0.8 or 1/4.
       */
      const finalDecimal = numeric > 3 ? numeric / 100 : numeric;

      

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector stores the exact string from HTML.
             * Your generator handles prefixing with '.' and escaping '!'.
             */
            selector: util,
            declarations: [
              {
                "--su-contrast": `contrast(${finalDecimal})`,
              },
            ],
          },
        ],
      };
    },
  },
];