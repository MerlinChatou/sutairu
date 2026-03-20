import { spacingUnitPattern, resolveNumericValue } from "../utils.js";

// Helper for Property Mapping
const propertiesLUT = {
  m: ["margin"],
  mt: ["margin-top"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  mr: ["margin-right"],
  mx: ["margin-inline"],
  my: ["margin-block"],
  ms: ["margin-inline-start"],
  me: ["margin-inline-end"],
};

export const patterns = [
  {
    /**
     * Matches: !-mx-2.5rem, mt-2/3vw, !m-1/2px, etc.
     */
    test: new RegExp(
      `^(!?)(-?)(m|mt|mb|ml|mr|mx|my|ms|me)-` +
        `(\\d+(?:\\/\\d+)?|\\d*\\.?\\d+)` + // Group 4: Fraction OR Decimal
        `(${spacingUnitPattern})$`, // Group 5: Unit
    ),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const type = match[3];
      const rawValue = match[4]; // e.g., "2/3" or "2.5"
      const unit = match[5];

      // Handle Fraction Logic
      let numericValue = resolveNumericValue(rawValue);

      const negativePrefix = isNegative ? "-" : "";
      // Round to 6 decimal places to keep CSS clean
      const finalValue = `${negativePrefix}${Number(numericValue.toFixed(3))}${unit}`;

      return {
        isImportant,
        rules: [
          {
            // Handle selector escaping for fractions and decimals
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
