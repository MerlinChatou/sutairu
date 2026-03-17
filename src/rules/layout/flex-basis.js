import { spacingUnitPattern } from "../constants.js";


const baseRules = {
  "fb-auto": { "flex-basis": "auto" },
  "fb-max":  { "flex-basis": "max-content" },
  "fb-min":  { "flex-basis": "min-content" },
  "fb-fit":  { "flex-basis": "fit-content" },
  "fb-content": { "flex-basis": "content" },
  
  // Global values
  "fb-inherit": { "flex-basis": "inherit" },
  "fb-initial": { "flex-basis": "initial" },
  "fb-unset":   { "flex-basis": "unset" },
};

// Rebuild helper for !important support
export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  const build = (p, imp) => Object.entries(p)
    .map(([k, v]) => `${k}: ${v}${imp ? " !important" : ""};`).join(" ");
    
  acc[key] = build(props, false);
  acc[`!${key}`] = build(props, true);
  return acc;
}, {});


/**
 * Utility for Flex Basis.
 * Matches: 
 * - fb-1/2 (50%)
 * - fb-200px (200px)
 * - fb-0 (0px)
 * - !fb-10rem (Important)
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)                 -> Group 1: Important flag
     * basis-                -> Prefix
     * ([0-9]+(?:\/[0-9]+)?) -> Group 2: The value (Supports 100 or 1/2)
     * ${spacingUnitPattern}? -> Group 3: Optional unit from your constants
     */
    test: new RegExp(`^(!?)fb-([0-9]+(?:\\/[0-9]+)?)${spacingUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const rawValue = match[2];
      const unit = match[3];

      let finalValue;

      // Logic for Fractions (e.g., 1/2 -> 50%)
      if (rawValue.includes("/")) {
        const [num, den] = rawValue.split("/").map(Number);
        // We multiply by 100 to get the percentage value
        const percentage = parseFloat(((num / den) * 100).toFixed(3));
        finalValue = `${percentage}%`;
      } 
      // Logic for Integers (e.g., 200 -> 200px)
      else {
        finalValue = unit ? `${rawValue}${unit}` : `${rawValue}px`;
      }

      // If the user just writes "basis-0", we return "0" without px for cleaner CSS
      if (finalValue === "0px") finalValue = "0";

      return `flex-basis: ${finalValue}${isImportant ? " !important" : ""};`;
    },
  },
];