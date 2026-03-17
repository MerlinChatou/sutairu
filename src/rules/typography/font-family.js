export const patterns = [
  {
    /**
     * Matches: ff-base, !ff-title, ff-handwritten
     * This pattern captures the variable suffix and maps it to your theme variables.
     */
    test: /^(!?)ff-(.+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const themeKey = match[2]; // e.g., 'base', 'title', 'handwritten'
      const suffix = isImportant ? " !important" : "";

      // We return both properties to ensure the font-size-adjust stays in sync
      return `
        font-family: var(--ff-${themeKey})${suffix};
        font-size-adjust: var(--fs-adjust-${themeKey})${suffix};
      `.trim();
    },
  },
];