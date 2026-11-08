/**
 * Utility for Text Wrap.
 * Controls how text wraps within an element.
 */

const wrapMap = {
  'wrap': 'wrap',
  'nowrap': 'nowrap',
  'balance': 'balance',
  'pretty': 'pretty',
  'stable': 'stable',
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                                -> Group 1: Important flag
     * text-                                -> Prefix
     * (wrap|nowrap|balance|pretty|stable)  -> Group 2: Wrap strategy keys
     */
    test: new RegExp(`^(!?)text-(${Object.keys(wrapMap).join('|')})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const value = wrapMap[key];

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "text-wrap": value,
              },
            ],
          },
        ],
      };
    },
  },
];