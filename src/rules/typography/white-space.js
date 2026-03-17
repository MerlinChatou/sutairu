/**
 * Utility for white-space.
 * Controls how whitespace and line breaks are handled.
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
     * Matches: whitespace-normal, whitespace-pre, etc.
     */
    test: new RegExp(`^ws-(${Object.keys(whiteSpaceMap).join('|')})$`),
    parse: (match) => {
      const value = whiteSpaceMap[match[1]];
      return `white-space: ${value};`;
    },
  },
];