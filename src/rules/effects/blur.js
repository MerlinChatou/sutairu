import { spacingUnitPattern, resolveNumericValue } from "../utils.js";

/**
 * Utility for Blur.
 * Maps values to the --su-blur CSS variable.
 * Matches: blur-10, blur-5px, !blur-2rem, blur-1/2rem
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional importance flag
     * blur-             -> Prefix
     * ([0-9./]+)        -> Group 2: Numeric value (Integer, Decimal, or Fraction)
     * (${spacingUnitPattern})? -> Group 3: Optional unit (px, rem, etc.)
     */
    test: new RegExp(`^(!?)blur-([0-9./]+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const util = match[0]; // Full string: "!blur-1/2rem"
      const isImportant = match[1] === "!";
      const rawValue = match[2];
      const unit = match[3] || "px"; // Default to px

      // Resolve numeric value for fractions or decimals
      const numeric = resolveNumericValue(rawValue);

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
                "--su-blur": `blur(${numeric}${unit})`,
              },
            ],
          },
        ],
      };
    },
  },
];