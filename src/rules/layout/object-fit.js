const objectFitMap = {
  'contain':    'contain',
  'cover':      'cover',
  'fill':       'fill',
  'none':       'none',
  'scale-down': 'scale-down',
};

const keys = Object.keys(objectFitMap).join('|');

export const patterns = [
  {
    /**
     * Matches: of-cover, !object-contain, of-scale-down
     * Regex:
     * ^(!?)             -> Group 1: Important (0 or 1)
     * (?:object|of)-    -> Non-capturing group for prefix
     * (${keys})         -> Group 2: The actual value
     */
    test: new RegExp(`^(!?)(?:object|of)-(${keys})$`),
    parse: (match) => {
      // With the non-capturing group (?:), indices are cleaner:
      // match[0] = "!of-cover"
      // match[1] = "!" (or "")
      // match[2] = "cover"
      const [util, important, key] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "object-fit": objectFitMap[key] }
            ]
          }
        ]
      };
    },
  },
];