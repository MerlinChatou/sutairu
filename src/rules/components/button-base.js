/**
 * Utility for Masonry layouts.
 * Uses 'suffix' to prevent escaping the child combinator.
 */

const masonryDecls = {
  container: { position: "relative" },
  item: { position: "absolute" },
};

export const rules = {
  // 1. Standard 'masonry' class
  "btn": {
    rules: [
      {
        selector: "btn",
        declarations: [
          { appearance: "button" },
          { display: "inline-block" },
          { padding: "var(--su-btn-x-padding) var(--su-btn-y-padding)" },
          { "border-radius": "var(--su-btn-radius)" },
          { "border-width": "var(--su-btn-border-width)" },
          { "border-style": "solid" },
          { "box-shadow": "var(--su-btn-shadow)" },
          { "text-decoration": "none" },
          { "vertical-align": "middle" },
          { "text-align": "center" },
          { "user-select": "none" },
          { "transition" : "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out"},
        ],
      },
    ],
  },

  // 2. Important '!masonry' class
  "!btn": {
    isImportant: true,
    rules: [
      {
        selector: "!btn",
        declarations: [
          { appearance: "button" },
          { display: "inline-block" },
          { padding: "var(--su-btn-x-padding) var(--su-btn-y-padding)" },
          { "border-radius": "var(--su-btn-radius)" },
          { "border-width": "var(--su-btn-border-width)" },
          { "border-style": "solid" },
          { "box-shadow": "var(--su-btn-shadow)" },
          { "text-decoration": "none" },
          { "vertical-align": "middle" },
          { "text-align": "center" },
          { "user-select": "none" },
          { "transition" : "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out"},
        ],
      },
    ],
  },
};
