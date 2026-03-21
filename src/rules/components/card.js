/**
 * Card Component Utility
 * Handles the container and its internal structural elements (header, body, footer).
 */


export const rules = {
  "card": {
    rules: [
      {
        // 1. Base Container
        selector: "card",
        declarations: [{
          "border-radius": "var(--su-card-border-radius)",
          "border-width": "1px",
          "border-color": "var(--su-card-border-color)",
          "border-style": "solid",
          "box-shadow": "var(--su-card-shadow)",
          "background-color": "var(--su-card-body-bg-color)",
          "overflow": "hidden"
        }]
      },
      {
        // 2. Padding reset when structural children exist
        selector: "card",
        suffix: ":has(> .footer)",
        declarations: [{ "padding": "0" }]
      },
      {
        // 2. Padding reset when structural children exist
        selector: "card",
        suffix: ":has(> .header)",
        declarations: [{ "padding": "0" }]
      },
      {
        // 3. Top-level rounding for first elements
        selector: "card",
        suffix: " > :is(.header, .body, .footer):first-child",
        declarations: [{
          "border-top-left-radius": "var(--su-card-border-radius)",
          "border-top-right-radius": "var(--su-card-border-radius)"
        }]
      },
      {
        // 4. Bottom-level rounding for last elements
        selector: "card",
        suffix: " > :is(.header, .body, .footer):last-child",
        declarations: [{
          "border-bottom-left-radius": "var(--su-card-border-radius)",
          "border-bottom-right-radius": "var(--su-card-border-radius)"
        }]
      },
      {
        // 5. Header Styles
        selector: "card",
        suffix: " > .header",
        declarations: [{
          "padding": "var(--su-card-header-padding)",
          "background-color": "var(--su-card-header-bg-color)"
        }]
      },
      {
        // 6. Header Border (conditional)
        selector: "card",
        suffix: " > .header:not(:last-child):not(img)",
        declarations: [{
          "border-bottom": "1px var(--su-card-header-border-bottom-color) var(--su-card-header-border-bottom-style)"
        }]
      },
      {
        // 7. Image Headers
        selector: "card",
        suffix: " > img.header",
        declarations: [{
          "padding": "0",
          "display": "block",
          "max-width": "100%",
          "border-bottom": "0"
        }]
      },
      {
        // 8. Header Typography
        selector: "card",
        suffix: " > .header > :is(h1, h2, h3, h4, h5, h6)",
        declarations: [{
          "margin": "0",          
        }]
      },
      {
        // 9. Body Styles
        selector: "card",
        suffix: " > .body",
        declarations: [{
          "padding": "var(--su-card-body-padding)",
          "background-color": "var(--su-card-body-bg-color)"
        }]
      },
      {
        // 10. Body Border
        selector: "card",
        suffix: " > .body:not(:last-child)",
        declarations: [{
          "border-bottom": "1px var(--su-card-body-border-bottom-color) var(--su-card-body-border-bottom-style)"
        }]
      },
      {
        // 11. Footer Styles
        selector: "card",
        suffix: " > .footer",
        declarations: [{
          "padding": "var(--su-card-footer-padding)",
          "background-color": "var(--su-card-footer-bg-color)"
        }]
      }
    ]
  }
};