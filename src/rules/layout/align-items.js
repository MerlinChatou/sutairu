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
     * Regex:
     * ^(!)?         -> Group 1: Optional "!" for inverted importance
     * ai-           -> Prefix (Align Items)
     * (...)         -> Group 2: Values from the map
     */
    test: new RegExp(`^(!)?ai-(${Object.keys(alignItemsMap).join("|")})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = alignItemsMap[match[2]];
      const importantTag = isImportant ? " !important" : "";
      
      return `align-items: ${value}${importantTag};`;
    },
  },
];