const baseRules = {
  "m-auto": "margin: auto",
  "mt-auto": "margin-top: auto",
  "mr-auto": "margin-right: auto",
  "mb-auto": "margin-bottom: auto",
  "ml-auto": "margin-left: auto",
  "mx-auto": "margin-inline: auto",
  "my-auto": "margin-block: auto",
  "ms-auto": "margin-inline-start: auto",
  "me-auto": "margin-inline-end: auto",
  "m-0": "margin: 0",
  "mt-0": "margin-top: 0",
  "mr-0": "margin-right: 0",
  "mb-0": "margin-bottom: 0",
  "ml-0": "margin-left: 0",
  "mx-0": "margin-inline: 0",
  "my-0": "margin-block: 0",
  "ms-0": "margin-inline-start: 0",
  "me-0": "margin-inline-end: 0",
};

// Generate a full map that includes ! versions
export const rules = Object.entries(baseRules).reduce((acc, [key, value]) => {
  acc[key] = `${value};`;            // Standard: m-auto
  acc[`!${key}`] = `${value} !important;`; // Important: !m-auto
  return acc;
}, {});



export const patterns = [
  {
    // Regex breakdown:
    // ^(!?)             -> Group 1: Optional "important" flag
    // (-?)              -> Group 2: Optional negative sign
    // (m|mt|mb|ml|mr|mx|my|ms|me) -> Group 3: The prefix
    // -                 -> The separator
    // (\d*\.?\d+)       -> Group 4: The number
    test: /^(!?)(-?)(m|mt|mb|ml|mr|mx|my|ms|me)-(\d*\.?\d+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const type = match[3];
      const rawValue = parseFloat(match[4]);

      // Calculate semantic value (1 = 0.25rem)
      const multiplier = isNegative ? -0.25 : 0.25;
      const finalValue = `${rawValue * multiplier}rem${isImportant ? " !important" : ""}`;

      return getProperties(type, finalValue);
    },
  },
];



// Helper for Property Mapping
const getProperties = (type, value) => {
  const map = {
    m:  `margin: ${value};`,
    mt: `margin-top: ${value};`,
    mb: `margin-bottom: ${value};`,
    ml: `margin-left: ${value};`,
    mr: `margin-right: ${value};`,
    mx: `margin-inline: ${value};`,
    my: `margin-block: ${value};`,
    ms: `margin-inline-start: ${value};`,
    me: `margin-inline-end: ${value};`,
  };
  return map[type];
};