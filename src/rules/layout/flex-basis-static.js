/**
 * Utility for Flex Basis.
 * Defines the default size of an element before the remaining space is distributed.
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                                        -> Group 1: Important flag
     * fb-                                          -> Prefix
     * (auto|max|min|fit|content|inherit|initial|unset) -> Group 2: Keywords
     */
    test: /^(!?)fb-(auto|max|min|fit|content|inherit|initial|unset)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];

      // Mapping short-hand keys to valid CSS values
      const valueMap = {
        'auto': 'auto',
        'max': 'max-content',
        'min': 'min-content',
        'fit': 'fit-content',
        'content': 'content',
        'inherit': 'inherit',
        'initial': 'initial',
        'unset': 'unset',
      };

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "flex-basis": valueMap[key],
              },
            ],
          },
        ],
      };
    },
  },
];