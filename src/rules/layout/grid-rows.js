export const patterns = [
  /**
   * Matches: grid-rows-2, grid-rows-none, !grid-rows-subgrid
   */
  {
    test: /^(!?)grid-rows-(\d+|none|subgrid)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const val = match[2];
      
      let result;
      if (val === "none") result = "none";
      else if (val === "subgrid") result = "subgrid";
      else result = `repeat(${val}, minmax(0, 1fr))`;

      return `grid-template-rows: ${result}${isImportant ? " !important" : ""};`;
    }
  }
];