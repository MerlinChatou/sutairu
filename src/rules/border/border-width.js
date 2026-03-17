// src/rules/borders/border-width.js
const getProperties = (type, value) => {
  const map = {
    b:  `border-width: ${value};`,
    bt: `border-top-width: ${value};`,
    bb: `border-bottom-width: ${value};`,
    bl: `border-left-width: ${value};`,
    br: `border-right-width: ${value};`,
    bx: `border-inline-width: ${value};`,
    by: `border-block-width: ${value};`,
  };
  return map[type];
};

export const patterns = [
  {
    // Matches b-1, bt-2, etc.
    test: /^(b|bt|bb|bl|br|bx|by)-(\d+)$/,
    parse: (match) => getProperties(match[1], `${match[2]}px`),
  },
];