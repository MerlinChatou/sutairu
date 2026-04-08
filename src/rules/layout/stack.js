export const patterns = [
  {
    /**
     * Matches: stack, !stack
     * Use Case: Overlays all children in the center of the container.
     */
    test: /^(!?)(stack)$/,
    parse: (match) => {
      const [util, important] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "display": "grid" },
              { "grid-template-areas": "'stack'" },
              { "align-items": "center" },
              { "justify-items": "center" }
            ]
          },
          {
            // This rule ensures all direct children go to the same "stack" area
            selector: util,
            suffix: " > *",
            declarations: [
              { "grid-area": "stack" }
            ]
          }
        ]
      };
    }
  }
];