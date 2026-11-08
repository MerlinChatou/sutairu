export const patterns = [
  /**
   * Grid Column Span (gc-span-)
   * Matches: gc-span-2, !gc-span-full, gc-span-12
   */
  {
    test: /^(!?)gc-span-(\d+|full)$/,
    parse: (match) => {
      const [util, important, val] = match;
      const value = val === "full" ? "1 / -1" : `span ${val}`;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [{ "grid-column": value }]
          }
        ]
      };
    }
  },

  /**
   * Grid Row Span (gr-span-)
   * Matches: gr-span-3, !gr-span-full, gr-span-6
   */
  {
    test: /^(!?)gr-span-(\d+|full)$/,
    parse: (match) => {
      const [util, important, val] = match;
      const value = val === "full" ? "1 / -1" : `span ${val}`;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [{ "grid-row": value }]
          }
        ]
      };
    }
  }
];