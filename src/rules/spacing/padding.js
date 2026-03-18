const basePaddingRules = {
  "p-0":  "padding: 0",
  "pt-0": "padding-top: 0",
  "pr-0": "padding-right: 0",
  "pb-0": "padding-bottom: 0",
  "pl-0": "padding-left: 0",
  "px-0": "padding-inline: 0",
  "py-0": "padding-block: 0",
  "ps-0": "padding-inline-start: 0",
  "pe-0": "padding-inline-end: 0",
};

export const rules = Object.entries(basePaddingRules).reduce((acc, [key, value]) => {
  acc[key] = `${value};`;            // Standard: p-0
  acc[`!${key}`] = `${value} !important;`; // Important: !p-0
  return acc;
}, {});



export const patterns = [
  {
    // Regex breakdown:
    // ^(!?)             -> Group 1: Optional "important" flag
    // (p|pt|pb|pl|pr|px|py|ps|pe) -> Group 2: The prefix
    // -                 -> The separator
    // (\d*\.?\d+)       -> Group 3: The number
    test: /^(!?)(p|pt|pb|pl|pr|px|py|ps|pe)-(\d+)(?:\/(\d+))?$/,
    
    parse: (match) => {
      const isImportant = match[1] === "!";
      const type = match[2];
      const numerator = parseInt(match[3], 10);
      const denominator = match[4] ? parseInt(match[4], 10) : 1;

      // Calculate: (Numerator / Denominator) * 0.25rem
      const valueMultiplier = numerator / denominator;
      const suffix = isImportant ? " !important" : "";
      const finalValue = `${valueMultiplier * 0.25}rem${suffix}`;

      const map = {
        p:  `padding: ${finalValue};`,
        pt: `padding-top: ${finalValue};`,
        pb: `padding-bottom: ${finalValue};`,
        pl: `padding-left: ${finalValue};`,
        pr: `padding-right: ${finalValue};`,
        px: `padding-inline: ${finalValue};`, 
        py: `padding-block: ${finalValue};`,
        ps: `padding-inline-start: ${finalValue};`, 
        pe: `padding-inline-end: ${finalValue};`,
      };

      return map[type];
    },
  },
];