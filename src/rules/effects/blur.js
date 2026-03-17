import { borderWidthUnitPattern } from "../constants.js";

export const patterns = [
  {
    /**
     * Matches: blur-10, blur-5px, !blur-2rem
     * Group 1: Optional "!"
     * Group 2: Integer value
     * Group 3: Optional unit from constants
     */
    test: new RegExp(`^(!?)blur-([0-9]+)${borderWidthUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = match[2];
      const unit = match[3] || "px"; // Default to px if no unit is provided (blur-50 -> 50px)
      const importantTag = isImportant ? " !important" : "";

      return `--su-blur: blur(${value}${unit})${importantTag};`;
    },
  },
];