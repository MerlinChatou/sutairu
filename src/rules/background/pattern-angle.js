export const patterns = [
  {
    /**
     * Matches: 
     * pa-90              -> 90deg
     * pa-0.5turn         -> 0.5turn
     * !pa-1/4            -> 0.25turn
     * pattern-angle--45  -> -45deg
     */
    test: /^(!?)(?:pattern-angle|pa)-(-?[0-9./]+)(deg|turn|rad|grad)?$/,
    parse: (match) => {
      const [util, important, rawValue, unitMatch] = match;

      const isFraction = rawValue.includes("/");
      let value;
      
      // 1. Resolve Math (Fractions or Decimals)
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        // Ensure we don't divide by zero
        value = den !== 0 ? parseFloat((num / den).toFixed(3)) : 0;
      } else {
        value = parseFloat(rawValue);
      }

      // 2. Determine Unit
      // Priority: 
      // 1. Explicitly provided unit (e.g., 'turn' in '0.5turn')
      // 2. Default for fractions ('turn')
      // 3. Default for integers/decimals ('deg')
      const unit = unitMatch || (isFraction ? "turn" : "deg");

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "--su-pattern-angle": `${value}${unit}` }
            ]
          }
        ]
      };
    },
  },
];