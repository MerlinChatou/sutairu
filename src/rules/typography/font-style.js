export const patterns = [
  {
    /**
     * Matches: italic, !italic, not-italic, !not-italic
     */
    test: /^(!?)(italic|not-italic)$/,
    parse: (match) => {
      const [util, important, key] = match;
      
      // Map 'not-italic' to 'normal' and 'italic' to 'italic'
      const value = key === 'italic' ? 'italic' : 'normal';

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "font-style": value }
            ]
          }
        ]
      };
    }
  }
];