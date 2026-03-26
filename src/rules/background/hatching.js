import { colorsList, convertToOklch } from "../utils.js";

export const patterns = [
  {
    /**
     * Matches:
     * bg-blue, !bg-red-500, bg-green/50, !bg-primary-200/0.8
     *
     * Group 1: (!?)       -> Importance
     * Group 2: (colors)   -> Base color name
     * Group 3: ([0-9]+)   -> Optional shade (e.g., 500)
     * Group 4: ([0-9.]+)  -> Optional transparency (e.g., 0.5 or 50)
     */
    test: new RegExp(`^(!?)hatching-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
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
              { "background-position": "0 0" },
              { "background-size": "var(--su-pattern-p, 10px) var(--su-pattern-p, 10px)" },
              {
                "background-image": `repeating-linear-gradient(
        var(--su-pattern-angle, 135deg),
          ${colorValue} 0,
          ${colorValue} var(--su-pattern-w, 1px),
          transparent 0,
          transparent 50%
        )`,
              },
            ],
          },
        ],
      };
    },
  },
];
/*
import { convertToOklch } from "../utils.js";
import { colorsList } from "../utils.js";

export const patterns = [
  {

    test: new RegExp(`^(!?)hatching-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const colorValue = convertToOklch({
        color: match[2],
        shade: match[3],
        transparency: match[4],
      });

      const importantTag = isImportant ? " !important" : "";


      return (
        `
        background-position: 0 0${importantTag};
        background-size: var(--su-pattern-p, 10px) var(--su-pattern-p, 10px)${importantTag};
        background-image: repeating-linear-gradient(
        var(--su-pattern-angle, 135deg),
          ${colorValue} 0,
          ${colorValue} var(--su-pattern-w, 1px),
          transparent 0,
          transparent 50%
        )${importantTag};
      `
          .replace(/\s+/g, " ")
          .trim() + ";"
      );
    },
  },
];
*/