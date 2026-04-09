/**
 * Utility for grid-template-columns.
 * Matches: grid-rows-3, grid-rows-none, !grid-rows-subgrid
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)               -> Group 1: Optional "!"
     * grid-rows-          -> Prefix
     * (\d+|none|subgrid)  -> Group 2: Digit, 'none', or 'subgrid'
     */
    test: /^(!?)grid-rows-(\d+|none|subgrid)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const val = match[2];
      
      let gridValue;

      if (val === "none") {
        gridValue = "none";
      } else if (val === "subgrid") {
        gridValue = "subgrid";
      } else {
        // Standard numeric behavior: grid-cols-3 -> repeat(3, minmax(0, 1fr))
        gridValue = `repeat(${val}, minmax(0, 1fr))`;
      }

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "grid-template-rows": gridValue,
              },
            ],
          },
        ],
      };
    },
  },
];


/*
export const patterns = [
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
*/