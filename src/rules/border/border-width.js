import { resolveNumericValue } from "../utils.js";

/**
 * Utility for border-width.
 * Scale: 1 unit = 0.25rem (matching margins)
 * Matches: b-1 (0.25rem), !bt-2 (0.5rem), bx-4 (1rem)
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
     * ^(!?)             -> Group 1: Optional "!"
     * (b|bt|bb|bl|br|bx|by) -> Group 2: Border type
     * -                 -> Literal dash
     * ([0-9./]+)        -> Group 3: Value (Supports Integers, Fractions, Decimals)
     */
    test: /^(!?)(b|bt|bb|bl|br|bx|by)-([0-9./]+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const type = match[2];
      const rawValue = match[3];
      
      // 1. Resolve numeric string with 3-digit max
      const numeric = resolveNumericValue(rawValue, 3);
      
      // 2. Convert to rem scale (1 = 0.25rem)
      // We use resolveNumericValue again on the result to ensure the final
      // math (e.g. 0.333 * 0.25) doesn't produce long floating point tails.
      const remValue = resolveNumericValue(numeric * 0.25, 3);
      const finalValue = `${remValue}rem`;

      return {
        isImportant,
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