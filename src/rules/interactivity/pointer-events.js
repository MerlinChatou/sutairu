const values = ['auto', 'none', 'all', 'visiblePainted', 'visibleFill', 'visibleStroke', 'visible', 'painted', 'fill', 'stroke'];

export const patterns = [
  {
    /**
     * Matches: pe-none, !pe-auto, pe-all
     * Using 'pe-' shorthand for Pointer Events
     */
    test: new RegExp(`^(!?)pe-(${values.join('|')})$`),
    parse: (match) => {
      const [util, important, value] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "pointer-events": value }
            ]
          }
        ]
      };
    }
  }
];