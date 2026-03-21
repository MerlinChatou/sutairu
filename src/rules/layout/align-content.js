/**
 * Utility for align-content.
 * Controls how rows are distributed in a multi-line container (flex-wrap: wrap).
 */
const alignContentMap = {
  start: "start",
  end: "end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)          -> Group 1: Optional importance flag
     * ac-            -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from alignContentMap
     */
    test: new RegExp(`^(!?)ac-(${Object.keys(alignContentMap).join("|")})$`),
    parse: (match) => {
      const util = match[0]; // Full string: "!ac-between"
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = alignContentMap[key];

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector stores the exact string from HTML.
             * Your generator handles prefixing with '.' and escaping '!'.
             */
            selector: util,
            declarations: [
              {
                "align-content": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];