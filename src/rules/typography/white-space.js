/**
 * Utility for white-space.
 * Controls how whitespace and line breaks are handled.
 * Matches: ws-normal, !ws-nowrap, ws-pre-wrap
 */

const whiteSpaceMap = {
  'normal': 'normal',
  'nowrap': 'nowrap',
  'pre': 'pre',
  'pre-line': 'pre-line',
  'pre-wrap': 'pre-wrap',
  'break-spaces': 'break-spaces',
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)       -> Group 1: Optional importance flag
     * ws-         -> Prefix
     * (...)       -> Group 3: Valid white-space values from map keys
     */
    test: new RegExp(`^(!?)ws-(${Object.keys(whiteSpaceMap).join('|')})$`),
    parse: (match) => {
      const util = match[0]; // Full string: "!ws-nowrap"
      const isImportant = match[1] === "!";
      const value = whiteSpaceMap[match[2]];

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "white-space": value,
              },
            ],
          },
        ],
      };
    },
  },
];