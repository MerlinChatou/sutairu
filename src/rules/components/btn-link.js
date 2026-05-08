export const rules = {
  // 1. Standard 'masonry' class
  "btn-link": {
    rules: [
      {
        selector: "btn-link",
        declarations: [
          {
            color: "var(--su-link-color)",
            "background-color": "transparent",
            "border-color": "transparent",
            "text-decoration": "none",
            transition: "color 0.1s ease",
          },
        ],
      },
      {
        selector: "btn-link",
        suffix: ":hover",
        declarations: [
          {
            color: "var(--su-link-color-hover)",
            "text-decoration": "underline",
            cursor: "pointer",
          },
        ],
      },
      {
        selector: "btn-link",
        suffix: ":focus-visible",
        declarations: [
          {
            outline: "var(--su-btn-link-outline-focus-visible)",
          },
        ],
      },
      {
        selector: "btn-link",
        suffix: ":active",
        declarations: [
          {
            color: "var(--su-link-color-active)",
          },
        ],
      },
      {
        selector: "btn-link",
        suffix: ':is(:disabled, [aria-disabled="true"])',
        declarations: [
          {
            color: "var(--su-link-color-disabled)",
            outline: "0",
          },
        ],
      },
    ],
  },
};
