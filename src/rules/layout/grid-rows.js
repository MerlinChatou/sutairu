export const patterns = [
  {
    /**
    - Matches:
    -   grid-rows-3                      -> repeat(3, minmax(0, 1fr))
    -   grid-rows-none                   -> none
    -   !grid-rows-subgrid               -> subgrid
    -   grid-rows-[max-content_1fr]      -> max-content 1fr
    -   grid-rows-[200px_minmax(0,1fr)]  -> 200px minmax(0, 1fr)
     */
    test: /^(!?)grid-rows-(\d+|none|subgrid|\[.+\])$/,
    parse: (match) => {
      const [util, important, val] = match;
      const isImportant = important === "!";
      
      let gridValue;

      if (val === "none") {
        gridValue = "none";
      } else if (val === "subgrid") {
        gridValue = "subgrid";
      } else if (val.startsWith("[") && val.endsWith("]")) {
        // Strip the brackets and safely replace internal underscores with spaces
        gridValue = val.slice(1, -1).replace(/_/g, " ");
      } else {
        // Standard explicit numeric behavior
        gridValue = `repeat(${val}, minmax(0, 1fr))`;
      }

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              { "grid-template-rows": gridValue },              
            ]
          }
        ]
      };
    }
  }
];