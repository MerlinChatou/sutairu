import { spacingUnitPattern } from "../constants.js";

/**
 * Utility for Pattern Width (Density).
 * Matches: 
 * - pw-20 (default 20px)
 * - pw-1/2 (alias for 50%)
 * - pw-2rem (explicit unit)
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)               -> Group 1: Important
     * (hover:)?           -> Group 2: Hover
     * (pattern-width|pw)- -> Group 3: Flexible prefix
     * ([0-9]+(?:\/[0-9]+)?) -> Group 4: Value/Fraction
     * ${spacingUnitPattern}? -> Group 5: Optional units from constants
     */
    test: new RegExp(`^(!?)(hover:)?(?:pattern-period|pw)-([0-9]+(?:\\/[0-9]+)?)${spacingUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isHover = match[2] === "hover:";
      const rawValue = match[3];
      const hasExplicitUnit = !!match[4];
      const importantTag = isImportant ? " !important" : "";

      let value;
      const isFraction = rawValue.includes("/");

      // 1. Determine the Unit
      // Logic: If it's a fraction without a unit, default to '%'. 
      // If it's an integer without a unit, default to 'px'.
      let unit = match[4];
      if (!hasExplicitUnit) {
        unit = isFraction ? "%" : "px";
      }

      // 2. Process Math
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        // If the unit is %, we multiply the fraction by 100 (e.g., 1/2 -> 50)
        const multiplier = unit === "%" ? 100 : 1;
        value = parseFloat(((num / den) * multiplier).toFixed(3));
      } else {
        value = parseFloat(rawValue);
      }

      const declaration = `--su-pattern-p: ${value}${unit}${importantTag};`;

      if (isHover) {
        const prefix = match[2] ? "hover:" : "";
        const rawClass = `${match[0].replace(/^!?/, "")}`; // Reconstruct class without important flag
        return `.${prefix}${rawClass.replace(":", "\\:")}:hover { ${declaration} }`;
      }

      return declaration;
    },
  },
];