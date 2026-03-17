/**
 * Utility for Flex Grow.
 * Matches: 
 * - fg-1 (flex-grow: 1)
 * - fg-0 (flex-grow: 0)
 * - fg-inherit (flex-grow: inherit)
 * - !fg-2 (flex-grow: 2 !important)
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                -> Group 1: Important flag
     * fg-                  -> Prefix
     * (\d+|inherit|initial|unset|revert) -> Group 2: Integer OR CSS Keyword
     */
    test: /^(!?)fg-(\d+|inherit|initial|unset|revert)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = match[2];

      return `flex-grow: ${value}${isImportant ? " !important" : ""};`;
    },
  },
];