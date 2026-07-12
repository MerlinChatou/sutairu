export const rules = {
  // 1. Standard 'btn' class
  btn: {
    rules: [
      {
        selector: "btn",
        declarations: [
          { appearance: "button" },
          { display: "inline-flex" },
          { color: "var(--su-body)" },
          { "align-items": "center" },
          { "justify-content": "center" },
          { "line-height": "1" },
          { padding: "var(--su-btn-x-padding) var(--su-btn-y-padding)" },
          { "border-radius": "var(--su-btn-radius)" },
          { "border-width": "var(--su-btn-border-width)" },
          { "border-style": "solid" },
          { "box-shadow": "var(--su-btn-shadow)" },
          { "text-decoration": "none" },
          { "vertical-align": "middle" },
          { "text-align": "center" },
          { "user-select": "none" },
          { transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out" },
        ],
      },
    ],
  },

  // 2. Important '!btn' class
  "!btn": {
    isImportant: true,
    rules: [
      {
        selector: "!btn",
        declarations: [
          { appearance: "button" },
          { display: "inline-flex" },
          { "align-items": "center" },
          { "justify-content": "center" },
          { "line-height": "1" },
          { padding: "var(--su-btn-x-padding) var(--su-btn-y-padding)" },
          { "border-radius": "var(--su-btn-radius)" },
          { "border-width": "var(--su-btn-border-width)" },
          { "border-style": "solid" },
          { "box-shadow": "var(--su-btn-shadow)" },
          { "text-decoration": "none" },
          { "vertical-align": "middle" },
          { "text-align": "center" },
          { "user-select": "none" },
          { transition: "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out" },
        ],
      },
    ],
  },
};
