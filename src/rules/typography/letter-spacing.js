import { letterSpacingUnitPattern } from "../constants.js";

/*
| Class | Value | Best Use Case |
| :--- | :--- | :--- |
| **`ls-xs`** | `0.01em` | Micro-tuning for body text. |
| **`ls-sm`** | `0.025em` | Subtle breath for sub-headers. |
| **`ls-md`** | `0.05em` | Standard for small all-caps tags. |
| **`ls-lg`** | `0.1em` | Wide-spaced headings or navigation. |
| **`ls-xl`** | `0.25em` | Highly stylized, airy display text. |
*/

// 1. Static Keyword Rules (Positive Magnitudes)
const baseRules = {
  "ls-xs": { "letter-spacing": "0.01em" },
  "ls-sm": { "letter-spacing": "0.025em" },
  "ls-md": { "letter-spacing": "0.05em" },
  "ls-lg": { "letter-spacing": "0.1em" },
  "ls-xl": { "letter-spacing": "0.25em" },
};

const build = (props, imp) => Object.entries(props)
  .map(([k, v]) => `${k}: ${v}${imp ? " !important" : ""};`).join(" ");

export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  // Positive: ls-sm -> 0.05em
  acc[key] = build(props, false);
  acc[`!${key}`] = build(props, true);
  
  // Negative: -ls-sm -> -0.05em
  const negProps = { "letter-spacing": `-${props["letter-spacing"]}` };
  acc[`-${key}`] = build(negProps, false);
  acc[`!-${key}`] = build(negProps, true);
  
  return acc;
}, {});

// 2. Dynamic Patterns
export const patterns = [
  {
    /**
     * Matches: ls-1px, -ls-10, !-ls-1/2rem
     */
    test: new RegExp(`^(!?)(-?)ls-([0-9]+(?:\\/[0-9]+)?)${letterSpacingUnitPattern}?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const rawValue = match[3];
      const unit = match[4];

      let val;

      // Fraction logic (e.g., 1/2rem)
      if (rawValue.includes("/")) {
        const [num, den] = rawValue.split("/").map(Number);
        val = `${num / den}${unit || "em"}`;
      } 
      // Unitless Step logic (ls-1 -> 0.01em)
      else if (!unit) {
        val = `${parseFloat(rawValue) * 0.01}em`;
      } 
      // Standard Unit logic (ls-2px)
      else {
        val = `${rawValue}${unit}`;
      }

      const finalValue = isNegative ? `-${val}` : val;
      return `letter-spacing: ${finalValue}${isImportant ? " !important" : ""};`;
    }
  }
];