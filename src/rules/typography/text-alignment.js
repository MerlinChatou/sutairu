/**
 * Utility for text-align.
 * Supports standard and logical properties.
 */
const alignmentMap = {
  left: "left",
  right: "right",
  center: "center",
  justify: "justify",
  // Logical properties (modern standard for RTL/LTR support)
  start: "start",
  end: "end",
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)          -> Group 1: Optional importance flag
     * text-          -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from alignmentMap
     */
    test: new RegExp(`^(!?)text-(${Object.keys(alignmentMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = alignmentMap[key];

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector is passed without the leading '!' 
             * to match your engine's expectation for registry keys.
             */
            selector: util.replace(/^!/, ""),
            declarations: [
              {
                "text-align": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];