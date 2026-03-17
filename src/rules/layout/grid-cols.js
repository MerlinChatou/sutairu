export const patterns = [
  /**
   * Matches: grid-cols-3, grid-cols-none, !grid-cols-subgrid
   */
  {
    test: /^(!?)grid-cols-(\d+|none|subgrid)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const val = match[2];
      
      let result;
      if (val === "none") result = "none";
      else if (val === "subgrid") result = "subgrid";
      else result = `repeat(${val}, minmax(0, 1fr))`;

      return `grid-template-columns: ${result}${isImportant ? " !important" : ""};`;
    }
  }
];