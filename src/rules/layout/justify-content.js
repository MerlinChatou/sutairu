/**
 * Utility for justify-content.
 * Controls the alignment of items along the main axis.
 * Matches: !jc-start, jc-between, !jc-center
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
     * Regex:
     * ^(!)?         -> Group 1: Optional "!" for inverted importance
     * jc-           -> Prefix (Justify Content)
     * (...)         -> Group 2: Values from the map
     */
    test: new RegExp(`^(!)?jc-(${Object.keys(justifyContentMap).join("|")})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = justifyContentMap[match[2]];
      const importantTag = isImportant ? " !important" : "";

      return `justify-content: ${value}${importantTag};`;
    },
  },
];
