/**
 * Utility for object-fit.
 * Matches: !of-cover, object-contain, !of-fill, of-none
 */

const objectFitMap = {
  'contain':    'contain',
  'cover':      'cover',
  'fill':       'fill',
  'none':       'none',
  'scale-down': 'scale-down',
};

export const patterns = [
  {
    /**
     * Regex:
     * ^(!)?              -> Group 1: Optional "!"
     * (object|of)-       -> Group 2: Support both standard and your "of-" shorthand
     * (...)              -> Group 3: The map keys
     */
    test: new RegExp(`^(!)?(object|of)-(${Object.keys(objectFitMap).join('|')})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = objectFitMap[match[3]]; // Use Group 3 for the value
      const importantTag = isImportant ? " !important" : "";
      
      return `object-fit: ${value}${importantTag};`;
    },
  },
];