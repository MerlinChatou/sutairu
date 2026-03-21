import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Invert.
 * Maps values to the --su-invert CSS variable.
 * Matches: invert-100, !invert-50, hover:invert-1/2
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * (hover:)?         -> Group 2: Optional hover prefix
     * invert-           -> Prefix
     * ([0-9./]+)        -> Group 3: The value (Integer, Decimal, or Fraction)
     */
    test: /^(!?)(hover:)?invert-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "hover:invert-1/2"
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = match[3];

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
        isHover, // Metadata for your engine to wrap in :hover selector
        rules: [
          {
            selector: util,
            declarations: [
              {
                "--su-invert": `invert(${finalDecimal})`,
              },
            ],
          },
        ],
      };
    },
  },
];