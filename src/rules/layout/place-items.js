/**
 * Utility for place-items.
 * Places grid/flex items along both the block and inline axes.
 */
const placeItemsMap = {
  start: "start",
  end: "end",
  "flex-start": "flex-start",
  "flex-end": "flex-end",
  "self-start": "self-start",
  "self-end": "self-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)          -> Group 1: Optional importance flag
     * pi-            -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from placeItemsMap
     */
    test: new RegExp(`^(!?)pi-(${Object.keys(placeItemsMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = placeItemsMap[key];
 
      return {
        isImportant,
        rules: [
          {
            /**
             * Selector is the utility string without the leading '!'.
             * This allows the generator to handle escaping (e.g., .\!pi-start).
             */
            selector: util,
            declarations: [
              {
                "place-items": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];