import { convertToOklch } from "../../utils/convert-to-oklch.js";
import { colorsList } from "../constants.js";

export const patterns = [
  {
    test: new RegExp(`^(!?)stripes-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const colorName = match[2];
      const shade = match[3]; // undefined if missing
      const transparency = match[4]; // undefined if missing
      const importantTag = isImportant ? " !important" : "";
      const colorValue = convertToOklch({
        color: colorName,
        shade,
        transparency,
      });

      return `background-image: repeating-linear-gradient(
        var(--su-pattern-angle, 135deg),
        ${colorValue} 0,
        ${colorValue} var(--su-pattern-w, 10px),
        transparent calc(var(--su-pattern-w, 10px) + 1px),
        transparent var(--su-pattern-p, calc(var(--su-pattern-w, 10px) * 2)),
      )${importantTag};`;
    },
  },
];
