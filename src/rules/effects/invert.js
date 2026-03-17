/**
 * Utility for Invert.
 * Matches: invert-100, !invert-50, hover:invert-0
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Optional "!" for important
     * (hover:)?         -> Group 2: Optional hover prefix
     * invert-           -> Literal prefix
     * ([0-9]+)          -> Group 3: Integer value
     */
    test: /^(!?)(hover:)?invert-([0-9]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = parseInt(match[3], 10);
      
      // Convert integer to decimal (e.g., 100 -> 1, 50 -> 0.5)
      const decimalValue = rawValue / 100;
      const importantTag = isImportant ? " !important" : "";

      const cssValue = `invert(${decimalValue})${importantTag}`;

      if (isHover) {
        // Generates: .hover\:invert-100:hover { --su-invert: invert(1); }
        return `.hover\\:invert-${rawValue}:hover { --su-invert: ${cssValue}; }`;
      }

      // Generates: --su-invert: invert(1);
      return `--su-invert: ${cssValue};`;
    },
  },
];