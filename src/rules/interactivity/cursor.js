import { generateRegistry } from "../utils.js";

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

/**
 * 1. Static Rules Generation
 * Uses generateRegistry to create both standard (.cur-pointer)
 * and important (.!cur-pointer) variants in the structured format.
 */
const baseRules = Object.entries(cursorMap).reduce((acc, [key, value]) => {
  const utilityKey = `cur-${key}`;
  acc[utilityKey] = {
    rules: [{
      selector: utilityKey,
      declarations: [{ "cursor": value }]
    }]
  };
  return acc;
}, {});

export const rules = generateRegistry(baseRules);

/**
 * 2. Patterns (if needed for custom cursors)
 * Currently, your map covers the standard set. 
 * If you wanted an escape hatch for custom URLs, we could add a pattern here.
 */
export const patterns = [];