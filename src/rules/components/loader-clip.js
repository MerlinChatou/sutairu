export const rules = {
  "loader-clip": {
    rules: [
      {
        selector: "loader-clip",
        declarations: [
          {
            display: "inline-block",
            position: "relative",
            "aspect-ratio": "1/1",
            height: "2em",
            "vertical-align": "text-bottom",
            "border-radius": "50%",
            "border-width": "0.5cqmin",
            "border-color": "transparent",
            "border-style": "solid",
            animation: "su-loader-rotation 1s linear infinite",
          },
        ],
      },
      {
        selector: "loader-clip",
        suffix: "::before",
        declarations: [
          {
            content: '""',
            position: "absolute",
            "box-sizing": "content-box",
            top: "50%",
            left: "50%",
            height: "100%",
            width: "100%",            
            translate: "-50% -50%",
            "border-radius": "50%",            
            "border-width": "inherit",
            "border-style": "solid",
            "border-color": "currentColor",
            animation: "su-loader-clip 2s linear infinite",
          },
        ],
      },
    ],
  },
};
