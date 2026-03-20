/**
 * Flex Base Definitions
 * Defines shorthand and atomic flexbox utilities.
 */
const baseRules = {
  // Flex Display + Direction (Combined)
  "flex-row": { display: "flex", "flex-direction": "row" },
  "flex-col": { display: "flex", "flex-direction": "column" },
  "flex-x":   { display: "flex", "flex-direction": "row" },
  "flex-y":   { display: "flex", "flex-direction": "column" },
  
  // Atomic Flex Direction (fd-)
  "fd-row":     { "flex-direction": "row" },
  "fd-col":     { "flex-direction": "column" },
  "fd-row-rev": { "flex-direction": "row-reverse" },
  "fd-col-rev": { "flex-direction": "column-reverse" },

  // Flex Wrap (fw-)
  "fw-wrap":     { "flex-wrap": "wrap" },
  "fw-nowrap":   { "flex-wrap": "nowrap" },
  "fw-wrap-rev": { "flex-wrap": "wrap-reverse" },
};

/**
 * Flex Utility Registry
 * Transforms base definitions into structured standard and important variants.
 */
export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  const baseConfig = {
    identifier: ".",
    rules: [
      {
        selector: key,
        // The properties object is wrapped in an array for the generator
        declarations: [props],
      },
    ],
  };

  // 1. Standard version: .flex-row
  acc[key] = {
    ...baseConfig,
    isImportant: false,
  };

  // 2. Important version: .!flex-row
  acc[`!${key}`] = {
    ...baseConfig,
    isImportant: true,
    rules: baseConfig.rules.map((rule) => ({
      ...rule,
      selector: `!${rule.selector}`,
    })),
  };

  return acc;
}, {});