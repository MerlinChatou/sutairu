import { iconRegistry } from "./icons.js";
export const rules = {
  icon: {
    rules: [
      {
        // 1. Base Container
        selector: "icon",
        declarations: [
          { display: "inline-flex" },
          { "align-items": "center" },
          { "justify-content": "center" },
          { width: "1em" },
          { height: "auto" },
          { "aspect-ratio": "1 / 1" },
          { "vertical-align": "middle" },
        ],
      },
      {
        // 1. Base Container
        selector: "icon",
        suffix: "::before",
        declarations: [
          { content: '""' },
          { display: "inline-block" },
          { width: "100%" },
          { height: "100%" },
          { "background-color": "currentColor" },
          { "mask-size": "100% 100%" },
          { "mask-repeat": "no-repeat" },
        ],
      },
    ],
  },
};

export const patterns = [
  {
    test: /^(!?)i-([a-z0-9-]+)$/,
    parse: (match) => {
      const [selector, important, iconName] = match;
      const isImportant = important === "!";

      const svgPathData = iconRegistry[iconName];
      if (!svgPathData) return null;

      const viewBox = iconRegistry[`${iconName}_viewBox`] || "0 0 24 24";
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor"><path d="${svgPathData}"/></svg>`;
      const dataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgString)}")`;

      return {
        isImportant,
        rules: [
          {
            // The pseudo-element renders the actual Friconix mask
            selector,
            suffix: "::before",
            declarations: [{ "mask-image": dataUri }],
          },
        ],
      };
    },
  },
];
