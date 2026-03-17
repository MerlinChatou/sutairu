/**
 * Utility for align-content.
 * Controls how rows are distributed in a multi-line container.
 * Matches: !ac-start, ac-between, !ac-stretch
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
     * Regex:
     * ^(!)?         -> Group 1: Optional "!" for importance
     * ac-           -> Prefix (Align Content)
     * (...)         -> Group 2: Values from the map
     */
    test: new RegExp(`^(!)?ac-(${Object.keys(alignContentMap).join("|")})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = alignContentMap[match[2]];
      const importantTag = isImportant ? " !important" : "";
      
      return `align-content: ${value}${importantTag};`;
    },
  },
];