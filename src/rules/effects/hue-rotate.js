/**
 * Utility for Hue Rotation (Integer-only version).
 * Matches: 
 * - hue-rotate-90
 * - -hue-rotate-180deg
 * - hue-rotate-1/2turn
 */

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)               -> Group 1: Important "!"
     * (-)?                -> Group 2: Negative prefix
     * (hover:)?           -> Group 3: Hover prefix
     * hue-rotate-         -> Literal
     * ([0-9]+(?:\/[0-9]+)?) -> Group 4: Integer OR Fraction (e.g., 90 or 1/2)
     * (deg|grad|rad|turn)? -> Group 5: Optional units
     */
    test: /^(!?)(-)?(hover:)?hue-rotate-([0-9]+(?:\/[0-9]+)?)(deg|turn)?$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const isHover = match[3] === "hover:";
      const valueStr = match[4];
      const unit = match[5] || "deg"; 
      const importantTag = isImportant ? " !important" : "";

      // Logic check: Ensure we don't have a decimal point in the class name
      if (valueStr.includes('.')) return null;

      // Handle integer or fraction math
      let finalValue;
      if (valueStr.includes('/')) {
        const [num, den] = valueStr.split('/').map(Number);
        // We do the floating point math internally for the CSS output,
        // but the CLASS remains a clean fraction string.
        finalValue = num / den;
      } else {
        finalValue = parseInt(valueStr, 10);
      }

      if (isNegative) finalValue = -finalValue;

      const cssValue = `hue-rotate(${finalValue}${unit})${importantTag}`;
      
      // Reconstruct the class for the selector
      const classPrefix = isNegative ? "-hue-rotate" : "hue-rotate";
      const rawClassName = `${classPrefix}-${valueStr}${match[5] || ""}`;
      const selector = isHover ? `hover\\:${rawClassName}:hover` : rawClassName;

      return isHover 
        ? `.${selector} { --su-hue-rotate: ${cssValue}; }`
        : `--su-hue-rotate: ${cssValue};`;
    },
  },
];