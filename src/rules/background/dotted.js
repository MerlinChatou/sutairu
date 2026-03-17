import { convertToOklch } from "../../utils/convert-to-oklch.js";
import { colorsList } from "../constants.js";

export const patterns = [
  {
    test: new RegExp(`^(!?)dotted-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
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

      return `background-position: 0 0${importantTag};
        background-size: var(--su-pattern-p, 10px) var(--su-pattern-p, 10px)${importantTag};
        background-image: radial-gradient(${colorValue} var(--su-pattern-w, 1px), transparent 0)${importantTag};
      `;
    },
  },
];
