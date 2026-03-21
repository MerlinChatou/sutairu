/**
 * Utility for position.
 * Activates stacking context and enables coordinate-based movement.
 * Matches: !pos-abs, pos-rel, !pos-fix, pos-sticky
 */

const positionMap = {
  'static': 'static',
  'rel':    'relative',
  'abs':    'absolute',
  'fix':    'fixed',
  'sticky': 'sticky',
};

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)         -> Group 1: Optional "!" for importance
     * pos-          -> Prefix
     * (...)         -> Group 2: The map keys (rel, abs, fix, etc.)
     */
    test: new RegExp(`^(!?)pos-(${Object.keys(positionMap).join('|')})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const value = positionMap[key];

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "position": value,
              },
            ],
          },
        ],
      };
    },
  },
];