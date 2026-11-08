const values = ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'];

export const patterns = [
  {
    /**
     * Matches: resize-none, !resize-vertical, resize-both
     */
    test: new RegExp(`^(!?)resize-(${values.join('|')})$`),
    parse: (match) => {
      const [util, important, value] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "resize": value }
            ]
          }
        ]
      };
    }
  }
];