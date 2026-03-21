/**
 * Utility for Pattern Angle.
 * Matches: 
 * - pa-90 (default deg)
 * - pa-1/4 (alias for 1/4turn)
 * - pa-1/4deg (explicit deg)
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)               -> Group 1: Important
     * (-)?                -> Group 2: Negative
     * (hover:)?           -> Group 3: Hover
     * (pattern-angle|pa)- -> Group 4: Flexible prefix
     * ([0-9]+(?:\/[0-9]+)?) -> Group 5: Value/Fraction
     * (deg|turn|rad|grad)? -> Group 6: Units
     */
    test: /^(!?)(-)?(hover:)?(?:pattern-angle|pa)-([0-9]+(?:\/[0-9]+)?)(deg|turn|rad|grad)?$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const rawValue = match[3];
      const hasExplicitUnit = !!match[4];
      const importantTag = isImportant ? " !important" : "";

      let value;
      const isFraction = rawValue.includes("/");

      // 1. Determine the Unit
      // Logic: If it's a fraction and no unit is provided, use 'turn'. Otherwise 'deg'.
      let unit = match[5];
      if (!hasExplicitUnit) {
        unit = isFraction ? "turn" : "deg";
      }

      // 2. Process Math
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        value = parseFloat((num / den).toFixed(3));
        
      } else {
        value = parseFloat(rawValue);
      }

      if (isNegative) value = -value;

      const declaration = `--su-pattern-angle: ${value}${unit}${importantTag};`;


      return declaration;
    },
  },
];