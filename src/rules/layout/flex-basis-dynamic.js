import { spacingUnitPattern } from "../utils.js";

export const patterns = [
  {
    /**
     * Matches: 
     * fb-1/2, !fb-1/4    -> Fractions (50%, 25%)
     * fb-200, !fb-10rem  -> Numbers & Units
     * fb-0               -> Zero
     */
    test: new RegExp(`^(!?)fb-([0-9./]+)(?:(${spacingUnitPattern}))?$`),
    parse: (match) => {
      const [util, important, rawValue, unitMatch] = match;

      let finalValue;
      const isFraction = rawValue.includes("/");

      // 1. Handle Fractions (fb-1/2 -> 50%)
      if (isFraction) {
        const [num, den] = rawValue.split("/").map(Number);
        const percentage = den !== 0 ? parseFloat(((num / den) * 100).toFixed(3)) : 0;
        finalValue = `${percentage}%`;
      } 
      // 2. Handle Numbers & Units (fb-200 -> 200px)
      else {
        const unit = unitMatch || (rawValue === "0" ? "" : "px");
        finalValue = `${rawValue}${unit}`;
      }

      return {
        isImportant: important === "!",
        rules: [{
          selector: util,
          declarations: [{ "flex-basis": finalValue }]
        }]
      };
    },
  },
];