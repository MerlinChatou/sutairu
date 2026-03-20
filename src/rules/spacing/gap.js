import { generateRegistry, resolveNumericValue } from "../utils.js";

const baseRules = {
  "gap-0": { rules: [{ selector: "gap-0", declarations: [{ gap: "0" }] }] },
  "gap-x-0": { rules: [{ selector: "gap-x-0", declarations: [{ "column-gap": "0" }] }] },
  "gap-y-0": { rules: [{ selector: "gap-y-0", declarations: [{ "row-gap": "0" }] }] },
};

// Generate a full map that includes ! versions
export const rules = generateRegistry(baseRules);

export const patterns = [
  {
    // Regex breakdown:
    // ^(!?)             -> Group 1: Optional "important" flag
    // (gap|gap-x|gap-y) -> Group 2: The prefix
    // -                 -> The separator
    // (\d*\.?\d+)       -> Group 3: The value
    test: /^(!?)(gap|gap-x|gap-y)-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const type = match[2];
      const rawValue = match[3]; // This could be "4", "2/3" or "2.5"

      // Handle Fraction Logic
      let numericValue = resolveNumericValue(rawValue);

      // 2. Calculate rem (1 unit = 0.25rem)
      const value = parseFloat((numericValue * 0.25).toFixed(3));
      const finalValue = `${value}rem`;

      // Get the CSS properties based on the prefix (e.g., 'mt' -> ['margin-top'])
      const props = propertiesLUT[type];
      return {
        // This matches the structure your CSS generator expects
        rules: [
          {
            // We use the utility name (without the leading '!') as the base selector
            // Your generateCSS function handles adding the '.' and the '!' back in
            selector: `${util.replace(/^!/, "")}`,
            declarations: [
              props.reduce((acc, prop) => {
                acc[prop] = finalValue;
                return acc;
              }, {}),
            ],
          },
        ],
        isImportant: isImportant,
      };
    },
  },
];

// Helper for Property Mapping
const propertiesLUT = {
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
};
