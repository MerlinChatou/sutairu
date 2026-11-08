import { resolveNumericValue } from "../utils.js";

const getTransformEngine = () => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

export const patterns = [
  {
    /**
     * Smart Rotation Logic:
     * - If it's a fraction (1/4) or small decimal (0.25) -> defaults to 'turn'
     * - If it's a whole number (90) -> defaults to 'deg'
     */
    test: /^(!?)(-?)rot-([0-9./]+)(deg|turn)?$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const rawValue = match[3];
      let unit = match[4];

      // Smart Unit Inference
      if (!unit) {
        if (rawValue.includes('/') || (rawValue.includes('.') && parseFloat(rawValue) < 1)) {
          unit = "turn";
        } else {
          unit = "deg";
        }
      }

      const numeric = resolveNumericValue(rawValue, 3);
      const finalValue = `${isNegative ? "-" : ""}${numeric}${unit}`;

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              { "--su-rot": finalValue },
              getTransformEngine()
            ]
          }
        ]
      };
    }
  }
];