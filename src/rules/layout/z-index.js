const zScale = {
  'behind': '-1',
  'base': '0',
  'raised': '10',
  'dropdown': '100',
  'sticky': '200',
  'overlay': '300',
  'modal': '1000',
  'popover': '2000',
  'tooltip': '3000',
  'toast': '4000',
  'auto': 'auto',
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