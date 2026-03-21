/**
 * Utility for Font Family.
 * Maps suffixes to theme-defined CSS variables.
 * Includes font-size-adjust to maintain visual consistency across fallbacks.
 */
export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)    -> Group 1: Optional importance flag
     * ff-      -> Prefix (Font Family)
     * (.+)     -> Group 2: The theme key (e.g., 'base', 'title')
     */
    test: /^(!?)ff-(.+)$/,
    parse: (match) => {
      const util = match[0]; // Full string: "!ff-title"
      const isImportant = match[1] === "!";
      const themeKey = match[2];

      return {
        isImportant,
        rules: [
          {
            /**
             * Selector stores the exact string from HTML.
             * Your generator handles prefixing with '.' and escaping '!'.
             */
            selector: util,
            declarations: [
              {
                "font-family": `var(--su-ff-${themeKey})`,
                "font-size-adjust": `var(--su-fs-adjust-${themeKey})`,
              },
            ],
          },
        ],
      };
    },
  },
];