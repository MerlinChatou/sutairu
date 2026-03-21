import { generateRegistry } from "../utils.js";

/**
 * 1. Static Font Weight Scale
 * Maps logical names to standard CSS weight integers.
 */
const baseFontWeights = {
  "fw-thin": "100",
  "fw-extralight": "200",
  "fw-light": "300",
  "fw-normal": "400",
  "fw-medium": "500",
  "fw-semibold": "600",
  "fw-bold": "700",
  "fw-extrabold": "800",
  "fw-black": "900",
};

const baseRules = Object.entries(baseFontWeights).reduce((acc, [key, value]) => {
  acc[key] = {
    rules: [{
      selector: key, // e.g., "fw-bold"
      declarations: [{ "font-weight": value }]
    }]
  };
  return acc;
}, { });

// generateRegistry creates both standard and !important versions
export const rules = generateRegistry(baseRules);

/**
 * 2. Dynamic Patterns
 */
export const patterns = [
  {
    /**
     * Matches: fw-400, !fw-750, fw-900
     * Allows for custom numeric weights (useful for variable fonts).
     */
    test: /^(!?)fw-(\d+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!fw-700"
      const isImportant = match[1] === "!";
      const weight = match[2];

      return {
        isImportant,
        rules: [{
          selector: util, // Preserving original utility string
          declarations: [{ "font-weight": weight }]
        }]
      };
    },
  },
];