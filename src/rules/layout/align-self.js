/**
 * Utility for align-self.
 * Allows an individual flex/grid item to override its container's alignment.
 */
const alignSelfMap = {
  auto: "auto",
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
     * as-            -> Prefix
     * (?:key1|key2)  -> Group 2: The value key from alignSelfMap
     */
    test: new RegExp(`^(!?)as-(${Object.keys(alignSelfMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const finalValue = alignSelfMap[key];

      return {
        isImportant,
        rules: [
          {
            // Strip the '!' if present for the selector name
            selector: util.replace(/^!/, ""),
            declarations: [
              {
                "align-self": finalValue,
              },
            ],
          },
        ],
      };
    },
  },
];