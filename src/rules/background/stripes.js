import { colorsList, convertToOklch } from "../utils.js";

export const patterns = [
  {
    /**
     * Matches:
     * stripes-blue, !stripes-red-500, stripes-green/50, !stripes-primary-200/0.8
     *
     * Group 1: (!?)       -> Importance
     * Group 2: (colors)   -> Base color name
     * Group 3: ([0-9]+)   -> Optional shade (e.g., 500)
     * Group 4: ([0-9.]+)  -> Optional transparency (e.g., 0.5 or 50)
     */
    test: new RegExp(`^(!?)stripes-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const colorName = match[2];
      const shade = match[3];
      const opacity = match[4];

      // Convert inputs to OKLCH color string
      const colorValue = convertToOklch({
        color: colorName,
        shade,
        opacity,
      });

      return {
        isImportant,
        identifier: ".",
        rules: [
          {
            // Selector is passed raw (e.g., "b-green/50")
            // Downstream generator handles escaping the "/" and "!"
            selector: util,
            declarations: [
              {
                "background-image": `repeating-linear-gradient(
                  var(--su-pattern-angle, 135deg),
                  ${colorValue} 0,
                  ${colorValue} var(--su-pattern-w, 10px),
                  transparent calc(var(--su-pattern-w, 10px) + 1px),
                  transparent var(--su-pattern-p, calc(var(--su-pattern-w, 10px) * 2))
                )`,
              },
            ],
          },
        ],
      };
    },
  },
];
