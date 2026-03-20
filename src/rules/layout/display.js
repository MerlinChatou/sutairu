/**
 * Display Utility Values
 * Maps shorthand keys to valid CSS display values.
 */
const displayValues = {
  "block": "block",
  "inline-block": "inline-block",
  "inline": "inline",
  "flex": "flex",
  "inline-flex": "inline-flex",
  "grid": "grid",
  "inline-grid": "inline-grid",
  "contents": "contents",
  "list-item": "list-item",
  "none": "none",
  "hidden": "none", // Alias for d-hidden
  "table": "table",
  "flow-root": "flow-root"
};

/**
 * Display Registry
 * Generates both standard (.d-flex) and important (.!d-flex) variants.
 */
export const rules = Object.entries(displayValues).reduce((acc, [key, value]) => {
  const baseKey = `d-${key}`;

  const baseConfig = {
    identifier: ".",
    rules: [
      {
        selector: baseKey, // e.g., "d-flex"
        declarations: [{ display: value }],
      },
    ],
  };

  // 1. Standard version: .d-flex
  acc[baseKey] = {
    ...baseConfig,
    isImportant: false,
  };

  // 2. Important version: .!d-flex
  acc[`!${baseKey}`] = {
    ...baseConfig,
    isImportant: true,
    rules: baseConfig.rules.map((rule) => ({
      ...rule,
      // Prepends ! to the selector for the registry
      selector: `!${rule.selector}`, 
    })),
  };

  return acc;
}, {});