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
     * Regex:
     * ^(!)?         -> Group 1: Optional "!" for inverted importance
     * as-           -> Prefix (Align Self)
     * (...)         -> Group 2: Values from the map
     */
    test: new RegExp(`^(!)?as-(${Object.keys(alignSelfMap).join("|")})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = alignSelfMap[match[2]];
      const importantTag = isImportant ? " !important" : "";
      
      return `align-self: ${value}${importantTag};`;
    },
  },
];
