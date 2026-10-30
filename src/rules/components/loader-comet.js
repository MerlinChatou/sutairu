export const rules = {
  "loader-comet": {
    rules: [
      {
        selector: "loader-comet",
        declarations: [
          {
            display: "inline-flex",
            "align-items": "center",
            "justify-content": "center",
            width: "2em",   // Scales with font-size (fs-xl friendly)
            height: "2em",  // Scales with font-size (fs-xl friendly)
            color: "currentColor",
            "font-size": "1rem",
            "vertical-align": "text-bottom",
            position: "relative",
            "animation-duration": "1.7s",
            //"border": "1px dashed red", // Debugging: Visualize the bounding box of the loader
          },
        ],
      },
      {
        selector: "loader-comet",
        suffix: "::after",
        declarations: [
          {
            content: '""',
            width: "0.31em",   // Scales proportionally with the box
            height: "0.31em",
            "aspect-ratio": "1/1",
            "border-radius": "50%",
            animation: "su-loader-comet infinite ease, su-loader-rotation infinite ease",
            "animation-duration": "inherit",
          },
        ],
      },
    ],
  },
};