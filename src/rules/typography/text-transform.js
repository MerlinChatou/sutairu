const styles = ['uppercase', 'lowercase', 'capitalize', 'none', 'full-width', 'full-size-kana'];
export const patterns = [
  {
    /**
     * Matches: ol-solid, !ol-double, ol-inset, etc.
     * Use 'ol-' for outlines or 'b-' for borders.
     */
    test: new RegExp(`^(!?)tt-(${styles.join('|')})$`),
    parse: (match) => {
      const [util, important, style] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "text-transform": style }
            ]
          }
        ]
      };
    }
  }
];