const baseRules = {
  // Flex Display + Direction (Combined)
  "flex-row": { display: "flex", "flex-direction": "row" },
  "flex-col": { display: "flex", "flex-direction": "column" },
  "flex-x": { display: "flex", "flex-direction": "row" },
  "flex-y": { display: "flex", "flex-direction": "column" },
  
  // Atomic Flex Direction (fd-)
  "fd-row": { "flex-direction": "row" },
  "fd-col": { "flex-direction": "column" },
  "fd-row-rev": { "flex-direction": "row-reverse" },
  "fd-col-rev": { "flex-direction": "column-reverse" },

  // Flex Wrap (fw-)
  "fw-wrap": { "flex-wrap": "wrap" },
  "fw-nowrap": { "flex-wrap": "nowrap" },
  "fw-wrap-rev": { "flex-wrap": "wrap-reverse" },
};

/**
 * Helper to transform rule objects into CSS strings
 * @param {Object} props - { display: "flex", ... }
 * @param {Boolean} important - Whether to add !important
 * @returns {String} "display: flex !important; flex-direction: row !important;"
 */

const buildRuleString = (props, important = false) => {
  const suffix = important ? " !important" : "";
  return Object.entries(props)
    .map(([prop, val]) => `${prop}: ${val}${suffix};`)
    .join(" ");
};

// Generate the final flat map
export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  // Standard version: f-row
  acc[key] = buildRuleString(props, false);

  // Important version: !f-row
  acc[`!${key}`] = buildRuleString(props, true);

  return acc;
}, {});
