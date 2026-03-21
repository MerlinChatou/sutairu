/**
 * Utility for Button/Input Groups and Layout Containers.
 * Handles structural merging of borders and radii.
 */

const baseRules = {
  "group":       { "display": "inline-flex", "vertical-align": "middle", "position": "relative", "clip-path": "inset(0% round 0)"},
  "group-row":   { "display": "inline-flex", "flex-direction": "row" },
  "group-col":   { "display": "inline-flex", "flex-direction": "column" },
  "group-fluid": { "display": "flex", "width": "100%" },
  "group-item":  { "position": "relative", "flex": "0 1 auto", "min-width": "0" },
  "group-item-fluid": { "flex": "1 1 auto" }
};

const attachedRules = {
  // Horizontal (Row) logic: Middle, First, and Last items
  ".group-row > .group-item:not(:first-child):not(:last-child), .group:not(.group-col) > .group-item:not(:first-child):not(:last-child)": { "border-radius": "0" },
  ".group-row > .group-item:first-child:not(:last-child), .group:not(.group-col) > .group-item:first-child:not(:last-child)":      { "border-top-right-radius": "0", "border-bottom-right-radius": "0" },
  ".group-row > .group-item:last-child:not(:first-child), .group:not(.group-col) > .group-item:last-child:not(:first-child)":       { "border-top-left-radius": "0", "border-bottom-left-radius": "0" },
  
  // Vertical (Column) logic: Middle, First, and Last items
  ".group-col > .group-item:not(:first-child):not(:last-child)": { "border-radius": "0" },
  ".group-col > .group-item:first-child:not(:last-child)":       { "border-bottom-left-radius": "0", "border-bottom-right-radius": "0" },
  ".group-col > .group-item:last-child:not(:first-child)":        { "border-top-left-radius": "0", "border-top-right-radius": "0" },
  
  // Border overlap logic to maintain consistent 1px thickness
  ".group:not(.group-col) > .group-item + .group-item, .group-row > .group-item + .group-item": { "margin-left": "-1px" },
  ".group-col > .group-item + .group-item": { "margin-top": "-1px", "margin-left": "0" }
};

/**
 * Registry Generation
 */
export const rules = {
  // 1. Standard Classes (with !important support)
  ...Object.entries(baseRules).reduce((acc, [key, decls]) => {
    acc[key] = {
      rules: [{ selector: key, declarations: [decls] }]
    };
    acc[`!${key}`] = {
      isImportant: true,
      rules: [{ selector: `!${key}`, declarations: [decls] }]
    };
    return acc;
  }, {}),

  // 2. Structural descendant selectors (No !important variant needed)
  ...Object.entries(attachedRules).reduce((acc, [selector, decls]) => {
    acc[selector] = {
      rules: [{ selector, declarations: [decls] }]
    };
    return acc;
  }, {})
};