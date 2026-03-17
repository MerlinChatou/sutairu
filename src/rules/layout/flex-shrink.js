/**
 * Utility for Flex Shrink.
 * Matches: 
 * - fsr-1 (flex-shrink: 1) - Default browser behavior
 * - fsr-0 (flex-shrink: 0) - Prevents element from squishing
 * - !fsr-2 (flex-shrink: 2 !important)
 * - fsr-inherit (flex-shrink: inherit)
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                 -> Group 1: Important flag
     * fsr-                  -> Prefix (Flex ShRink)
     * (\d+|inherit|initial|unset|revert) -> Group 2: Integer OR CSS Keyword
     */
    test: /^(!?)fsr-(\d+|inherit|initial|unset|revert)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = match[2];

      return `flex-shrink: ${value}${isImportant ? " !important" : ""};`;
    },
  },
];