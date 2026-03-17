/**
 * Utility for overflow, overflow-x, and overflow-y.
 * Matches: overflow-auto, !ov-hidden, ov-x-scroll, !ov-y-auto
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
     * Regex:
     * ^(!)?                -> Group 1: Optional "!"
     * (overflow|ov)        -> Group 2: Prefix
     * (?:-(x|y))?          -> Group 3: Optional axis (-x or -y)
     * -(...)               -> Group 4: The value from the map
     */
    test: new RegExp(`^(!)?(overflow|ov)(?:-(x|y))?-(${Object.keys(overflowMap).join('|')})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const axis = match[3]; // undefined, 'x', or 'y'
      const value = overflowMap[match[4]];
      const importantTag = isImportant ? " !important" : "";
      
      const property = axis ? `overflow-${axis}` : 'overflow';
      
      return `${property}: ${value}${importantTag};`;
    },
  },
];