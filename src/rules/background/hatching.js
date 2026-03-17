import { convertToOklch } from "../../utils/convert-to-oklch.js";
import { colorsList } from "../constants.js";

export const patterns = [
  {
    /**
     * Matches: 
     * hatching-blue
     * !hatching-gray-400/20
     */
    test: new RegExp(`^(!?)hatching-${colorsList}(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const colorValue = convertToOklch({
        color: match[2],
        shade: match[3],
        transparency: match[4],
      });

      const importantTag = isImportant ? " !important" : "";

      /**
       * Implementation Note:
       * Your previous example used 1px for the line and 50% for the gap.
       * Here we use:
       * 1. --su-pattern-w: The thickness of the hatching line (default 1px).
       * 2. --su-pattern-p: The "Period" or total size of the grid tile (default 10px).
       */
      return `
        background-position: 0 0${importantTag};
        background-size: var(--su-pattern-p, 10px) var(--su-pattern-p, 10px)${importantTag};
        background-image: repeating-linear-gradient(
        var(--su-pattern-angle, 135deg),
          ${colorValue} 0,
          ${colorValue} var(--su-pattern-w, 1px),
          transparent 0,
          transparent 50%
        )${importantTag};
      `.replace(/\s+/g, ' ').trim() + ";";
    },
  },
];