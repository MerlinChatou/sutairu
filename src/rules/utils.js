// A central list of all supported CSS units
//export const unitPattern = "(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)";

// Everything valid for spacing (Margin/Padding)
export const spacingUnitPattern = "(px|rem|em|lh|rlh|vw|vh|vmin|vmax|svw|svh|lvw|lvh|dvw|dvh|vi|vb|svi|svb|lvi|lvb|dvi|dvb|ch|ex|cap|ic|cqw|cqh|cqi|cqb|cqmin|cqmax|cm|mm|in|pt|pc|%)";

// Valid for Border Width (Length units only)
export const borderWidthUnitPattern = "(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax)";

// Valid for Typography (No percentage for font-size usually, or specific behavior)
export const typoUnitPattern = "(px|rem|em|vw|vh|ch|ex)";

// We keep it strict: em for proportional, px for fixed.
export const letterSpacingUnitPattern = "(em|px|rem)";

export const colorsList = "(yellow|orange|red|pink|purple|blue|cyan|green|white|gray|black|accent|container|page|subtle|body|title)"; // Valid for Letter Spacing (Tracking)

/**
 * Converts a named theme color into an OKLCH CSS value,
 * optionally adjusting shade intensity and opacity.
 *
 * @param {Object} options - The configuration object.
 * @param {string} options.color - The base color name (corresponds to CSS variable suffix, e.g., 'primary').
 * @param {string|number} [options.shade="500"] - The shade weight. 500 is base; <500 mixes with white; >500 mixes with black.
 * @param {string|number} [options.opacity="100"] - Opacity percentage from 0 to 100.
 *
 * @returns {string} A CSS string using `var()`, `color-mix()`, or `oklch(from ...)` syntax.
 */
export function convertToOklch({ color, shade = "500", opacity = "100" }) {
  // 1. Look up the Hue and Chroma based on the color name
  // 2. Adjust Lightness based on the shade (e.g., 900 is dark, 100 is light)
  // 3. Normalize opacity (convert 0-100 scale to 0-1 if needed)
  if (shade == 500 && opacity == 100) return `var(--su-${color})`;

  const alpha = opacity < 100 ? opacity / 100 : 1;

  if (shade == 500) return `oklch(from var(--su-${color}) l c h / ${alpha})`;

  let ratio = -0.2 * shade + 100;
  let baseColor = `color-mix(in oklch, var(--su-${color}), #fff ${ratio}%)`;

  if (shade > 500) {
    ratio = 0.2 * shade - 100;
    baseColor = `color-mix(in oklch, var(--su-${color}), #000 ${ratio}%)`;
  }

  if (opacity == 100) return `${baseColor}`;

  return `oklch(from ${baseColor} l c h / ${alpha})`;
}

/**
 * Generates a expanded registry of CSS rules, including "important" (!) variants.
 * Transforms a base rules object into a map where each utility has a standard
 * and an overriding version.
 *
 * @param {Object} rulesObj - The base utility definitions (e.g., { "m-auto": {...} })
 * @returns {Object} A registry containing both standard and "!" prefixed utilities.
 */
export const generateRegistry = (rulesObj) => {
  return Object.entries(rulesObj).reduce((acc, [key, config]) => {
    const identifier = config.identifier || ".";

    // 1. Standard version
    acc[key] = {
      ...config,
      isImportant: false,
    };

    // 2. Important version (toggles the flag and updates names/selectors)
    acc[`!${key}`] = {
      ...config,
      isImportant: true,
      rules: config.rules.map((rule) => ({
        ...rule,
        // Updates ".m-auto" to ".!m-auto" so the selector matches the key
        selector: `!${rule.selector}`,
      })),
    };

    return acc;
  }, {});
};

/**
 * Resolves a numeric string (decimal or fraction) into a number.
 * @param {string} value - e.g., "2.5", "2/3", or "4"
 * @returns {number}
 */
export function resolveNumericValue(value) {
  if (value.includes("/")) {
    const [num, den] = value.split("/").map(Number);
    // Return 0 if denominator is 0 to avoid Infinity
    return den === 0 ? 0 : num / den;
  }
  return parseFloat(value);
}
