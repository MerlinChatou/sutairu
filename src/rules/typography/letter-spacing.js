import { letterSpacingUnitPattern, resolveNumericValue, generateRegistry } from "../utils.js";

/**
 * 1. Static Keyword Rules
 * Matches: ls-xs, -ls-sm, !ls-lg
 */
const baseSpacing = {
  "ls-xs": { "letter-spacing": "0.01em" },
  "ls-sm": { "letter-spacing": "0.025em" },
  "ls-md": { "letter-spacing": "0.05em" },
  "ls-lg": { "letter-spacing": "0.1em" },
  "ls-xl": { "letter-spacing": "0.25em" },
};

// Create the registry including negative and important versions
const staticRules = Object.entries(baseSpacing).reduce((acc, [key, decl]) => {
  const value = decl["letter-spacing"];
  
  // Standard entry
  acc[key] = { rules: [{ selector: key, declarations: [decl] }] };
  
  // Negative entry
  const negKey = `-${key}`;
  acc[negKey] = { 
    rules: [{ 
      selector: negKey, 
      declarations: [{ "letter-spacing": `-${value}` }] 
    }] 
  };
  
  return acc;
}, {});

export const rules = generateRegistry(staticRules);

/**
 * 2. Dynamic Patterns
 * Matches: ls-1 (0.01em), -ls-10 (0.1em), !-ls-3/2rem, ls-2px
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional "!"
     * (-?)              -> Group 2: Optional "-"
     * ls-               -> Prefix
     * ([0-9./]+)        -> Group 3: Numeric value (Int, Fraction, Decimal)
     * ${...}?           -> Group 4: Optional Unit pattern
     */
    test: new RegExp(`^(!?)(-?)ls-([0-9./]+)${letterSpacingUnitPattern}?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const rawValue = match[3];
      const unit = match[4];

      // Resolve numeric value (e.g., "3/2" -> 1.5)
      const numeric = resolveNumericValue(rawValue, 3);
      
      let finalValue;

      if (!unit) {
        // Unitless logic: 1 unit = 0.01em
        const calculated = resolveNumericValue(numeric * 0.01, 3);
        finalValue = `${calculated}em`;
      } else {
        // Explicit unit logic: ls-2px -> 2px
        finalValue = `${numeric}${unit}`;
      }

      // Prepend negative sign if applicable
      const cssValue = isNegative ? `-${finalValue}` : finalValue;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "letter-spacing": cssValue,
              },
            ],
          },
        ],
      };
    },
  },
];