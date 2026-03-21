/**
 * Utility for overflow, overflow-x, and overflow-y.
 * Matches: overflow-auto, !ov-hidden, ov-x-scroll, !ov-y-auto, !overflow-x-clip
 */
const overflowMap = {
  'auto':    'auto',
  'hidden':  'hidden',
  'clip':    'clip',
  'visible': 'visible',
  'scroll':  'scroll',
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                -> Group 1: Optional importance flag
     * (?:overflow|ov)      -> Non-capturing prefix
     * (?:-(x|y))?          -> Group 2: Optional axis (x or y)
     * -                    -> Separator
     * (...)                -> Group 3: Value from overflowMap
     */
    test: new RegExp(`^(!?)(?:overflow|ov)(?:-(x|y))?-(${Object.keys(overflowMap).join('|')})$`),
    parse: (match) => {
      const util = match[0]; 
      const isImportant = match[1] === "!";
      const axis = match[2]; // 'x', 'y', or undefined
      const key = match[3];
      const finalValue = overflowMap[key];

      // Determine property: overflow, overflow-x, or overflow-y
      const property = axis ? `overflow-${axis}` : 'overflow';

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
                [property]: finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];