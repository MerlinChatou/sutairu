export const rules = {
  "input-label": {
    rules: [
      {
        /* Base */
        selector: "input-label",
        declarations: [{ display: "inline-block" }, { "margin-top": "0.25rem" }, { "margin-bottom": "0" }],
      },
    ],
  },

  // 1. Standard 'input' class
  input: {
    rules: [
      {
        /* Base */
        selector: "input",
        declarations: [
          { width: "100%" },
          { padding: "0.25rem 0.5rem" },
          { "margin-top": "0.25rem" },
          { "margin-bottom": "0.5rem" },
          { "border-color": "var(--su-input-border-color)" },
          { "border-radius": "var(--su-input-border-radius)" },
          { "border-width": "var(--su-input-border-width)" },
          { "border-style": "solid" },
          { "background-color": "var(--su-input-bg)" },
          { color: "var(--su-input-text)" },

          { outline: "0" },
        ],
      },

      {
        selector: "input",
        suffix: "::placeholder",
        declarations: [{ color: "var(--su-input-placeholder-color)" }],
      },

      /* Focus visible */
      {
        selector: "input",
        suffix: ":focus-visible",
        declarations: [
          {
            "border-color": "var(--su-input-border-focus-visible)",
            "outline-color": "var(--su-input-ol-focus-visible)",
            "outline-width": "var(--su-input-ol-width-focus-visible)",
            "outline-offset": "1px",
            "outline-style": "solid",
            "z-index": "1",
          },
        ],
      },

      /* Disabled */
      {
        selector: "input",
        suffix: ':is(:disabled, [aria-disabled="true"])',
        declarations: [
          {
            "background-color": "var(--su-input-bg-disabled)",
            color: "var(--su-input-text-disabled)",
            cursor: "not-allowed",
          },
        ],
      },
      {
        selector: "input",
        suffix: ':is(:disabled, [aria-disabled="true"])::placeholder',
        declarations: [
          {
            color: "var(--su-input-text-disabled)",
          },
        ],
      },

      /* Drop-down selector */
      {
        prefix: "select",
        selector: "input",
        declarations: [
          {
            padding: "0.375rem 0.5rem",
            "padding-right": "1.5rem",
            "background-image": "var(--su-input-select-image)",
            "background-repeat": "no-repeat",
            "background-position": "right 0.5rem center",
            "background-size": "1rem",
            appearance: "none",
            transition: "background-color 0.15s ease-in-out",
          },
        ],
      },
      {
        prefix: "select",
        selector: "input",
        suffix: ":hover",
        declarations: [
          {
            "background-color": "var(--su-input-select-bg-hover)",
            cursor: "pointer",
          },
        ],
      },

      /* File selector */
      {
        selector: "input",
        suffix: '[type="file"].input',
        declarations: [
          {
            padding: 0,
          },
        ],
      },
      {
        selector: "input",
        suffix: '[type="file"]:not(:disabled, [aria-disabled="true"]):hover',
        declarations: [
          {
            cursor: "pointer",
          },
        ],
      },

      {
        selector: "input",
        suffix: '[type="file"]::file-selector-button',
        declarations: [
          {
            border: "0",
            "border-right-width": "1px",
            "border-right-style": "solid",
            "border-right-color": "inherit",
            "margin-right": "0.5rem",
            padding: "0.375rem 0.5rem",
            "background-color": "var(--su-input-file-bg)",
            color: "var(--su-input-file-text)",
            transition: "background-color 0.15s ease-in-out",
          },
        ],
      },
      {
        selector: "input",
        suffix: '[type="file"]::file-selector-button:hover',
        declarations: [
          {
            "background-color": "var(--su-input-file-bg-hover)",
            cursor: "pointer",
          },
        ],
      },
      {
        selector: "input",
        suffix: '[type="file"]:is(:disabled, [aria-disabled="true"])::file-selector-button',
        declarations: [
          {
            "background-color": "var(--su-input-bg-disabled)",
            color: "var(--su-input-text-disabled)",
            cursor: "not-allowed",
          },
        ],
      },

      /* Valid */
      {
        selector: "input",
        suffix: ".valid",
        declarations: [
          {
            "border-color": "var(--su-input-border-valid)",
          },
        ],
      },

      {
        selector: "input",
        suffix: ".valid:focus-visible",
        declarations: [
          {
            "border-color": "var(--su-input-border-valid-focus-visible)",
            "outline-color": "var(--su-input-ol-valid-focus-visible)",
          },
        ],
      },

      /* Invalid */
      {
        selector: "input",
        suffix: ".invalid",
        declarations: [
          {
            "border-color": "var(--su-red)",
          },
        ],
      },

      {
        selector: "input",
        suffix: ".invalid:focus-visible",
        declarations: [
          {
            "border-color": "var(--su-input-border-invalid-focus-visible)",
            "outline-color": "var(--su-input-ol-invalid-focus-visible)",
          },
        ],
      },
    ],
  },

  // 2. Important '!input' class

};
