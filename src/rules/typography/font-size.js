import { spacingUnitPattern } from "../constants.js";

// 1. Static Keywords
// Map logical names to specific rem values
const baseFontSizes = {
  "fs-xs":   "font-size: 0.75rem",
  "fs-sm":   "font-size: 0.875rem",
  "fs-base": "font-size: 1rem",
  "fs-lg":   "font-size: 1.125rem",
  "fs-xl":   "font-size: 1.25rem",
  "fs-2xl":  "font-size: 1.5rem",
  "fs-3xl":  "font-size: 1.875rem",
  "fs-4xl":  "font-size: 2.25rem",
  "fs-5xl":  "font-size: 3rem",
};

export const rules = Object.entries(baseFontSizes).reduce((acc, [key, value]) => {
  acc[key] = `${value};`;
  acc[`!${key}`] = `${value} !important;`;
  return acc;
}, {});

// 2. Dynamic Patterns
export const patterns = [
  {
    /**
     * Pattern A: Numeric Scaling (fs-4 -> 1rem)
     * Matches: fs-4, !fs-16
     */
    test: /^(!?)fs-(\d*\.?\d+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const num = parseFloat(match[2]);
      const suffix = isImportant ? " !important" : "";
      return `font-size: ${num * 0.25}rem${suffix};`;
    },
  },
  {
    /**
     * Pattern B: Explicit Units (fs-14px, !fs-2rem)
     * spacingUnitPattern should be your variable containing: (px|rem|em|vw|vh|...)
     */
    test: new RegExp(`^(!?)fs-(\\d*\\.?\\d+)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const num = match[2];
      const unit = match[3];
      const suffix = isImportant ? " !important" : "";
      return `font-size: ${num}${unit}${suffix};`;
    },
  },
];