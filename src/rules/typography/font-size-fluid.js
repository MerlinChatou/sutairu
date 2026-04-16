export const patterns = [
  {
    /**
     * Fluid Font Size (vmin Edition)
     * Matches: 
     * fs-fluid-1/2         -> Clamps between 1rem and 2rem
     * !fs-fluid-16-32px    -> Clamps between 16px and 32px (Important)
     * fs-fluid-0.8/1.5     -> Decimal rem support
     */
    test: /^(!?)fs-fluid-([0-9./]+)-([0-9./]+)(rem|px)?$/,
    parse: (match) => {
      const [util, important, minStr, maxStr, unitMatch] = match;
      
      const unit = unitMatch || "rem";
      const isImportant = important === "!";

      // Helper to handle fractions or decimals
      const processValue = (str) => {
        if (str.includes("/")) {
          const [n, d] = str.split("/").map(Number);
          return d !== 0 ? n / d : 0;
        }
        return parseFloat(str);
      };

      // 1. Normalize values to Pixels for the slope calculation
      let sMin = processValue(minStr);
      let sMax = processValue(maxStr);

      if (unit === "rem") {
        sMin *= 16;
        sMax *= 16;
      }

      // 2. Linear Interpolation Logic
      // Viewport range: 360px (mobile) to 1200px (desktop)
      const viewportMin = 360;
      const viewportMax = 1200;

      const slope = (sMax - sMin) / (viewportMax - viewportMin);
      const intercept = sMin - (viewportMin * slope);
      
      // Convert slope to vmin units (100vw/vh equivalent)
      const relativePart = (slope * 100).toFixed(2);
      const constantPart = intercept.toFixed(2);

      // 3. Build the Clamp
      // Format: clamp(min, preferred, max)
      const clampValue = `clamp(${sMin}px, ${constantPart}px + ${relativePart}vmin, ${sMax}px)`;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              { "font-size": clampValue }
            ]
          }
        ]
      };
    },
  },
];