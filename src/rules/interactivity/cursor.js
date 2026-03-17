/**
 * Maps the 'cur-' prefix to standard CSS cursor values.
 * Includes common cursors used in modern web applications.
 */
const cursorMap = {
  "auto": "auto",
  "default": "default",
  "pointer": "pointer",
  "wait": "wait",
  "text": "text",
  "move": "move",
  "help": "help",
  "not-allowed": "not-allowed",
  "none": "none",
  "context-menu": "context-menu",
  "progress": "progress",
  "cell": "cell",
  "crosshair": "crosshair",
  "vertical-text": "vertical-text",
  "alias": "alias",
  "copy": "copy",
  "no-drop": "no-drop",
  "grab": "grab",
  "grabbing": "grabbing",
  "all-scroll": "all-scroll",
  "col-resize": "col-resize",
  "row-resize": "row-resize",
};

// Generate Static Rules
export const rules = Object.entries(cursorMap).reduce((acc, [key, value]) => {
  // Standard: .cur-pointer
  acc[`cur-${key}`] = `cursor: ${value};`;
  
  // Important: .!cur-pointer
  acc[`!cur-${key}`] = `cursor: ${value} !important;`;
  
  return acc;
}, {});