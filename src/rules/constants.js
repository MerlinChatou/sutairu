// A central list of all supported CSS units
//export const unitPattern = "(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)";

// Everything valid for spacing (Margin/Padding)
export const spacingUnitPattern = "(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax|%)";

// Valid for Border Width (Length units only)
export const borderWidthUnitPattern = "(px|rem|em|vw|vh|vmin|vmax|vi|vb|ch|ex|cqw|cqh|cqi|cqb|cqmin|cqmax)";

// Valid for Typography (No percentage for font-size usually, or specific behavior)
export const typoUnitPattern = "(px|rem|em|vw|vh|ch|ex)";

// We keep it strict: em for proportional, px for fixed.
export const letterSpacingUnitPattern = "(em|px|rem)";


export const colorsList = '(yellow|orange|red|pink|purple|blue|cyan|green|white|gray|black|accent|container|page|subtle|body|title)';// Valid for Letter Spacing (Tracking)
