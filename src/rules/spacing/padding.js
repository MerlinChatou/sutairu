import { generateRegistry, resolveNumericValue } from "../utils.js";

const baseRules = {
  "p-0": { rules: [{ selector: "p-0", declarations: [{ padding: "0" }] }] },
  "pt-0": { rules: [{ selector: "pt-0", declarations: [{ "padding-top": "0" }] }] },
  "pr-0": { rules: [{ selector: "pr-0", declarations: [{ "padding-right": "0" }] }] },
  "pb-0": { rules: [{ selector: "pb-0", declarations: [{ "padding-bottom": "0" }] }] },
  "pl-0": { rules: [{ selector: "pl-0", declarations: [{ "padding-left": "0" }] }] },
  "px-0": { rules: [{ selector: "px-0", declarations: [{ "padding-inline": "0" }] }] },
  "py-0": { rules: [{ selector: "py-0", declarations: [{ "padding-block": "0" }] }] },
  "ps-0": { rules: [{ selector: "ps-0", declarations: [{ "padding-inline-start": "0" }] }] },
  "pe-0": { rules: [{ selector: "pe-0", declarations: [{ "padding-inline-end": "0" }] }] },
};

// Generate a full map that includes ! versions
export const rules = generateRegistry(baseRules);

export const patterns = [
  {
    // Regex breakdown:
    // ^(!?)             -> Group 1: Optional "important" flag
    // (-?)              -> Group 2: Optional negative sign
    // (m|mt|mb|ml|mr|mx|my|ms|me) -> Group 3: The prefix
    // -                 -> The separator
    // (\d*\.?\d+)       -> Group 4: The number
    test: /^(!?)(p|pt|pb|pl|pr|px|py|ps|pe)-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
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
            selector: util,
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
  p: ["padding"],
  pt: ["padding-top"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  pr: ["padding-right"],
  px: ["padding-inline"],
  py: ["padding-block"],
  ps: ["padding-inline-start"],
  pe: ["padding-inline-end"],
};
