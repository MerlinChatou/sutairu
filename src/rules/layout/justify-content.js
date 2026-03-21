/**
 * Utility for justify-content.
 * Controls the alignment of items along the main axis.
 */
const justifyContentMap = {
  start: "start",
  end: "end",
  "flex-start": "flex-start",
  "flex-end": "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)          -> Group 1: Optional importance flag
     * jc-            -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from justifyContentMap
     */
    test: new RegExp(`^(!?)jc-(${Object.keys(justifyContentMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = justifyContentMap[key];

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector is passed without the leading '!'
             * Your downstream generator handles escaping and the dot.
             */
            selector: util.replace(/^!/, ""),
            declarations: [
              {
                "justify-content": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];