const transformMap = {
  'upper': 'uppercase',
  'lower': 'lowercase',
  'capitalize': 'capitalize',
  'normal': 'none',
  'none': 'none',
  'full-width': 'full-width',
  'full-size-kana': 'full-size-kana'
};

const keys = Object.keys(transformMap).join('|');

export const patterns = [
  {
    /**
     * Matches: tt-upper, !tt-capitalize, tt-lower
     * Prefix: tt (text-transform)
     */
    test: new RegExp(`^(!?)tt-(${keys})$`),
    parse: (match) => {
      const [util, important, key] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "text-transform": transformMap[key] }
            ]
          }
        ]
      };
    }
  }
];