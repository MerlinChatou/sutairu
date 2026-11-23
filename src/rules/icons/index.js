import { iconRegistry } from "./icons.js";

export const rules = {
  icon: {
    rules: [
      {
        // Base container
        selector: "icon",
        declarations: [
          { display: "inline-flex" },
          { "align-items": "center" },
          { "justify-content": "center" },
          { width: "1em" },
          { height: "auto" },
          { "aspect-ratio": "1 / 1" },
          { "vertical-align": "baseline" },
        ],
      },
      {
        // Pseudo-element that draws the mask
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
  "icon-fit": {
    rules: [
      {
        // Crop the container to the icon's bounding box
        selector: "icon-fit",
        declarations: [
          { "box-sizing": "content-box" },
          { width: "calc(var(--icon-w) / 24 * 1em)" },
          { height: "calc(var(--icon-h) / 24 * 1em)" },
          { "aspect-ratio": "auto" },
        ],
      },
      {
        // Shift the full-grid mask so the bbox lands at the box's top-left
        selector: "icon-fit",
        suffix: "::before",
        declarations: [{ flex: "none" }, { "mask-size": "1em 1em" }, { "mask-position": "calc(var(--icon-x) / -24 * 1em) calc(var(--icon-y) / -24 * 1em)" }],
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
      const svgString = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}'><path d='${svgPathData}'/></svg>`;
      // Lighter than encodeURIComponent: only <, > and # must be escaped
      const encoded = svgString.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23");
      const dataUri = `url("data:image/svg+xml,${encoded}")`;

      const iconRules = [
        {
          // The pseudo-element renders the actual mask
          selector,
          suffix: "::before",
          declarations: [{ "mask-image": dataUri }],
        },
      ];

      // Bounding box, only used by `icon-fit` ("x y w h", in 24-grid units)
      const box = iconRegistry[`${iconName}_box`];
      if (box) {
        const [x, y, w, h] = box.split(" ");
        iconRules.push({
          // On the element itself: icon-fit reads these for its own width/height
          selector,
          declarations: [{ "--icon-x": x }, { "--icon-y": y }, { "--icon-w": w }, { "--icon-h": h }],
        });
      }

      return { isImportant, rules: iconRules };
    },
  },
];
