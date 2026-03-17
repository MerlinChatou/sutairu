/**
 * Utility for Grayscale.
 * Matches: grayscale-100, !grayscale-50, grayscale-0
 */

export const patterns = [
  {
    /**
     * Regex:
     * ^(!?)             -> Group 1: Optional "!" for important
     * grayscale-        -> Literal prefix
     * ([0-9]+)          -> Group 2: Integer value (no floating points)
     */
    test: new RegExp(`^(!?)grayscale-([0-9]+)$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const rawValue = parseInt(match[2], 10);
      
      // Convert integer to decimal (e.g., 50 -> 0.5)
      const decimalValue = rawValue / 100;
      
      const importantTag = isImportant ? " !important" : "";

      return `--su-grayscale: grayscale(${decimalValue})${importantTag};`;
    },
  },
];