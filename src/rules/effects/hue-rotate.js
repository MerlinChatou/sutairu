import { resolveNumericValue } from "../utils.js";

/**
 * Utility for Hue Rotation.
 * Maps values to the --su-hue-rotate CSS variable.
 * Matches: 
 * - hue-rotate-90 (90deg)
 * - -hue-rotate-3.6rad
 * - !hue-rotate-0.25turn
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                -> Group 1: Optional importance flag
     * (-)?                 -> Group 2: Negative prefix
     * (hover:)?            -> Group 3: Optional hover prefix
     * hue-rotate-          -> Prefix
     * ([0-9./]+)           -> Group 4: Value (Supports Integer, Fraction, and now Decimal)
     * (deg|grad|rad|turn)? -> Group 5: Optional units
     */
    test: /^(!?)(-)?(hover:)?hue-rotate-([0-9./]+)(deg|grad|rad|turn)?$/,
    parse: (match) => {
      const util = match[0]; // Full string: "-hue-rotate-3.6rad"
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const isHover = match[3] === "hover:";
      const rawValue = match[4];
      const unit = match[5] || "deg"; // Default to degrees

      // Resolve numeric value with 3-digit precision
      // "3.6" remains 3.6, "1/3" becomes 0.333
      let numeric = resolveNumericValue(rawValue, 3);
      
      if (isNegative) numeric = -numeric;

      return {
        isImportant,
        isHover,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "--su-hue-rotate": `hue-rotate(${numeric}${unit})`,
              },
            ],
          },
        ],
      };
    },
  },
];