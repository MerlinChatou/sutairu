import { colorsList, convertToOklch } from "../utils.js";

export const patterns = [
  {
    /**
     * Regex Breakdown:
     * ^(!?)             -> Group 1: Optional "!"
     * btn-close         -> Literal
     * (?:-(${colorsList}))? -> Group 2: Color name (Hyphen moved outside capture)
     * (?:-([0-9]+))?    -> Group 3: Shade
     * (?:\/([0-9.]+))?$ -> Group 4: Opacity/Alpha
     */
    test: new RegExp(`^(!?)btn-close(?:-${colorsList})?(?:-([0-9]+))?(?:\\/([0-9.]+))?$`),

    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const colorName = match[2] ?? "gray";
      const shade = match[3];
      const opacity = match[4];

      // Convert inputs to OKLCH color string
      const colorValue = convertToOklch({
        color: colorName,
        shade,
        opacity,
      });

      return {
        isImportant,
        identifier: ".",
        rules: [
          {
            // Selector is passed raw (e.g., "b-green/50")
            // Downstream generator handles escaping the "/" and "!"
            selector: util,
            declarations: [
              { appearance: "button" },
              { display: "inline-block" },
              { padding: "0.75rem" },
              { "aspect-ratio": "1/1" },
              { "border-radius": "var(--su-btn-radius)" },
              { "border-width": "var(--su-btn-border-width)" },
              { position: "relative" },
              { "background-color": "transparent;" },
              { "border-color": "transparent;" },
              { "--su-btn-close-color": colorValue },
              { outline: "0" },
              { cursor: "pointer" },
            ],
          },
          {
            selector: util,
            suffix: "::before",
            declarations: [
              { position: "absolute" },
              { left: "50%" },
              { top: "50%" },
              { content: '" "' },
              { height: "1.5em" },
              { width: "3px" },              
              { "background-color": "var(--su-btn-close-color)" },
              { transform: "translate(-50%, -50%) rotate(45deg)" },
            ],
          },
          {
            selector: util,
            suffix: "::after",
            declarations: [
              { position: "absolute" },
              { left: "50%" },
              { top: "50%" },
              { content: '" "' },
              { height: "1.5em" },
              { width: "3px" },
              { "background-color": "var(--su-btn-close-color)" },              
              { transform: "translate(-50%, -50%) rotate(-45deg)" },
            ],
          },
          {
            selector: util,
            suffix: ":hover::before",
            declarations: [{ "--su-btn-close-color": `color-mix(${colorValue}, #000 20%)` }],
          },
          {
            selector: util,
            suffix: ":hover::after",
            declarations: [{ "--su-btn-close-color": `color-mix(${colorValue}, #000 20%)` }],
          },
          {
            selector: util,
            suffix: ":focus-visible",
            declarations: [{ outline: `4px solid oklch(from var(--su-btn-close-color) l c h / 30%)` }, { "outline-offset": "1px" }],
          },
        ],
      };
    },
  },
];

/*

  .btn-close:focus-visible {
    --btn-close-focus: oklch(from var(--btn-close) l c h / 30%);
    outline: 4px solid var(--btn-close-focus);
    outline-offset: 1px;
  }




}

*/
