export const rules = {
  loader: {
    rules: [
      {
        // 1. Base Container
        selector: "loader",
        declarations: [
          {
            display: "block",
            "aspect-ratio": "1/1",
            height: "2rem",
            "border-width": "0.5cqmin",
            "border-style": "solid",
            "border-color": "transparent",
            "border-bottom-color": "var(--su-accent)",
            "border-radius": "50%",
            display: "inline-block",
            "box-sizing": "border-box",
            animation: "su-loader-rotation 1s linear infinite",
          },
        ],
      },
    ],
  },
};
