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
  modal: {
    rules: [
      {
        selector: "modal",
        declarations: [
          { position: "fixed" },
          { inset: "0" },
          { "z-index": "var(--su-z-modal)" },
          { display: "none" },
          { "justify-content": "center" },
          { "align-items": "start" },
          { padding: "clamp(0.25rem, 4vw, 3rem)" },
          { margin: "0" },
        ],
      },
      {
        selector: "html",
        suffix: ".modal-open",
        identifier: "",
        declarations: [{ overflow: "hidden" }],
      },
      {
        selector: "body",
        suffix: ".modal-open",
        identifier: "",
        declarations: [{ overflow: "hidden" }],
      },
      {
        selector: "modal",
        suffix: ".centered",
        declarations: [{ "align-items": "center" }],
      },
      {
        selector: "modal",
        suffix: "[open]",
        declarations: [{ display: "flex" }],
      },
      {
        selector: "modal",
        suffix: "::before",
        declarations: [
          { content: '""' },
          { position: "fixed" },
          { inset: "0" },
          { "background-color": "var(--su-modal-backdrop-color)" },
          { opacity: "1" },
          { "backdrop-filter": "blur(0.375rem)" },
          { "pointer-events": "auto" },
        ],
      },
      {
        selector: "modal",
        suffix: ".modal-is-opening .modal-content",
        declarations: [{ animation: "var(--su-modal-animation)" }, { "animation-duration": "var(--su-modal-opening-duration)" }],
      },
      {
        selector: "modal",
        suffix: ".modal-is-switching-in .modal-content",
        declarations: [{ animation: "var(--su-modal-animation)" }, { "animation-duration": "var(--su-modal-opening-duration)" }],
      },
      {
        selector: "modal",
        suffix: ".modal-is-opening::before",
        declarations: [{ animation: "var(--su-modal-backdrop-animation)" }, { "animation-duration": "var(--su-modal-opening-duration)" }],
      },

      {
        selector: "modal",
        suffix: ".modal-is-closing::before",
        declarations: [
          { animation: "var(--su-modal-backdrop-animation)" },
          { "animation-duration": "var(--su-modal-closing-duration)" },
          { "animation-direction": "reverse " },
        ],
      },
      {
        selector: "modal",
        suffix: ".modal-is-closing .modal-content",
        declarations: [
          { animation: "var(--su-modal-animation)" },
          { "animation-duration": "var(--su-modal-closing-duration)" },
          { "animation-direction": "reverse " },
        ],
      },
      {
        selector: "modal",
        suffix: ".modal-is-switching-out .modal-content",
        declarations: [
          { animation: "var(--su-modal-animation)" },
          { "animation-duration": "var(--su-modal-closing-duration)" },
          { "animation-direction": "reverse " },
        ],
      },
      {
        selector: "modal",
        suffix: ".no-animation",
        declarations: [{ "--su-modal-opening-duration": "5ms" }, { "--modal-closing-duration": "5ms" }],
      },
      {
        selector: "modal",
        suffix: ".no-blur::before",
        declarations: [{ "backdrop-filter": "blur(0rem)" }],
      },
    ],
  },

  "modal-content": {
    rules: [
      {
        selector: "modal-content",
        declarations: [
          { position: "relative" },
          { "max-height": "100%" },
          { border: "1px solid var(--b-base-ld, var(--su-modal-border-color))" },
          { "border-radius": "var(--su-modal-border-radius)" },
          { "background-clip": "padding-box" },
          { display: "flex" },
          { "flex-direction": "column" },
          { overflow: "hidden" },
        ],
      },
      {
        selector: "modal-content",
        suffix: " > .header",
        declarations: [
          { "background-color": "var(--su-modal-header-bg-color)" },
          { "border-bottom": "1px solid var(--su-modal-border-color)" },
          { padding: "0.75rem" },
          { display: "flex" },
          { "justify-content": "space-between" },
          { "align-items": "center" },
        ],
      },
      {
        selector: "modal-content",
        suffix: " > .body",
        declarations: [
          { "background-color": "var(--bg-base-ld, var(--su-modal-body-bg-color))" },
          { "border-bottom": "1px solid var(--b-base-ld, var(--su-modal-border-color))" },
          { padding: "1rem" },
          { "overflow-y": "auto" },
        ],
      },
      {
        selector: "modal-content",
        suffix: " > .footer",
        declarations: [{ "background-color": "var(--su-modal-footer-bg-color)" }, { padding: "1rem" }],
      },
    ],
  },
  "modal-scroll": {
    rules: [
      {
        selector: "modal-scroll",
        declarations: [
          { position: "fixed" },
          { inset: "0" },
          { display: "flex" },
          { "justify-content": "center" },
          { "align-items": "start" },
          { "overflow-y": "auto" },
          { padding: "clamp(0.25rem, 4vw, 3rem)" },
        ],
      },
      {
        selector: "modal-scroll",
        suffix: " > .modal-content",
        declarations: [{ "max-height": "initial" }],
      },
      {
        selector: "modal-scroll",
        suffix: " > .modal-content > .body",
        declarations: [{ "overflow-y": "hidden" }],
      },
    ],
  },
  /*
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
    */
};
