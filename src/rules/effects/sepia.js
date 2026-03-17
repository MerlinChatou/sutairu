/**
 * Utility for Sepia.
 * Matches: sepia-100 (vintage), !sepia-50, hover:sepia-0
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Optional "!"
     * (hover:)?         -> Group 2: Optional hover prefix
     * sepia-            -> Literal prefix
     * ([0-9]+)          -> Group 3: Integer value
     */
    test: /^(!?)(hover:)?sepia-([0-9]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = parseInt(match[3], 10);

      // Convert integer to decimal (e.g., 100 -> 1, 40 -> 0.4)
      const decimalValue = rawValue / 100;
      const importantTag = isImportant ? " !important" : "";

      const cssValue = `sepia(${decimalValue})${importantTag}`;

      if (isHover) {
        return `.hover\\:sepia-${rawValue}:hover { --su-sepia: ${cssValue}; }`;
      }

      return `--su-sepia: ${cssValue};`;
    },
  },
];
