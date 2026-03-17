/**
 * Utility for Contrast.
 * Matches: contrast-0 (black), contrast-100 (normal), contrast-200 (high)
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Optional "!"
     * contrast-         -> Literal prefix
     * ([0-9]+)          -> Group 2: Integer value
     */
    test: new RegExp(`^(!?)contrast-([0-9]+)$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const rawValue = parseInt(match[2], 10);
      
      // Convert integer to decimal (e.g., 150 -> 1.5)
      const decimalValue = rawValue / 100;
      
      const importantTag = isImportant ? " !important" : "";

      return `--su-contrast: contrast(${decimalValue})${importantTag};`;
    },
  },
];