const styles = [
  'auto', 'none', 'dotted', 'dashed', 'solid', 
  'double', 'groove', 'ridge', 'inset', 'outset'
];

export const patterns = [
  {
    /**
     * Matches: ol-solid, !ol-double, ol-inset, etc.
     * Use 'ol-' for outlines or 'b-' for borders.
     */
    test: new RegExp(`^(!?)ol-(${styles.join('|')})$`),
    parse: (match) => {
      const [util, important, style] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "outline-style": style }
            ]
          }
        ]
      };
    }
  }
];