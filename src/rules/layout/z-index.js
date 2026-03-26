const zScale = {
  'behind': 'var(--su-z-behind)',
  'base': 'var(--su-z-base)',
  'raised': 'var(--su-z-raised)',
  'dropdown': 'var(--su-z-dropdown)',
  'sticky': 'var(--su-z-sticky)',
  'overlay': 'var(--su-z-overlay)',
  'modal': 'var(--su-z-modal)',
  'popover': 'var(--su-z-popover)',
  'tooltip': 'var(--su-z-tooltip)',
  'toast': 'var(--su-z-toast)',
  'auto': 'var(--su-z-auto)',
};

export const patterns = [
  {
    /**
     * Matches: !z-modal, !-z-50, z-10, !z-auto
     * Group 1: Optional "!"
     * Group 2: Optional "-"
     * Group 3: key (word or digit)
     */
    test: /^(!?)(-)?z-([a-z0-9-]+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const key = match[3];
      
      const value = zScale[key] || key;

      // Logic for negative values
      const finalValue = isNegative ? `calc(${value} * -1)` : value;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "z-index": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];