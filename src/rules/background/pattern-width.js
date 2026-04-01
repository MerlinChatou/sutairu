import { spacingUnitPattern } from "../utils.js";

export const patterns = [
  {
    /**
     * Matches: 
     * pw-20             -> --su-pattern-w: 20px;
     * !pw-1/2           -> --su-pattern-w: 50% !important;
     * pw-5rem           -> --su-pattern-w: 5rem;
     * pattern-width-10  -> --su-pattern-w: 10px;
     */
    test: new RegExp(`^(!?)(?:pattern-width|pw)-([0-9]+(?:\\/[0-9]+)?)(?:(${spacingUnitPattern}))?$`),
    parse: (match) => {
      const [util, important, rawValue, unitMatch] = match;

      const isFraction = rawValue.includes("/");
      
      // 1. Determine the Unit
      // Priority: Explicit match > Fraction (%) > Integer (px)
      const unit = unitMatch || (isFraction ? "%" : "px");

      // 2. Process Math
      let value;
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        // Multiply by 100 only if the unit is percentage
        const multiplier = unit === "%" ? 100 : 1;
        value = den !== 0 ? parseFloat(((num / den) * multiplier).toFixed(3)) : 0;
      } else {
        value = parseFloat(rawValue);
      }

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "--su-pattern-w": `${value}${unit}` }
            ]
          }
        ]
      };
    },
  },
];