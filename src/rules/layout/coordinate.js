import { spacingUnitPattern } from "../utils.js";

const getTransformEngine = () => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

const coordAliases = {
  middle: "50%",
  full: "100%",
  auto: "auto",
};

const getCoordValue = (value, unit, isNegative) => {
  if (coordAliases[value]) {
    const aliasVal = coordAliases[value];
    return isNegative ? `calc(${aliasVal} * -1)` : aliasVal;
  }
  if (value === "0") return "0";
  if (!unit) {
    const num = parseFloat(value);
    return `${num * (isNegative ? -0.25 : 0.25)}rem`;
  }
  return `${isNegative ? "-" : ""}${value}${unit}`;
};

export const patterns = [
  {
    // Matches: !top-middle, -left-4, inset-0, !inset-middle
    test: new RegExp(`^(!?)(-?)(top|right|bottom|left|inset)-([a-z]+|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const [util, isImp, isNeg, prop, rawValue, unit] = [match[0], match[1] === "!", match[2] === "-", match[3], match[4], match[5]];
      
      const val = getCoordValue(rawValue, unit, isNeg);
      const declarations = [{ [prop]: val }];

      if (rawValue === "middle") {
        if (prop === "inset") {
          declarations.push({ "--su-tr-x": "-50%" }, { "--su-tr-y": "-50%" });
        } else {
          const axis = (prop === "left" || prop === "right") ? "x" : "y";
          declarations.push({ [`--su-tr-${axis}`]: "-50%" });
        }
        declarations.push(getTransformEngine());
      }

      return { isImportant: isImp, rules: [{ selector: util, declarations }] };
    },
  },
  {
    // Matches: inset-y-4 (top/bottom shorthand)
    test: new RegExp(`^(!?)(-?)inset-(y|x)-([a-z]+|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const [util, isImp, isNeg, axis, rawValue, unit] = [match[0], match[1] === "!", match[2] === "-", match[3], match[4], match[5]];
      const val = getCoordValue(rawValue, unit, isNeg);
      
      // Map x/y to logical shorthand properties
      const prop = axis === "y" ? "inset-block" : "inset-inline";
      const declarations = [{ [prop]: val }];

      if (rawValue === "middle") {
        declarations.push({ [`--su-tr-${axis}`]: "-50%" }, getTransformEngine());
      }

      return { isImportant: isImp, rules: [{ selector: util, declarations }] };
    }
  }
];