import { generateRegistry, spacingUnitPattern, resolveNumericValue } from "../utils.js";

/**
 * 1. Static Decoration Rules (Unchanged)
 */
const decorationBase = {
  "td-u": { "text-decoration-line": "underline" },
  "td-o": { "text-decoration-line": "overline" },
  "td-l": { "text-decoration-line": "line-through" },
  "td-s": { "text-decoration-line": "line-through" },
  "td-n": { "text-decoration-line": "none" },
  "td-solid":  { "text-decoration-style": "solid" },
  "td-double": { "text-decoration-style": "double" },
  "td-dotted": { "text-decoration-style": "dotted" },
  "td-dashed": { "text-decoration-style": "dashed" },
  "td-wavy":   { "text-decoration-style": "wavy" },
  "td-none":   { "text-decoration": "none" },
};

const baseRules = Object.entries(decorationBase).reduce((acc, [key, decls]) => {
  acc[key] = {
    rules: [{ selector: key, declarations: [decls] }]
  };
  return acc;
}, {});

export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns with Fraction Support
 */
export const patterns = [
  {
    /**
     * Text Decoration Thickness
     * Matches: td-w-2, !td-w-3/2rem, td-w-0.5
     */
    test: new RegExp(`^(!?)td-w-(\\d+(?:\\/\\d+)?|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const rawValue = match[2];
      const unit = match[3] || "px";

      // Resolve fraction (3/2 -> 1.5) or keep decimal
      const numericValue = resolveNumericValue(rawValue);


      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [{ "text-decoration-thickness": `${numericValue}${unit}` }]
        }]
      };
    },
  },
  {
    /**
     * Text Underline Offset
     * Matches: td-y-2, !-td-y-1/4rem, -td-y-1.5
     */
    test: new RegExp(`^(!?)(-?)td-y-(\\d+(?:\\/\\d+)?|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const rawValue = match[3];
      const unit = match[4] || "px";

      const numericValue = resolveNumericValue(rawValue);

      const finalValue = `${isNegative ? "-" : ""}${numericValue}${unit}`;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [{ "text-underline-offset": finalValue }]
        }]
      };
    }
  }
];