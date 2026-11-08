import { spacingUnitPattern } from "../utils.js";

export const patterns = [
  {
    /**
     * Matches: 
     * pw-20             -> 20px
     * !pw-1/2           -> 50%
     * hover:pw-40       -> .hover\:pw-40:hover { --su-pattern-p: 40px; }
     * pattern-period-2rem -> 2rem
     */
    test: new RegExp(`^(!?)(hover:)?(?:pattern-period|pp)-([0-9]+(?:\\/[0-9]+)?)(?:(${spacingUnitPattern}))?$`),
    parse: (match) => {
      const [util, important, hover, rawValue, unitMatch] = match;

      const isFraction = rawValue.includes("/");
      let value;
      
      // 1. Determine Unit
      // Logic: Explicit unit > Fraction (%) > Integer (px)
      const unit = unitMatch || (isFraction ? "%" : "px");

      // 2. Process Math
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        const multiplier = unit === "%" ? 100 : 1;
        value = den !== 0 ? parseFloat(((num / den) * multiplier).toFixed(3)) : 0;
      } else {
        value = parseFloat(rawValue);
      }

      const isImportant = important === "!";
      const declaration = { "--su-pattern-p": `${value}${unit}` };

      return {
        isImportant,
        rules: [
          {
            selector: util,
            suffix: hover ? ":hover" : "",
            declarations: [declaration]
          }
        ]
      };
    },
  },
];