import { borderWidthUnitPattern, resolveNumericValue } from "../utils.js";

const getDeclarations = (type, value) => {
  const map = {
    b:  { "border-width": value },
    bt: { "border-top-width": value },
    bb: { "border-bottom-width": value },
    bl: { "border-left-width": value },
    br: { "border-right-width": value },
    bx: { "border-inline-width": value },
    by: { "border-block-width": value },
    bs: { "border-inline-start-width": value },
    be: { "border-inline-end-width": value },
  };
  return map[type];
};

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
    test: new RegExp(`^(!?)(b|bt|bb|bl|br|bx|by|bs|be)-([0-9./]+)${borderWidthUnitPattern}$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const type = match[2];
      const rawValue = match[3];
      const unit = match[4];

      // Use resolveNumericValue to handle "3/2" -> 1.5
      const numeric = resolveNumericValue(rawValue, 3);
      const finalValue = `${numeric}${unit}`;

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