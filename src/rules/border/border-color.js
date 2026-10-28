import { colorsList, convertToOklch } from "../utils.js";


// Map prefix utility keys to their CSS border color properties
const borderColorProps = {
  b:  "border-color",
  bt: "border-top-color",
  bb: "border-bottom-color",
  bl: "border-left-color",
  br: "border-right-color",
  bx: "border-inline-color",
  by: "border-block-color",
  bs: "border-inline-start-color",
  be: "border-inline-end-color",
};

export const patterns = [
  {
    /**
     * Matches:
     * b-blue, !b-red-500, b-green/50, !b-primary-200/0.8
     * 
     * Group 1: (!?)       -> Importance
     * Group 2: (colors)   -> Base color name
     * Group 3: ([0-9]+)   -> Optional shade (e.g., 500)
     * Group 4: ([0-9.]+)  -> Optional transparency (e.g., 0.5 or 50)
     */
    test: new RegExp(`^(!?)(b|bt|bb|bl|br|bx|by|bs|be)-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const prefix = match[2];
      const colorName = match[3];
      const shade = match[4];
      const opacity = match[5];

      // Convert inputs to OKLCH color string
      const colorValue = convertToOklch({
        color: colorName,
        shade,
        opacity,
      });

      const cssProperty = borderColorProps[prefix];

      return {
        isImportant,
        identifier: ".",
        rules: [
          {
            // Selector is passed raw (e.g., "b-green/50")
            // Downstream generator handles escaping the "/" and "!"
            selector: util,
            declarations: [
              { [cssProperty]: colorValue }
            ],
          },
        ],
      };
    },
  },
];