/**
 * Utility for text-wrap.
 * Controls how text wraps within an element.
 */

const wrapMap = {
  'wrap': 'wrap',
  'nowrap': 'nowrap',
  'balance': 'balance', // Best for short headlines (2-3 lines)
  'pretty': 'pretty',   // Prevents orphans (single words on last line)
  'stable': 'stable',
};

export const patterns = [
  {
    /**
     * Matches: text-wrap, text-nowrap, text-balance, text-pretty
     */
    test: new RegExp(`^text-(${Object.keys(wrapMap).join('|')})$`),
    parse: (match) => {
      const value = wrapMap[match[1]];
      return `text-wrap: ${value};`;
    },
  },
];