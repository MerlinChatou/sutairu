import { letterSpacingUnitPattern } from "../constants.js";

const namedScales = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
};

const STEP_UNIT = 0.01;

export const patterns = [
  // 1. Named Scales (ls-wide)
  {
    test: new RegExp(`^(-)?ls-(${Object.keys(namedScales).join("|")})$`),
    parse: (match) => {
      const isNegative = match[1] === "-";
      const rawValue = namedScales[match[2]];
      const finalValue = isNegative ? rawValue * -1 : rawValue;
      return `letter-spacing: ${finalValue === 0 ? "0" : finalValue + "em"};`;
    },
  },
  {
    /**
     * Matches milli-units: ls-1000mrem, -ls-50mpx, ls-25mem
     * Group 1: Optional leading negative
     * Group 2: The integer value
     * Group 3: The unit (rem, px, or em)
     */
    test: /^(-)?ls-(\d+)m(rem|px|em)$/,
    parse: (match) => {
      const isNegative = match[1] === "-";
      const num = parseInt(match[2], 10);
      const unit = match[3];
      const value = num / 1000;
      
      return `letter-spacing: ${isNegative ? "-" : ""}${value}${unit};`;
    },
  },
  {
    /**
     * Matches unitless steps: ls-1, -ls-10
     */
    test: /^(-)?ls-(\d+)$/,
    parse: (match) => {
      const isNegative = match[1] === "-";
      const num = parseInt(match[2], 10);
      const value = (num * STEP_UNIT).toFixed(3).replace(/\.?0+$/, "");
      return `letter-spacing: ${isNegative ? "-" : ""}${value}em;`;
    },
  },
  {
    /**
     * Matches standard units: ls-1px, ls-0.05rem
     */
    test: new RegExp(`^(-)?ls-(-?\\d*\\.?\\d+)${letterSpacingUnitPattern}$`),
    parse: (match) => {
      const isNegative = match[1] === "-";
      const value = match[2];
      const unit = match[3];
      const num = parseFloat(value) * (isNegative ? -1 : 1);
      return `letter-spacing: ${num}${unit};`;
    },
  },
];