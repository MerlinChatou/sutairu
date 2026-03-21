import { spacingUnitPattern, resolveNumericValue } from "../utils.js";

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
     * Matches: w-16px, h-1/2rem, max-w-100%, !min-h-50vh
     * 
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Important flag
     * (w|h|...)         -> Group 2: Prefix from prefixMap
     * -                 -> Separator
     * ([0-9./]+?)       -> Group 3: Numeric value (supports decimals and fractions)
     * ${spacingUnitPattern} -> Group 4: Required unit (px, rem, %, etc.)
     */
    test: new RegExp(`^(!?)(w|h|min-w|min-h|max-w|max-h)-([0-9./]+?)${spacingUnitPattern}$`),
    parse: (match) => {
      const util = match[0]; // Full string: "!w-1/2rem"
      const isImportant = match[1] === "!";
      const property = prefixMap[match[2]];
      const rawValue = match[3];
      const unit = match[4];

      // Use your utility helper to handle fractions like 1/2 or decimals like 1.5
      const numericValue = resolveNumericValue(rawValue);

      return {
        isImportant,
        rules: [
          {
            selector: util, 
            declarations: [
              {
                [property]: `${numericValue}${unit}`,
              },
            ],
          },
        ],
      };
    }
  }
];