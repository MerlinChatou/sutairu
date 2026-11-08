/**
 * Utility for Masonry layouts.
 * Uses 'suffix' to prevent escaping the child combinator.
 */

const masonryDecls = {
  container: { "position": "relative" },
  item:      { "position": "absolute" }
};

export const rules = {
  // 1. Standard 'masonry' class
  "masonry": {
    rules: [
      {
        selector: "masonry",
        declarations: [masonryDecls.container]
      },
      {
        selector: "masonry",
        suffix: " > *",
        declarations: [masonryDecls.item]
      }
    ]
  },

  // 2. Important '!masonry' class
  "!masonry": {
    isImportant: true,
    rules: [
      {
        selector: "!masonry",
        declarations: [masonryDecls.container]
      },
      {
        selector: "!masonry",
        suffix: " > *",
        declarations: [masonryDecls.item]
      }
    ]
  }
};