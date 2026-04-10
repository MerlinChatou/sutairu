const justifySelfMap = {
  'auto': 'auto',
  'start': 'start',
  'end': 'end',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch',
};

const keys = Object.keys(justifySelfMap).join('|');

export const patterns = [
  {
    /**
     * Matches: js-start, !js-center, js-stretch
     * justify-self aligns an individual item along the INLINE (horizontal) axis.
     */
    test: new RegExp(`^(!?)js-(${keys})$`),
    parse: (match) => {
      // match[0] = full utility (e.g. "!js-start")
      // match[1] = "!" or ""
      // match[2] = the key (e.g. "start")
      const [util, important, key] = match;

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: util,
            declarations: [
              { "justify-self": justifySelfMap[key] }
            ]
          }
        ]
      };
    },
  },
];