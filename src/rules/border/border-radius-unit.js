import { spacingUnitPattern } from "../utils.js";

const sideMap = {
  r:   ["border-radius"],
  rt:  ["border-top-left-radius", "border-top-right-radius"],
  rb:  ["border-bottom-left-radius", "border-bottom-right-radius"],
  rl:  ["border-top-left-radius", "border-bottom-left-radius"],
  rr:  ["border-top-right-radius", "border-bottom-right-radius"],
  rtl: ["border-top-left-radius"],
  rtr: ["border-top-right-radius"],
  rbl: ["border-bottom-left-radius"],
  rbr: ["border-bottom-right-radius"],
};

export const patterns = [
  {
    /**
     * Matches: r-12, rt-5vh, !rl-20px, r-10%, rbr-4
     */
    test: new RegExp(`^(!?)(r|rt|rb|rl|rr|rtl|rtr|rbl|rbr)-([0-9.]+)(?:(${spacingUnitPattern}))?$`),
    parse: (match) => {
      const [util, important, sideKey, value, unitMatch] = match;

      const properties = sideMap[sideKey];
      const unit = unitMatch || "px"; // Default to px if no unit is provided
      
      const declarations = properties.map((prop) => ({
        [prop]: `${value}${unit}`
      }));

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: declarations
          }
        ]
      };
    },
  },
];