/**
 * Utility for text-align.
 * Supports standard and logical properties.
 */

const alignmentMap = {
  'left': 'left',
  'right': 'right',
  'center': 'center',
  'justify': 'justify',
  // Logical properties (modern standard)
  'start': 'start',
  'end': 'end',
};

export const patterns = [
  {
    /**
     * Matches: ta-left, ta-center, ta-start, etc.
     */
    test: new RegExp(`^text-(${Object.keys(alignmentMap).join('|')})$`),
    parse: (match) => {
      const value = alignmentMap[match[1]];
      return `text-align: ${value};`;
    },
  },
];