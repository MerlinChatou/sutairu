import { spacingUnitPattern } from "../constants.js";

const getProperties = (type, value) => {
  const map = {
    p:  `padding: ${value};`,
    pt: `padding-top: ${value};`,
    pb: `padding-bottom: ${value};`,
    pl: `padding-left: ${value};`,
    pr: `padding-right: ${value};`,
    px: `padding-inline: ${value};`,
    py: `padding-block: ${value};`,
    ps: `padding-inline-start: ${value};`,
    pe: `padding-inline-end: ${value};`,
  };
  return map[type];
};

export const patterns = [
  {
    /**
     * Matches: !p-20px, p-20px, !pt-10%, etc.
     * Note: Group indices shift because of the new (!?) capture.
     */
    test: new RegExp(`^(!?)(p|pt|pb|pl|pr|px|py|ps|pe)-(\\d*\\.?\\d+)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const type = match[2];
      const num = match[3];
      const unit = match[4]; // spacingUnitPattern usually provides the next group
      
      const suffix = isImportant ? " !important" : "";
      const finalValue = `${num}${unit}${suffix}`;
      
      return getProperties(type, finalValue);
    },
  },
];