/**
 * Utility for position.
 * Activates stacking context and enables coordinate-based movement.
 * Matches: !pos-abs, pos-rel, !pos-fix
 */

const positionMap = {
  'static': 'static',
  'rel': 'relative',
  'abs': 'absolute',
  'fix': 'fixed',
  'sticky': 'sticky',
};

export const patterns = [
  {
    /**
     * Regex:
     * ^(!)?         -> Group 1: Optional "!" for importance
     * pos-          -> Prefix
     * (...)         -> Group 2: The map keys (rel, abs, etc.)
     */
    test: new RegExp(`^(!)?pos-(${Object.keys(positionMap).join('|')})$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = positionMap[match[2]];
      const importantTag = isImportant ? " !important" : "";
      
      return `position: ${value}${importantTag};`;
    },
  },
];