/**
 * Utility for Flex Grow.
 * Positions flex items by defining how they grow to fill space.
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                             -> Group 1: Important flag
     * fg-                               -> Prefix
     * (\d+|inherit|initial|unset|revert) -> Group 2: Integer OR CSS Keyword
     */
    test: /^(!?)grow-(\d+|inherit|initial|unset|revert)$/,
    parse: (match) => {
      const util = match[0]; // Entire class: "!fg-1"
      const isImportant = match[1] === "!";
      const value = match[2];

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "flex-grow": value,
              },
            ],
          },
        ],
      };
    },
  },
];