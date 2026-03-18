const baseRules = {
  // 1. The Core Containers
  "group":     { "display": "inline-flex", "vertical-align": "middle", "position": "relative", "clip-path": "inset(0% round 0)"},
  "group-row": { "display": "inline-flex", "flex-direction": "row" },
  "group-col": { "display": "inline-flex", "flex-direction": "column" },
  "group-fluid":   { "display": "flex", "width": "100%" }, // Fluid/Full-width

  // 2. The Item
  "group-item": { "position": "relative", "flex": "0 1 auto", "min-width": "0" },
  "group-item-fluid": { "flex": "1 1 auto" }
};

/**
 * Internal logic for Merged Borders/Radii
 * These don't get '!' variants as they are structural selectors
 */
const attachedRules = {
  // Horizontal (Row) logic
  ".group-row > .group-item:not(:first-child):not(:last-child), .group:not(.group-col) > .group-item:not(:first-child):not(:last-child)": { "border-radius": "0" },
  ".group-row > .group-item:first-child:not(:last-child), .group:not(.group-col) > .group-item:first-child:not(:last-child)":      { "border-top-right-radius": "0", "border-bottom-right-radius": "0" },
  ".group-row > .group-item:last-child:not(:first-child), .group:not(.group-col) > .group-item:last-child:not(:first-child)":       { "border-top-left-radius": "0", "border-bottom-left-radius": "0" },
  
  // Vertical (Column) logic
  ".group-col > .group-item:not(:first-child):not(:last-child)": { "border-radius": "0" },
  ".group-col > .group-item:first-child:not(:last-child)":       { "border-bottom-left-radius": "0", "border-bottom-right-radius": "0" },
  ".group-col > .group-item:last-child:not(:first-child)":        { "border-top-left-radius": "0", "border-top-right-radius": "0" },
  
  // Border overlap to prevent 2px thickness
  ".group:not(.group-col) > .group-item + .group-item, .group-row > .group-item + .group-item": { "margin-left": "-1px" },
  ".group-col > .group-item + .group-item": { "margin-top": "-1px", "margin-left": "0" }
};

const build = (props, imp = false) => {
  const suffix = imp ? " !important" : "";
  return Object.entries(props).map(([k, v]) => `${k}: ${v}${suffix};`).join(" ");
};

export const rules = {
  // Generates group, !group, group-row, !group-row, etc.
  ...Object.entries(baseRules).reduce((acc, [key, props]) => {
    acc[key] = build(props, false);
    acc[`!${key}`] = build(props, true);
    return acc;
  }, {}),
  
  // Internal structural logic
  ...Object.entries(attachedRules).reduce((acc, [sel, props]) => {
    acc[sel] = build(props, false);
    return acc;
  }, {})
};