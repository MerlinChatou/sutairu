import { borderWidthUnitPattern, resolveNumericValue } from "../utils.js";


export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional "!"
     * (b|...|be)        -> Group 2: Border type
     * -                 -> Literal dash
     * ([0-9./]+)        -> Group 3: Numeric value (Supports 1, 1.5, 3/2)
     * ${...}            -> Group 4: Unit pattern
     */
    test: new RegExp(`^(!?)ol-([0-9./]+)${borderWidthUnitPattern}$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const rawValue = match[2];
      const unit = match[3];
      

      // Use resolveNumericValue to handle "3/2" -> 1.5
      const numeric = resolveNumericValue(rawValue, 3);
      const finalValue = `${numeric}${unit}`;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [ { "outline-width": finalValue }],
          },
        ],
      };
    },
  },
];