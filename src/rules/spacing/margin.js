import { generateRegistry, resolveNumericValue } from "../utils.js";

const baseRules = {
  "m-auto": { rules: [{ selector: "m-auto", declarations: [{ margin: "auto" }] }] },
  "mt-auto": { rules: [{ selector: "mt-auto", declarations: [{ "margin-top": "auto" }] }] },
  "mr-auto": { rules: [{ selector: "mr-auto", declarations: [{ "margin-right": "auto" }] }] },
  "mb-auto": { rules: [{ selector: "mb-auto", declarations: [{ "margin-bottom": "auto" }] }] },
  "ml-auto": { rules: [{ selector: "ml-auto", declarations: [{ "margin-left": "auto" }] }] },
  "mx-auto": { rules: [{ selector: "mx-auto", declarations: [{ "margin-inline": "auto" }] }] },
  "my-auto": { rules: [{ selector: "my-auto", declarations: [{ "margin-block": "auto" }] }] },
  "ms-auto": { rules: [{ selector: "ms-auto", declarations: [{ "margin-inline-start": "auto" }] }] },
  "me-auto": { rules: [{ selector: "me-auto", declarations: [{ "margin-inline-end": "auto" }] }] },

  "m-0": { rules: [{ selector: "m-0", declarations: [{ margin: "0" }] }] },
  "mt-0": { rules: [{ selector: "mt-0", declarations: [{ "margin-top": "0" }] }] },
  "mr-0": { rules: [{ selector: "mr-0", declarations: [{ "margin-right": "0" }] }] },
  "mb-0": { rules: [{ selector: "mb-0", declarations: [{ "margin-bottom": "0" }] }] },
  "ml-0": { rules: [{ selector: "ml-0", declarations: [{ "margin-left": "0" }] }] },
  "mx-0": { rules: [{ selector: "mx-0", declarations: [{ "margin-inline": "0" }] }] },
  "my-0": { rules: [{ selector: "my-0", declarations: [{ "margin-block": "0" }] }] },
  "ms-0": { rules: [{ selector: "ms-0", declarations: [{ "margin-inline-start": "0" }] }] },
  "me-0": { rules: [{ selector: "me-0", declarations: [{ "margin-inline-end": "0" }] }] },
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
    test: /^(!?)(-?)(m|mt|mb|ml|mr|mx|my|ms|me)-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const type = match[3];
      const rawValue = match[4];

      // Handle Fraction Logic
      let numericValue = resolveNumericValue(rawValue);

      // Calculate rem (1 unit = 0.25rem)
      const multiplier = isNegative ? -0.25 : 0.25;
      const value = parseFloat((numericValue * multiplier).toFixed(3));
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
  m: ["margin"],
  mt: ["margin-top"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  mr: ["margin-right"],
  mx: ["margin-inline"],
  my: ["margin-block"],
  ms: ["margin-inline-start"],
  me: ["margin-inline-end"],
};
