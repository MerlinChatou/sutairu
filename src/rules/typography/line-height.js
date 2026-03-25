import { spacingUnitPattern, resolveNumericValue } from "../utils.js";


const baseRules = {
  "none": "1/1",
  "xs":   "5/4",
  "sm":   "11/8",
  "md":   "3/2",
  "lg":   "5/3",
  "xl":   "9/5",
};

export const patterns = [
  // 1. Static Keywords: lh-sm, lh-md...
  {
    test: new RegExp(`^(!?)lh-(${Object.keys(baseRules).join("|")})$`),
    parse: (match) => {
      const [, important, key] = match;
      const value = resolveNumericValue(baseRules[key]);
      
      return {
        isImportant: important === "!",
        rules: [{
          selector: match[0],
          declarations: [{ "line-height": value }]
        }]
      };
    }
  },

  // 2. Fractions & Decimals: lh-3/2, lh-1.5
  {
    test: new RegExp(`^(!?)lh-([0-9./]+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const [, important, rawValue, unit = ""] = match;
      const value = resolveNumericValue(rawValue);

      return {
        isImportant: important === "!",
        rules: [{
          selector: match[0],
          declarations: [{ "line-height": `${value}${unit}` }]
        }]
      };
    }
  },

  // 3. Integers with Units: lh-150%, lh-24px
  {
    test: new RegExp(`^(!?)lh-(\\d+)(${spacingUnitPattern})$`),
    parse: (match) => {
      const [, important, value, unit] = match;

      return {
        isImportant: important === "!",
        rules: [{
          selector: match[0],
          declarations: [{ "line-height": `${value}${unit}` }]
        }]
      };
    }
  }
];