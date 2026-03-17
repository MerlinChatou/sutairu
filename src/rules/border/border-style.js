export const patterns = [
  {
    test: /^b-(solid|dashed|dotted|double|none)$/,
    parse: (match) => `border-style: ${match[1]};`,
  },
];