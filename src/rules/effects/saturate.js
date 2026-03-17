/**
 * Utility for Saturation.
 * Matches: saturate-0 (B&W), saturate-100 (normal), saturate-200 (double color)
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Important
     * (hover:)?         -> Group 2: Hover
     * saturate-         -> Literal prefix
     * ([0-9]+)          -> Group 3: Integer value
     */
    test: /^(!?)(hover:)?saturate-([0-9]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = parseInt(match[3], 10);
      
      // Convert to decimal (e.g., 200 -> 2)
      const decimalValue = rawValue / 100;
      const importantTag = isImportant ? " !important" : "";

      const cssValue = `saturate(${decimalValue})${importantTag}`;

      if (isHover) {
        return `.hover\\:saturate-${rawValue}:hover { --su-saturate: ${cssValue}; }`;
      }

      return `--su-saturate: ${cssValue};`;
    },
  },
];