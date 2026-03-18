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
     * 1: !, 2: -, 3: key (word or digit)
     */
    test: /^(!)?(-)?z-([a-z0-9-]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const key = match[3];
      
      const value = zScale[key] || key;
      const importantTag = isImportant ? " !important" : "";

      // Logic for negative values
            // We can wrap in calc for safety or just prepend the dash for raw numbers.
      const finalValue = isNegative ? `calc(${value} * -1)` : value;

      return `z-index: ${finalValue}${importantTag};`;
    },
  },
];