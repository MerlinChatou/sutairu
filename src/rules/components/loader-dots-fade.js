export const rules = {
  "loader-dots-fade": {
    rules: [
      {
        selector: "loader-dots-fade",
        declarations: [
          {
            display: "inline-block",
            position: "relative",
            "aspect-ratio": "1/1",
            height: "0.5rem",
            "vertical-align": "text-bottom",
            position: "relative",
            "border-radius": "50%",
            animation: "su-loader-dots-fade 0.75s ease infinite",
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
