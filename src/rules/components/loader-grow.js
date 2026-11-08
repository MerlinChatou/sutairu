export const rules = {
  "loader-grow": {
    rules: [
      {
        selector: "loader-grow",
        declarations: [
          {
            display: "inline-block",
            position: "relative",
            "aspect-ratio": "1/1",
            height: "2em",
            "vertical-align": "text-bottom",
            "border-radius": "50%",
            "border": "0",
            "background-color": "currentColor",
            animation: "su-loader-grow 0.75s ease infinite",
          },
        ],
      },
      
    ],
  },
};
