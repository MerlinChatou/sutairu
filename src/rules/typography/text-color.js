import { convertToOklch } from "../utils.js";
import { colorsList } from "../utils.js";


export const patterns = [
  {
    /**
     * Matches:
     * bg-green
     * bg-green-500
     * bg-green/50
     * !bg-subtle-200/0.8
     */
    test: new RegExp(`^(!?)text-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
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

      return `color: ${colorValue}${isImportant ? ' !important' : ''};`;
    }
  }
];