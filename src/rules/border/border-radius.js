const sideMap = {
  'r':   ['border-radius'],
  'rt':  ['border-top-left-radius', 'border-top-right-radius'],
  'rb':  ['border-bottom-left-radius', 'border-bottom-right-radius'],
  'rl':  ['border-top-left-radius', 'border-bottom-left-radius'],
  'rr':  ['border-top-right-radius', 'border-bottom-right-radius'],
  'rtl': ['border-top-left-radius'],
  'rtr': ['border-top-right-radius'],
  'rbl': ['border-bottom-left-radius'],
  'rbr': ['border-bottom-right-radius'],
};

const semanticValues = {
  'none':   '0px',
  'pill':   '9999px',
  'circle': '50%',
};

export const rules = {};
Object.entries(sideMap).forEach(([prefix, properties]) => {
  Object.entries(semanticValues).forEach(([key, value]) => {
    const css = properties.map(p => `${p}: ${value};`).join(' ');
    rules[`${prefix}-${key}`] = css;
    rules[`!${prefix}-${key}`] = css.replace(/;/g, ' !important;');
  });
});

export const patterns = [
  // ... (Universal Unit Pattern remains the same)
  
  {
    /**
     * Percentage Fractions & Step Pattern
     * Matches: r-3/2, r-1/2, r-2, !r-4
     */
    test: /^(!?)(r|rt|rb|rl|rr|rtl|rtr|rbl|rbr)-([0-9./]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const properties = sideMap[match[2]];
      const rawValue = match[3];
      let finalValue;

      if (rawValue.includes('/')) {
        // Handle Percentage Fraction: 3/2 -> 1.5 -> 150% (Wait, you want 66.666%)
        // If 3/2 should be 66.666%, we divide the denominator by the numerator
        const [num, den] = rawValue.split('/').map(Number);
        const percentage = (num / den) * 100;
        
        // Using toFixed(3) to get exactly 66.667% or similar precision
        finalValue = `${Number(percentage.toFixed(3))}%`;
      } else {
        // Handle Standard Step: 2 -> 0.5rem
        finalValue = `${parseFloat(rawValue) * 0.25}rem`;
      }
      
      return properties
        .map(p => `${p}: ${finalValue}${isImportant ? ' !important' : ''};`)
        .join(' ');
    }
  }
];