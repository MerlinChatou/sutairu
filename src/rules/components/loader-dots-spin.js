export const rules = {
  "loader-dots-spin": {
    rules: [
      {
        selector: "loader-dots-spin",
        declarations: [
          {
            display: "inline-flex",
            "align-items": "center",
            "justify-content": "center",
            width: "2em", // Controls the full box size in page layout
            height: "2em", // Controls the full box size in page layout
            color: "currentColor",
            "font-size": "1rem",
            "vertical-align": "text-bottom",
            position: "relative",
            "animation-duration": "1.3s",
            "border-radius": "0",          
            //"border": "1px dashed red", // Debugging: Visualize the bounding box of the loader
          },
        ],
      },
      {
        selector: "loader-dots-spin",
        suffix: "::after",
        declarations: [
          {
            content: '""',
            width: "0.31em", // Actual visual size of the spinner dot
            height: "0.31em",
            "aspect-ratio": "1/1",
            color: "currentColor",
            "border-radius": "50%",
            animation: "su-loader-dots-spin linear infinite",
            "animation-duration": "inherit",
          },
        ],
      },
    ],
  },
};