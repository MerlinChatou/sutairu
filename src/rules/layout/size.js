import { generateRegistry, resolveNumericValue } from "../utils.js";

const semanticValues = {
  auto: "auto",
  full: "100%",
  screen: "100vw",
  "screen-h": "100vh",
  "screen-w": "100vw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
  prose: "65ch",

  0: "0px",
  xs: "20rem",
  sm: "32rem",
  md: "36rem",
  lg: "48rem",
  xl: "64rem",
  "2xl": "72rem",
  "3xl": "80rem",
};

const prefixMap = {
  w: "width",
  h: "height",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
};

/**
 * 1. Static Semantic Rules
 * Generates .w-full, .!max-w-prose, etc.
 */
const baseRules = {};
Object.entries(prefixMap).forEach(([prefix, property]) => {
  Object.entries(semanticValues).forEach(([key, value]) => {
    const utilityKey = `${prefix}-${key}`;
    // Contextual override: w-screen usually means 100vw
    const finalValue = prefix.startsWith("w") && key === "screen" ? "100vw" : value;

    baseRules[utilityKey] = {
      rules: [{
        selector: utilityKey,
        declarations: [{ [property]: finalValue }]
      }]
    };
  });
});

export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns
 */
export const patterns = [
  {
    /**
     * Fractions & Steps
     * Matches: w-1/2, !h-64, max-w-4
     */
    test: /^(!?)(w|h|min-w|min-h|max-w|max-h)-(\d+(?:\/\d+)?|\d*\.?\d+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const rawValue = match[3];
      const property = prefixMap[prefix];

      let finalValue;
      if (rawValue.includes("/")) {
        // Fraction -> Percentage (1/2 = 50%)
        const numericValue = resolveNumericValue(rawValue);
        finalValue = `${Number((numericValue * 100).toFixed(3))}%`;
      } else {
        // Step -> Rem (4 = 1rem)
        const numericValue = parseFloat(rawValue);
        finalValue = numericValue === 0 ? "0" : `${numericValue * 0.25}rem`;
      }

      return {
        isImportant,
        rules: [{
          selector: util.replace(/^!/, ""),
          declarations: [{ [property]: finalValue }]
        }]
      };
    },
  },
  {
    /**
     * Arbitrary Escape Hatch
     * Matches: w-[150px], !max-h-[calc(100vh-2rem)]
     */
    test: /^(!?)(w|h|min-w|min-h|max-w|max-h)-\[(.+)\]$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const arbitraryValue = match[3].replace(/_/g, " ");
      const property = prefixMap[prefix];

      return {
        isImportant,
        rules: [{
          selector: util.replace(/^!/, ""),
          declarations: [{ [property]: arbitraryValue }]
        }]
      };
    },
  },
];