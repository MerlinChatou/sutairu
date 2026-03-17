import { convertToOklch } from "../../utils/convert-to-oklch.js";
import { colorsList } from "../constants.js";

export const patterns = [
  {
    /**
     * Matches:
     * b-green
     * b-green-500
     * b-green/50
     * !b-subtle-200/0.8
     */
    test: new RegExp(`^(!?)b-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const colorName = match[2];
      const shade = match[3];        // undefined if missing
      const transparency = match[4]; // undefined if missing

      const colorValue = convertToOklch({ 
        color: colorName, 
        shade, 
        transparency 
      });

      return `border-color: ${colorValue}${isImportant ? ' !important' : ''};`;
    }
  }
];