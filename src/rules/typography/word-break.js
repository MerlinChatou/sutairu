/**
 * Utility for break word
 * Controls how text wraps within an element.
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
     * Regex Breakdown:
     * ^(!?)                                -> Group 1: Important flag
     * wb-                                -> Prefix
     * (wrap|nowrap|balance|pretty|stable)  -> Group 2: Wrap strategy keys
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
