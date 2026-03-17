/**
 * Utility for Brightness.
 * Matches: brightness-50 (darker), brightness-100 (normal), brightness-200 (very bright)
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Optional "!"
     * brightness-       -> Literal prefix
     * ([0-9]+)          -> Group 2: Integer value
     */
    test: new RegExp(`^(!?)brightness-([0-9]+)$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const rawValue = parseInt(match[2], 10);
      
      // Convert to decimal (e.g., 250 -> 2.5)
      const decimalValue = rawValue / 100;
      
      const importantTag = isImportant ? " !important" : "";

      return `--su-brightness: brightness(${decimalValue})${importantTag};`;
    },
  },
];