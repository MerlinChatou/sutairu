/**
 * Utility for word-break
 * Controls how words should break when reaching the edge of a container.
 */

const breakMap = {
  normal: "normal",
  all: "break-all",
  keep: "keep-all",
  word: "break-word",
};

export const patterns = [
  {
/**
     * Matches:
     * - wb-normal, !wb-all, wb-keep, !wb-word
     * 
     * Group 1: (!?)                    -> Important flag
     * Prefix:  wb-                     -> Utility prefix
     * Group 2: (normal|all|keep|word)  -> Word-break strategy keys
     */
    test: new RegExp(`^(!?)wb-(${Object.keys(breakMap).join("|")})$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const key = match[2];
      const value = breakMap[key];

      return {
        isImportant,
        rules: [
          {
            selector: util,
            declarations: [
              {
                "word-break": value,
              },
            ],
          },
        ],
      };
    },
  },
];
