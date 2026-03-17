const semanticValues = {
  'auto': 'auto',
  'full': '100%',
  'screen': '100vh', // for height
  'screen-w': '100vw', // for width
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
  'prose': '65ch',    // Great for max-width on text
  '0': '0px',
};

// Map prefixes to CSS properties
const prefixMap = {
  'w': 'width',
  'h': 'height',
  'min-w': 'min-width',
  'min-h': 'min-height',
  'max-w': 'max-width',
  'max-h': 'max-height',
};

// 1. Generate Static Semantic Rules (e.g., .w-full, .max-w-prose)
export const rules = {};
Object.entries(prefixMap).forEach(([prefix, property]) => {
  Object.entries(semanticValues).forEach(([key, value]) => {
    const propValue = (prefix.includes('w') && key === 'screen') ? '100vw' : value;
    rules[`${prefix}-${key}`] = `${property}: ${propValue};`;
    rules[`!${prefix}-${key}`] = `${property}: ${propValue} !important;`;
  });
});

// 2. Dynamic Patterns for numbers and arbitrary values
export const patterns = [
  {
    // Matches: w-10, h-64, min-w-1/2, max-h-screen
    test: /^(!?)(w|h|min-w|min-h|max-w|max-h)-([0-9./]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const value = match[3];
      const property = prefixMap[prefix];

      // Handle fractions (e.g., 1/2 -> 50%)
      if (value.includes('/')) {
        const [num, den] = value.split('/');
        const percentage = (parseFloat(num) / parseFloat(den)) * 100;
        return `${property}: ${percentage}%${isImportant ? ' !important' : ''};`;
      }

      // Handle raw numbers (e.g., 4 -> 1rem)
      const numValue = parseFloat(value);
      const finalValue = numValue === 0 ? '0px' : `${numValue * 0.25}rem`;
      return `${property}: ${finalValue}${isImportant ? ' !important' : ''};`;
    }
  },
  {
    /**
     * Arbitrary escape hatch: w-[150px], max-w-[calc(100%-2rem)]
     */
    test: /^(!?)(w|h|min-w|min-h|max-w|max-h)-\[(.+)\]$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const value = match[3].replace(/_/g, ' ');
      const property = prefixMap[prefix];
      return `${property}: ${value}${isImportant ? ' !important' : ''};`;
    }
  }
];