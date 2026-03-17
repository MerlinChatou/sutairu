const baseRules = {
  // Overlap items in the same space
  "stack": { 
    "display": "grid", 
    "grid-template-areas": "'stack'", 
    "align-items": "center", 
    "justify-items": "center" 
  },

  // Horizontal Grid (Auto-columns, one row)
  "grid-x":   { "display": "grid", "grid-auto-flow": "column" },
  "grid-row": { "display": "grid", "grid-auto-flow": "column" },

  // Vertical Grid (Auto-rows, one column)
  "grid-y":   { "display": "grid", "grid-auto-flow": "row" },
  "grid-col": { "display": "grid", "grid-auto-flow": "row" },
};

const buildRuleString = (props, important = false) => {
  const suffix = important ? " !important" : "";
  return Object.entries(props)
    .map(([prop, val]) => `${prop}: ${val}${suffix};`)
    .join(" ");
};

export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  acc[key] = buildRuleString(props, false);
  acc[`!${key}`] = buildRuleString(props, true);
  return acc;
}, {});