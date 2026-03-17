export const patterns = [
  /**
   * Grid Column Span (gc-span-)
   * Matches: gc-span-2, !gc-span-full, gc-span-12
   */
  {
    test: /^(!?)gc-span-(\d+|full)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const val = match[2];
      const result = val === "full" ? "1 / -1" : `span ${val} / span ${val}`;
      
      return `grid-column: ${result}${isImportant ? " !important" : ""};`;
    }
  },

  /**
   * Grid Row Span (gr-span-)
   * Matches: gr-span-3, !gr-span-full, gr-span-6
   */
  {
    test: /^(!?)gr-span-(\d+|full)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const val = match[2];
      const result = val === "full" ? "1 / -1" : `span ${val} / span ${val}`;
      
      return `grid-row: ${result}${isImportant ? " !important" : ""};`;
    }
  }
];