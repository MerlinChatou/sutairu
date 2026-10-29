export const rules = {
  loader: {
    rules: [
      {
        selector: "loader",
        declarations: [
          {
            display: "inline-block",
            "aspect-ratio": "1/1",
            height: "2rem",
            "vertical-align": "text-bottom",
            "border-width": "0.5cqmin",
            "border-style": "solid",
            "border-color": "transparent",
            "border-bottom-color": "currentColor!important",
            "border-radius": "50%",
            "box-sizing": "border-box",
            animation: "su-loader-rotation 1s linear infinite",
          },
        ],
      },
    ],
  },
};
