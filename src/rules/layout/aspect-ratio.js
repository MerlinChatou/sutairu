export const rules = {
  "ar-square": "aspect-ratio: 1 / 1;",
  "ar-video":  "aspect-ratio: 16 / 9;",
  "ar-cinema": "aspect-ratio: 21 / 9;",
  "ar-auto": "aspect-ratio: auto;",
};

export const patterns = [
  {
    /**
     * Matches: 
     * ar-2       => aspect-ratio: 2;
     * ar-2/3     => aspect-ratio: 2/3;
     * !ar-16/10  => aspect-ratio: 16/10 !important;
     */
    test: /^(!?)ar-([0-9./]+)$/,
    parse: (match) => {
      const isImportant = match[1] === "!";
      const value = match[2];
      
      // We don't need to replace anything, just return the value
      return `aspect-ratio: ${value}${isImportant ? ' !important' : ''};`;
    }
  }
];