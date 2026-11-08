import { resolveNumericValue } from "../utils.js";

const getTransformEngine = () => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

export const patterns = [
  {
    /**
     * Matches: sc-150, !-sc-x-2, sc-3/2, sc-y-0.5
     */
    test: /^(!?)(-?)sc-(?:(x|y)-)?([0-9./]+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const axis = match[3]; 
      const rawValue = match[4];
      
      let multiplier;

      // Logic: If it's a fraction or a decimal, treat it as a direct multiplier.
      // If it's an integer > 10, treat it as a percentage (e.g., 150 -> 1.5).
      if (rawValue.includes('/') || rawValue.includes('.')) {
        multiplier = resolveNumericValue(rawValue, 3);
      } else {
        const intVal = parseInt(rawValue, 10);
        multiplier = intVal > 10 ? intVal / 100 : intVal;
      }
      
      const finalMultiplier = (isNegative ? -1 : 1) * multiplier;
      const variable = `--su-sc${axis ? `-${axis}` : ""}`;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [
            { [variable]: finalMultiplier.toString() }, 
            getTransformEngine()
          ]
        }]
      };
    }
  }
];