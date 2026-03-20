import { spacingUnitPattern } from "../utils.js";

const baseRules = {
  // Line types
  "td-u": { "text-decoration-line": "underline" },
  "td-o": { "text-decoration-line": "overline" },
  "td-l": { "text-decoration-line": "line-through" },
  "td-s": { "text-decoration-line": "line-through" },
  "td-n": { "text-decoration-line": "none" },

  // Styles
  "td-solid": { "text-decoration-style": "solid" },
  "td-double": { "text-decoration-style": "double" },
  "td-dotted": { "text-decoration-style": "dotted" },
  "td-dashed": { "text-decoration-style": "dashed" },
  "td-wavy": { "text-decoration-style": "wavy" },

  // Special utilities
  "td-none": { "text-decoration": "none" },
};

/**
 * Rebuilder logic
 */
const buildRuleString = (props, important = false) => {
  const suffix = important ? " !important" : "";
  return Object.entries(props)
    .map(([prop, val]) => `${prop}: ${val}${suffix};`)
    .join(" ");
};

export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  acc[key] = buildRuleString(props, false);
  acc[`!${key}`] = buildRuleString(props, true);
  return acc;
}, {});

export const patterns = [
  // td-w-2 -> text-decoration-thickness: 2px
  {
    test: /^(!?)td-w-(\d+)(px|em|rem|%)?$/,
    parse: (match) => {
      const unit = match[3] || "px";
      return `text-decoration-thickness: ${match[2]}${unit}${match[1] ? " !important" : ""};`;
    },
  },
/**
   * Text Underline Offset
   * Matches: 
   * td-y-2   -> 2px
   * -td-y-2  -> -2px
   * !-td-y-4 -> -4px !important
   */
  {
    // Regex Breakdown:
    // ^(!?)          -> Group 1: Important flag (!)
    // (-?)           -> Group 2: Negative flag (-)
    // td-y-          -> Prefix
    // (\d+)          -> Group 3: The number
    // ${spacingUnitPattern}? -> Group 4: Optional unit
    test: new RegExp(`^(!?)(-?)td-y-(\\d+)${spacingUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const num = match[3];
      const unit = match[4] || "px";

      const finalValue = isNegative ? `-${num}${unit}` : `${num}${unit}`;

      return `text-underline-offset: ${finalValue}${isImportant ? " !important" : ""};`;
    }
  }
];
