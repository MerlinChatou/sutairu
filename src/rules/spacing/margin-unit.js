import { spacingUnitPattern } from "../constants.js";


const getProperties = (type, value) => {
  const map = {
    m: `margin: ${value};`,
    mt: `margin-top: ${value};`,
    mb: `margin-bottom: ${value};`,
    ml: `margin-left: ${value};`,
    mr: `margin-right: ${value};`,
    mx: `margin-inline: ${value};`,
    my: `margin-block: ${value};`,
    ms: `margin-inline-start: ${value};`,
    me: `margin-inline-end: ${value};`,
  };
  return map[type];
};

export const patterns = [
  {
    /**
     * Matches: !-mx-2.5rem, -mx-2.5rem, !mt-10vh, p-2ch, etc.
     * Note: Group indices shift because of the new (!?) capture.
     */
    test: new RegExp(`^(!?)(-?)(m|mt|mb|ml|mr|mx|my|ms|me)-(\\d*\\.?\\d+)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const type = match[3];
      const num = match[4];
      const unit = match[5]; // spacingUnitPattern provides the next group

      const importantSuffix = isImportant ? " !important" : "";
      const negativePrefix = isNegative ? "-" : "";

      const finalValue = `${negativePrefix}${num}${unit}${importantSuffix}`;

      return getProperties(type, finalValue);
    },
  },
];
