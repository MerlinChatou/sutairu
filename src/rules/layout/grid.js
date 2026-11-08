const baseRules = {
  // Overlap items in the same space

  // Horizontal Grid (Auto-columns, one row)
  "grid-x": { display: "grid", "grid-auto-flow": "column" },
  "grid-row": { display: "grid", "grid-auto-flow": "column" },

  // Vertical Grid (Auto-rows, one column)
  "grid-y": { display: "grid", "grid-auto-flow": "row" },
  "grid-col": { display: "grid", "grid-auto-flow": "row" },
};

const keys = Object.keys(baseRules).join("|");
export const patterns = [
  {
    /**
     * Matches: stack, grid-x, !grid-col, etc.
     */
    test: new RegExp(`^(!?)(${keys})$`),
    parse: (match) => {
      const [util, important, key] = match;
      // Convert the baseRules object properties into the declarations array format
      const declarations = Object.entries(baseRules[key]).map(([prop, value]) => ({
        [prop]: value,
      }));

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: declarations,
          },
        ],
      };
    },
  },
];
