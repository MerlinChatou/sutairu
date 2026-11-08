/**
 * Utility for align-items.
 * Positions flex/grid items along the cross-axis.
 */
const alignItemsMap = {
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
     * ai-            -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from alignItemsMap
     */
    test: new RegExp(`^(!?)ai-(${Object.keys(alignItemsMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = alignItemsMap[key];
 
      return {
        isImportant,
        rules: [
          {
            /**
             * Selector is the utility string without the leading '!'.
             * This allows the generator to handle escaping (e.g., .\!ai-start).
             */
            selector: util,
            declarations: [
              {
                "align-items": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];