import { spacingUnitPattern, resolveNumericValue } from "../utils.js";

/**
 * Property Mapping Table for Padding
 */
const propertiesLUT = {
  p: ["padding"],
  pt: ["padding-top"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  pr: ["padding-right"],
  px: ["padding-inline"],
  py: ["padding-block"],
  ps: ["padding-inline-start"],
  pe: ["padding-inline-end"],
};

export const patterns = [
  {
    /**
     * Matches: !p-20px, pt-2/3vw, px-1.5rem, etc.
     * 
     * Regex Structure:
     * Group 1 (!?): Optional importance
     * Group 2 (p|pt...): Property prefix
     * Group 3 (...): Fraction (2/3) or Decimal (2.5)
     * Group 4 (...): Unit from spacingUnitPattern
     */
    test: new RegExp(
      `^(!?)(p|pt|pb|pl|pr|px|py|ps|pe)-` +
        `(\\d+(?:\\/\\d+)?|\\d*\\.?\\d+)` + 
        `(${spacingUnitPattern})$`,
    ),
    parse: (match) => {
      const util = match[0];              // e.g., "!p-1/2vh"
      const isImportant = match[1] === "!";
      const type = match[2];              // e.g., "p"
      const rawValue = match[3];          // e.g., "1/2"
      const unit = match[4] || "";        // e.g., "vh"

      // Resolve numeric value (handles decimals and fractions)
      const numericValue = resolveNumericValue(rawValue);

      // Construct CSS value (3 decimal places is enough for browsers)
      const finalValue = `${Number(numericValue.toFixed(3))}${unit}`;

      return {
        isImportant,
        rules: [
          {
            /**
             * Return the raw utility name as the selector.
             * Your generator will handle prepending '.' and escaping '!' or '/'.
             */
            selector: util,
            declarations: [
              propertiesLUT[type].reduce((acc, prop) => {
                acc[prop] = finalValue;
                return acc;
              }, {}),
            ],
          },
        ],
      };
    },
  },
];