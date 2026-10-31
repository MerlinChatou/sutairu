import { iconRegistry } from "./icons.js";

export const patterns = [
  {
    test: /^(!?)i-([a-z0-9-]+)$/,
    parse: (match) => {
      const [util, important, iconName] = match;
      const isImportant = important === "!";

      const svgPathData = iconRegistry[iconName];
      if (!svgPathData) return null; 

      const viewBox = iconRegistry[`${iconName}_viewBox`] || "0 0 1000 1000";
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor"><path d="${svgPathData}"/></svg>`;
      const dataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgString)}")`;

      return {
        isImportant,
        rules: [
          {
            // Main element acts as the container box (safe for borders & padding)
            selector: util,
            declarations: [
              { "display": "inline-flex" },   
              { "align-items": "center" },
              { "justify-content": "center" }
            ]
          },
          {
            // The pseudo-element renders the actual Friconix mask
            selector: util,
            suffix: "::before",
            declarations: [
              { "content": '""' },
              { "display": "inline-block" },
              { "width": "1em" },
              { "height": "1em" },
              { "vertical-align": "-0.125em" },
              { "background-color": "currentColor" },
              { "mask-image": dataUri },
              { "mask-size": "100% 100%" },
              { "mask-repeat": "no-repeat" }
            ]
          }
        ]
      };
    }
  }
];