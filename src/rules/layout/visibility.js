const visibilityMap = {
  'v-visible':  'visible',
  'v-hidden':   'hidden',
  'v-collapse': 'collapse',
  'visible':    'visible',
  'invisible':  'hidden',
  'collapse':   'collapse',
};

const keys = Object.keys(visibilityMap).join('|');

export const patterns = [
  {
    /**
     * Matches: v-visible, !v-hidden, v-collapse, visible, !invisible, collapse
     * Regex:
     * ^(!?)        -> Group 1: Important (0 or 1)
     * (${keys})    -> Group 2: The utility class key
     */
    test: new RegExp(`^(!?)(${keys})$`),
    parse: (match) => {
      // match[0] = "!invisible"
      // match[1] = "!" (or "")
      // match[2] = "invisible"
      const [util, important, key] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "visibility": visibilityMap[key] }
            ]
          }
        ]
      };
    },
  },
];