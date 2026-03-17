import { borderWidthUnitPattern } from "../constants.js";


const getProperties = (type, value) => {
  const map = {
    b:  `border-width: ${value};`,
    bt: `border-top-width: ${value};`,
    bb: `border-bottom-width: ${value};`,
    bl: `border-left-width: ${value};`,
    br: `border-right-width: ${value};`,
    bx: `border-inline-width: ${value};`,
    by: `border-block-width: ${value};`,
    bs: `border-inline-start-width: ${value};`,
    be: `border-inline-end-width: ${value};`,
  };
  return map[type];
};

export const patterns = [
  {
    /**
     * Matches: b-1px, bt-0.5rem, bx-2cqw, etc.
     */
    test: new RegExp(`^(b|bt|bb|bl|br|bx|by|bs|be)-(\\d*\\.?\\d+)${borderWidthUnitPattern}$`),
    parse: (match) => {
      const type = match[1];
      const num = match[2];
      const unit = match[3];
      
      const finalValue = `${num}${unit}`;
      return getProperties(type, finalValue);
    },
  },
];