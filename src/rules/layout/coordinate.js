import { spacingUnitPattern } from "../utils.js";

/**
 * The Transform Engine String
 * Injected into every utility that affects the transform stack.
 */
const transformEngine = "transform: translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scale(var(--su-sc, 1));";

const coordAliases = {
  middle: "50%",
  full: "100%",
  auto: "auto",
};

const computeCoordValue = (value, unit, isNegative, isImportant) => {
  const importantTag = isImportant ? " !important" : "";

  if (coordAliases[value]) {
    const aliasVal = coordAliases[value];
    return isNegative 
      ? `calc(${aliasVal} * -1)${importantTag}` 
      : `${aliasVal}${importantTag}`;
  }

  if (value === "0") return `0${importantTag}`;

  if (!unit) {
    const num = parseFloat(value);
    const multiplier = isNegative ? -0.25 : 0.25;
    return `${num * multiplier}rem${importantTag}`;
  }

  const leadingDash = isNegative ? "-" : "";
  return `${leadingDash}${value}${unit}${importantTag}`;
};

/**
 * Builds the declaration block. 
 * If 'middle' is used, it injects the variable update and the transform engine.
 */
const buildRule = (prop, valueStr, unit, isNegative, isImportant) => {
  const val = computeCoordValue(valueStr, unit, isNegative, isImportant);
  const importantTag = isImportant ? " !important" : "";
  let declarations = `${prop}: ${val};`;

  if (valueStr === "middle") {
    // Determine axis and direction for the translation
    const isHorizontal = prop === "left" || prop === "right";
    const axis = isHorizontal ? "x" : "y";
    const sign = (prop === "left" || prop === "top") ? "-" : "";
    
    // 1. Update the specific transform variable
    declarations += ` --su-tr-${axis}: ${sign}50%${importantTag};`;
    
    // 2. Inject the transform property itself (applying !important if needed)
    const injectedEngine = transformEngine.replace(';', `${importantTag};`);
    declarations += ` ${injectedEngine}`;
  }

  return declarations;
};

export const patterns = [
  {
    /**
     * Matches: !top-middle, -left-4, bottom-10px, !inset-0
     * Groups: 1:!, 2:-, 3:prop, 4:value, 5:unit
     */
    test: new RegExp(`^(!)?(-)?(top|right|bottom|left|inset)-([a-z]+|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      return buildRule(match[3], match[4], match[5], match[2] === "-", match[1] === "!");
    },
  },
  {
    /**
     * Matches: !inset-y-middle, inset-y-4
     */
    test: new RegExp(`^(!)?(-)?inset-y-([a-z]+|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const isImp = match[1] === "!";
      const isNeg = match[2] === "-";
      return `${buildRule("top", match[3], match[4], isNeg, isImp)} ${buildRule("bottom", match[3], match[4], isNeg, isImp)}`;
    },
  },
  {
    /**
     * Matches: !inset-x-middle, inset-x-0
     */
    test: new RegExp(`^(!)?(-)?inset-x-([a-z]+|\\d*\\.?\\d+)(${spacingUnitPattern})?$`),
    parse: (match) => {
      const isImp = match[1] === "!";
      const isNeg = match[2] === "-";
      return `${buildRule("left", match[3], match[4], isNeg, isImp)} ${buildRule("right", match[3], match[4], isNeg, isImp)}`;
    },
  },
];