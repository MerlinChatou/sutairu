/**
 * Shared structural properties for most badge variants
 */
const badgeBase = [
  { "display": "inline-flex" },
  { "align-items": "center" },
  { "justify-content": "center" },
  { "white-space": "nowrap" },
  { "padding-inline": "0.5rem" },
  { "padding-block": "0.125rem" },
  { "font-size": "0.75rem" },
  { "font-weight": "600" },
  { "line-height": "1" }
];

export const patterns = [
  // 1. Core Badge (.badge)
  {
    test: /^(!?)badge$/,
    parse: (match) => ({
      isImportant: match[1] === "!",
      rules: [{
        selector: match[0],
        declarations: [
          ...badgeBase,
          { "border-radius": "0.25rem" }
        ]
      }]
    })
  },

  // // 2. Pill Badge (.badge-pill)
  // Replace by r-pill
  // {
  //   test: /^(!?)badge-pill$/,
  //   parse: (match) => ({
  //     isImportant: match[1] === "!",
  //     rules: [{
  //       selector: match[0],
  //       declarations: [
  //         ...badgeBase,
  //         { "border-radius": "9999px" }
  //       ]
  //     }]
  //   })
  // },

  // 3. Dot Badge (.badge-dot)
  {
    test: /^(!?)badge-dot$/,
    parse: (match) => ({
      isImportant: match[1] === "!",
      rules: [{
        selector: match[0],
        declarations: [
          { "display": "inline-block" },
          { "width": "0.5rem" },
          { "height": "0.5rem" },
          { "border-radius": "50%" }
        ]
      }]
    })
  },

  // 4. Outline Badge (.badge-outline)
  {
    test: /^(!?)badge-outline$/,
    parse: (match) => ({
      isImportant: match[1] === "!",
      rules: [{
        selector: match[0],
        declarations: [
          ...badgeBase,
          { "border-radius": "0.25rem" },
          { "background-color": "transparent" },
          { "border-width": "1px" },
          { "border-style": "solid" }
        ]
      }]
    })
  }
];