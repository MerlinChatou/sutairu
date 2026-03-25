import { resolveNumericValue } from "../utils.js";

/**
 * Utility for border-width.
 * Scale: 1 unit = 1px
 * Matches: b-1 (1px), !bt-2 (2px), bx-0.5 (0.5px)
 */

const getDeclarations = (type, value) => {
  const map = {
    b:  { "border-width": value },
    bt: { "border-top-width": value },
    bb: { "border-bottom-width": value },
    bl: { "border-left-width": value },
    br: { "border-right-width": value },
    bx: { "border-inline-width": value },
    by: { "border-block-width": value },
  };
  return map[type];
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                 -> Group 1: Optional "!"
     * (b|bt|bb|bl|br|bx|by) -> Group 2: Border type
     * -                     -> Literal dash
     * ([0-9./]+)            -> Group 3: Value (Supports Integers, Fractions, Decimals)
     */
    test: /^(!?)(b|bt|bb|bl|br|bx|by)-([0-9./]+)$/,
    parse: (match) => {
      const [, important, type, rawValue] = match;
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
            declarations: [getDeclarations(type, finalValue)],
          },
        ],
      };
    },
  },
];