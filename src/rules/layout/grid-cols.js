/**
 * Utility for grid-template-columns.
 * Matches: grid-cols-3, grid-cols-none, !grid-cols-subgrid
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)               -> Group 1: Optional "!"
     * grid-cols-          -> Prefix
     * (\d+|none|subgrid)  -> Group 2: Digit, 'none', or 'subgrid'
     */
    test: /^(!?)grid-cols-(\d+|none|subgrid)$/,
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
                "grid-template-columns": gridValue,
              },
            ],
          },
        ],
      };
    },
  },
];