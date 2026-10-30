export const rules = {
  "loader-dots-fade": {
    rules: [
      {
        selector: "loader-dots-fade",
        declarations: [
          {
            display: "inline-flex",
            "align-items": "center",
            "justify-content": "center",
            width: "2em", // Controls the full box size in page layout
            height: "2em", // Controls the full box size in page layout
            "vertical-align": "text-bottom",
            position: "relative",
            "animation-duration": "0.75s",
            //"border": "1px solid red", // Debugging: Visualize the bounding box of the loader
          },
        ],
      },
      {
        selector: "loader-dots-fade",
        suffix: "::after",
        declarations: [
          {
            content: '""',
            width: "0.31em", // Actual visual size of the spinner
            height: "0.31em",
            "aspect-ratio": "1/1",
            "border-radius": "50%",
            animation: "su-loader-dots-fade ease infinite",
            "animation-duration": "inherit",
            "--spinner-color-100": "oklch(from currentColor l c h / 1)",
            "--spinner-color-70": "oklch(from currentColor l c h / 0.7)",
            "--spinner-color-50": "oklch(from currentColor l c h / 0.5)",
            "--spinner-color-20": "oklch(from currentColor l c h / 0.2)",
          },
        ],
      },
    ],
  },
};