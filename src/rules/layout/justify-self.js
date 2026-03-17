/**
 * Utility for justify-self.
 * Matches: !js-start, js-center, !js-stretch
 */

const justifySelfMap = {
  'auto': 'auto',
  'start': 'start',
  'end': 'end',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch',
};

export const patterns = [
  {
    /**
     * Regex:
     * ^(!)?         -> Capture group 1: Optional "!"
     * js-           -> Prefix (Surgical shorthand for justify-self)
     * (...)         -> Capture group 2: The map keys
     */
    test: new RegExp(`^(!)?js-(${Object.keys(justifySelfMap).join('|')})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = justifySelfMap[match[2]];
      const importantTag = isImportant ? " !important" : "";
      
      return `justify-self: ${value}${importantTag};`;
    },
  },
];