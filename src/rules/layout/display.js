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

export const rules = Object.entries(displayValues).reduce((acc, [key, value]) => {
  // Standard: .d-flex, .d-block
  acc[`d-${key}`] = `display: ${value};`;
  
  // Important: .!d-flex
  acc[`!d-${key}`] = `display: ${value} !important;`;
  
  return acc;
}, {});