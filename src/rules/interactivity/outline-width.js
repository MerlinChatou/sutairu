import { resolveNumericValue } from "../utils.js";

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                 -> Group 1: Optional "!"
     * (b|bt|bb|bl|br|bx|by) -> Group 2: Border type
     * -                     -> Literal dash
     * ([0-9./]+)            -> Group 3: Value (Supports Integers, Fractions, Decimals)
     */
    test: /^(!?)ol-([0-9./]+)$/,
    parse: (match) => {
      const [, important, rawValue] = match;
      const util = match[0];
      
      // 1. Resolve numeric string (e.g., "1/2" -> 0.5)
      const numeric = resolveNumericValue(rawValue, 3);
      
      // 2. 1:1 Scale for pixels
      // If numeric is 0, we use 0, otherwise append 'px'
      const finalValue = numeric === 0 ? "0" : `${numeric}px`;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [ { "outline-width" : finalValue} ],
          },
        ],
      };
    },
  },
];