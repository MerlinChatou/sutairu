const baseRules = {
  // The core Badge structure
  "badge": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "white-space": "nowrap",
    "padding-inline": "0.5rem", // Default internal spacing
    "padding-block": "0.125rem",
    "border-radius": "0.25rem",  // Pill shape by default
    "font-size": "0.75rem",     // Small text
    "font-weight": "600",
    "line-height": "1"
  },
  "badge-pill": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "white-space": "nowrap",
    "padding-inline": "0.5rem", // Default internal spacing
    "padding-block": "0.125rem",
    "border-radius": "9999px",  // Pill shape by default
    "font-size": "0.75rem",     // Small text
    "font-weight": "600",
    "line-height": "1"
  },
  // A "Dot" variant (Square/Circle with no text)
  "badge-dot": {
    "display": "inline-block",
    "width": "0.5rem",
    "height": "0.5rem",
    "border-radius": "50%"
  },

  // An "Outline" version (Resetting backgrounds)
  "badge-outline": {
        "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "white-space": "nowrap",
    "padding-inline": "0.5rem", // Default internal spacing
    "padding-block": "0.125rem",
    "border-radius": "0.25rem",  // Pill shape by default
    "font-size": "0.75rem",     // Small text
    "font-weight": "600",
    "line-height": "1",
    "background-color": "transparent",
    "border-width": "1px",
    "border-style": "solid",
  }
};

/**
 * Helper to transform rule objects into CSS strings
 */
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