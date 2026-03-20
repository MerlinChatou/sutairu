import { spacingUnitPattern } from "../utils.js";

const prefixMap = {
  'w': 'width',
  'h': 'height',
  'min-w': 'min-width',
  'min-h': 'min-height',
  'max-w': 'max-width',
  'max-h': 'max-height',
};

export const patterns = [
  {
    /**
     * Matches: w-16px, h-32rem, max-w-100%, min-h-50vh, !w-200px
     * Capture groups: 1: important, 2: prefix, 3: number, 4: unit
     */
    test: new RegExp(`^(!?)(w|h|min-w|min-h|max-w|max-h)-([0-9.]+?)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const property = prefixMap[match[2]];
      const value = match[3];
      const unit = match[4];

      return `${property}: ${value}${unit}${isImportant ? ' !important' : ''};`;
    }
  }
];