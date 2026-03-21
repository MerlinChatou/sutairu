/**
 * Utility for Flex Shrink.
 * Defines how much a flex item will shrink relative to the rest of the flex items 
 * when there is a negative free space.
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                             -> Group 1: Important flag
     * fsr-                              -> Prefix (Flex ShRink)
     * (\d+|inherit|initial|unset|revert) -> Group 2: Integer OR CSS Keyword
     */
    test: /^(!?)shrink-(\d+|inherit|initial|unset|revert)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!fsr-0"
      const isImportant = match[1] === "!";
      const value = match[2];

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector stores the exact string from HTML.
             * Your generator handles prefixing with '.' and escaping '!'.
             */
            selector: util,
            declarations: [
              {
                "flex-shrink": value,
              },
            ],
          },
        ],
      };
    },
  },
];