// 1. Define the static keyword mappings
const baseRules = {
  "opacity-inherit": "opacity: inherit",
  "opacity-initial": "opacity: initial",
  "opacity-revert": "opacity: revert",
  "opacity-unset": "opacity: unset",
};

/**
 * Generate full map for static rules including "!" versions.
 * Result: { "opacity-inherit": "opacity: inherit;", "!opacity-inherit": "opacity: inherit !important;" }
 */
export const rules = Object.entries(baseRules).reduce((acc, [key, value]) => {
  acc[key] = `${value};`;
  acc[`!${key}`] = `${value} !important;`;
  return acc;
}, {});

export const patterns = [
  {
    /**
     * Regex breakdown:
     * ^(!?)       -> Group 1: Optional "!"
     * (hover:)?   -> Group 2: Optional hover prefix
     * opacity-    -> Literal prefix
     * (\d+)       -> Group 3: Integer (0-100)
     */
    test: /^(!?)(hover:)?opacity-(\d+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = parseInt(match[3], 10);

      // Convert integer to decimal (e.g., 50 -> 0.5)
      const decimalValue = Math.min(rawValue / 100, 1);
      const importantTag = isImportant ? " !important" : "";
      
      const declaration = `opacity: ${decimalValue}${importantTag};`;

      if (isHover) {
        // Handle escaped colon for the hover selector
        return `.hover\\:opacity-${rawValue}:hover { ${declaration} }`;
      }

      return declaration;
    },
  },
];