import { generateRegistry, resolveNumericValue } from "../utils.js";

const sideMap = {
  r: ["border-radius"],
  rt: ["border-top-left-radius", "border-top-right-radius"],
  rb: ["border-bottom-left-radius", "border-bottom-right-radius"],
  rl: ["border-top-left-radius", "border-bottom-left-radius"],
  rr: ["border-top-right-radius", "border-bottom-right-radius"],
  rtl: ["border-top-left-radius"],
  rtr: ["border-top-right-radius"],
  rbl: ["border-bottom-left-radius"],
  rbr: ["border-bottom-right-radius"],
};

const semanticValues = {
  none: "0px",
  pill: "9999px",
  circle: "50%",
};

/**
 * 1. Static Rules Generation
 * Uses generateRegistry to create standard and !important versions
 * of semantic utilities (e.g., .r-pill, .!r-circle).
 */
const baseRules = {};
Object.entries(sideMap).forEach(([prefix, properties]) => {
  Object.entries(semanticValues).forEach(([key, value]) => {
    const utilityKey = `${prefix}-${key}`;
    baseRules[utilityKey] = {
      rules: [
        {
          selector: utilityKey,
          declarations: [properties.reduce((acc, prop) => ({ ...acc, [prop]: value }), {})],
        },
      ],
    };
  });
});

export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns
 * Handles fractional percentages (r-1/2 -> 50%) and
 * unitless steps (r-2 -> 0.5rem).
 */
export const patterns = [
  {
    /**
     * Matches: r-1/2, !rt-2, rb-4, !rtr-1/4
     * Group 1: (!?) -> Importance
     * Group 2: (prefix) -> Side mapping
     * Group 3: (value) -> Fraction or Number
     */
    test: /^(!?)(r|rt|rb|rl|rr|rtl|rtr|rbl|rbr)-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const rawValue = match[3];

      const properties = sideMap[prefix];
      let finalValue;

      if (rawValue.includes("/")) {
        // Percentage Fraction: 1/2 -> 50%
        const numericValue = resolveNumericValue(rawValue);
        finalValue = `${Number((numericValue * 100).toFixed(3))}%`;
      } else {
        // Standard Step: 2 -> 0.5rem (Scale of 0.25)
        const numericValue = parseFloat(rawValue);
        finalValue = numericValue === 0 ? "0" : `${Number((numericValue * 0.25).toFixed(3))}rem`;
      }

      return {
        isImportant,
        rules: [
          {
            selector: util.replace(/^!/, ""),
            declarations: [
              properties.reduce((acc, prop) => {
                acc[prop] = finalValue;
                return acc;
              }, {}),
            ],
          },
        ],
      };
    },
  },
];
