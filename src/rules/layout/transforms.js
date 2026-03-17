/**
 * The Transform Engine String
 * Injected into every utility to ensure composition.
 */
const transformEngine = "transform: translateX(var(--s-tr-x, 0)) translateY(var(--s-tr-y, 0)) rotate(var(--s-rot, 0)) scaleX(calc(var(--s-sc-x, 1) * var(--s-sc, 1))) scaleY(calc(var(--s-sc-y, 1) * var(--s-sc, 1)));";

const buildTransform = (variable, value, isImportant) => {
  const importantTag = isImportant ? " !important" : "";
  const engine = transformEngine.replace(/;/g, `${importantTag};`);
  
  return `
    ${variable}: ${value}${importantTag};
    ${engine}
  `.trim();
};

export const patterns = [
  {
    /**
     * Matches: !mv-x-10, -mv-y-4, mv-x-50%
     * Groups: 1:!, 2:-, 3:axis, 4:value, 5:unit
     */
    test: new RegExp(`^(!)?(-)?mv-(x|y)-(\\d*\\.?\\d+)(px|rem|%|em)?$`),
    parse: (match) => {
      const isNeg = match[2] === "-";
      const value = `${isNeg ? "-" : ""}${match[4]}${match[5] || "px"}`;
      return buildTransform(`--s-tr-${match[3]}`, value, match[1] === "!");
    },
  },
{
    /**
     * Matches: rot-45, !-rot-90, rot-30deg
     * Constraint: Integers only (\d+), no decimals.
     */
    test: /^(!)?(-)?rot-(\d+)(deg)?$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const value = match[3];
      const unit = "deg";
      
      const finalValue = `${isNegative ? "-" : ""}${value}${unit}`;
      return buildTransform("--s-rot", finalValue, isImportant);
    },
  },
  {
/**
     * Regex Breakdown:
     * ^(!?)           -> Group 1: Important flag
     * (-)?            -> Group 2: Negative sign
     * sc-             -> Prefix
     * (?:(x|y)-)?     -> Group 3: Optional x or y axis
     * (\d+)           -> Group 4: The integer value
     */
    test: /^(!?)(-)?sc-(?:(x|y)-)?(\d+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const axis = match[3]; // 'x', 'y', or undefined
      const rawValue = parseInt(match[4], 10);
      
      // Calculate multiplier and handle negative
      const multiplier = (isNegative ? -1 : 1) * (rawValue / 100);

      // Map axis to the correct variable suffix
      // If no axis, target the uniform scale variable
      const variableSuffix = axis ? `-${axis}` : "";
      
      return buildTransform(`--s-sc${variableSuffix}`, multiplier, isImportant);
    },
  },
];