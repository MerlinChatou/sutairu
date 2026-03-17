const baseFontWeights = {
  "fw-thin": "font-weight: 100",
  "fw-extralight": "font-weight: 200",
  "fw-light": "font-weight: 300",
  "fw-normal": "font-weight: 400",
  "fw-medium": "font-weight: 500",
  "fw-semibold": "font-weight: 600",
  "fw-bold": "font-weight: 700",
  "fw-extrabold": "font-weight: 800",
  "fw-black": "font-weight: 900",
};

export const rules = Object.entries(baseFontWeights).reduce((acc, [key, value]) => {
  acc[key] = `${value};`;
  acc[`!${key}`] = `${value} !important;`;
  return acc;
}, {});

export const patterns = [
  {
    /**
     * Matches: fw-400, !fw-700
     * Regex: ^(!?) -> Optional important flag
     * fw-   -> Selector prefix
     * (\d+) -> Weight number
     */
    test: /^(!?)fw-(\d+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const weight = match[2];
      
      const suffix = isImportant ? " !important" : "";
      return `font-weight: ${weight}${suffix};`;
    },
  },
];