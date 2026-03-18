import { spacingUnitPattern } from "../constants.js";

// 1. Static Keyword Rules
const baseRules = {
  "lh-none":    { "line-height": "1" },
  "lh-xs":   { "line-height": "5/4" },  // 1.25 (No trailing zeros)
  "lh-sm":    { "line-height": "11/8" }, // 1.375
  "lh-md":  { "line-height": "3/2" },  // 1.5
  "lh-lg": { "line-height": "5/3" },  // 1.666... (Will be rounded)
  "lh-xl":   { "line-height": "9/5" },  // 1.8
};

const build = (props, imp) => {
  const suffix = imp ? " !important" : "";
  return Object.entries(props)
    .map(([prop, val]) => {
      if (typeof val === "string" && val.includes("/")) {
        const [n, d] = val.split("/").map(Number);
        // Use + to strip trailing zeros, but keep precision for long decimals
        val = + (n / d).toFixed(3); 
      }
      return `${prop}: ${val}${suffix};`;
    })
    .join(" ");
};

export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  acc[key] = build(props, false);
  acc[`!${key}`] = build(props, true);
  return acc;
}, {});

// 2. Dynamic Patterns
export const patterns = [
  // 1. Fractions: lh-3/2 -> 1.5
  {
    test: new RegExp(`^(!?)lh-([0-9]+/[0-9]+)${spacingUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const [num, den] = match[2].split("/").map(Number);
      const unit = match[3] || "";
      const calculated = + (num / den).toFixed(3);
      return `line-height: ${calculated}${unit}${isImportant ? " !important" : ""};`;
    }
  },

  // 2. Numbers with Units: lh-150%, lh-24px
  // This is what was missing!
  {
    test: new RegExp(`^(!?)lh-(\\d+)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = match[2];
      const unit = match[3];
      return `line-height: ${value}${unit}${isImportant ? " !important" : ""};`;
    }
  },

  // 3. Simple Unitless Integers: lh-2
  {
    test: /^(!?)lh-(\d+)$/,
    parse: (match) => {
      return `line-height: ${match[2]}${match[1] ? " !important" : ""};`;
    }
  }
];