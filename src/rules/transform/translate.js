const getTransformEngine = () => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

export const patterns = [
  {
    /**
     * Matches: 
     * - mv-x-10, !-mv-y-50%, mv-x-2rem
     * - mv-middle, mv-x-middle, mv-y-middle
     * - mv-20px, !-mv-5rem
     */
    test: /^(!?)(-?)mv(?:-(x|y))?-(?:(\d*\.?\d+)(px|rem|%|em)?|(middle))$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNeg = match[2] === "-";
      const axis = match[3];          // 'x', 'y', or undefined (both)
      const num = match[4];           // Numeric value
      const unit = match[5] || "px";  // Unit (defaults to px if numeric)
      const isMiddle = match[6] === "middle";

      // Determine the final CSS value
      const value = isMiddle ? "-50%" : `${isNeg ? "-" : ""}${num}${unit}`;

      // Determine which variables to update
      const declarations = {};
      if (!axis || axis === "x") declarations["--su-tr-x"] = value;
      if (!axis || axis === "y") declarations["--su-tr-y"] = value;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [declarations, getTransformEngine()]
        }]
      };
    }
  }
];