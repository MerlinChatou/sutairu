import { spacingUnitPattern } from "../utils.js";

const computeGap = (value, unit, isNegative, isImportant) => {
  const importantTag = isImportant ? " !important" : "";
  
  // Surgical Case: 0 is unitless
  if (value === "0") return `0${importantTag}`;

  if (!unit) {
    const num = parseFloat(value);
    const multiplier = isNegative ? -0.25 : 0.25;
    return `${num * multiplier}rem${importantTag}`;
  }

  const leadingDash = isNegative ? "-" : "";
  return `${leadingDash}${value}${unit}${importantTag}`;
};

export const patterns = [
  {
    /**
     * Matches: !gap-4, gap-0, !-gap-2, gap-10px
     */
    test: new RegExp(`^(!)?(-)?gap-(-?\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const value = computeGap(match[3], match[4], isNegative, isImportant);
      return `gap: ${value};`;
    },
  },
  {
    /**
     * Matches: !gap-x-4
     */
    test: new RegExp(`^(!)?(-)?gap-x-(-?\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const value = computeGap(match[3], match[4], isNegative, isImportant);
      return `column-gap: ${value};`;
    },
  },
  {
    /**
     * Matches: !gap-y-4
     */
    test: new RegExp(`^(!)?(-)?gap-y-(-?\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const value = computeGap(match[3], match[4], isNegative, isImportant);
      return `row-gap: ${value};`;
    },
  },
];