/**
 * Fluid Font Size (vmin Edition)
 * Uses the smaller viewport dimension to prevent over-scaling on ultra-wide screens.
 */

export const patterns = [
  {
    test: /^(!?)fs-fluid-([0-9]+(?:\/[0-9]+)?)-([0-9]+(?:\/[0-9]+)?)(rem|px)?$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const unit = match[4] || "rem";

      const processValue = (str) => {
        if (str.includes("/")) {
          const [n, d] = str.split("/").map(Number);
          return n / d;
        }
        return parseFloat(str);
      };

      const base = 16; // Standard base for rem conversion
      let sMin = processValue(match[2]);
      let sMax = processValue(match[3]);
      const importantTag = isImportant ? " !important" : "";

      if (unit === "rem") {
        sMin *= 16;
        sMax *= 16;
      }
      const slope = (sMax - sMin) / (1200 - 360);
      const intercept = sMin - (360 * slope);

      return `font-size: clamp(${sMin}px, ${intercept.toFixed(2)}px + ${(slope*100).toFixed(2)}vmin , ${sMax}px);`;
    },
  },
];


