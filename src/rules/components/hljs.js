/**
 * Pattern to style any code block with a language- class.
 * Matches: .language-js, .language-html, .language-css, etc.
 * Full list at https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
 */
export const patterns = [
  {
    // Regex matches "language-" followed by any word characters
    test: /^language-([\w-]+)$/,
    parse: (match) => {
      const selector = match[0]; // e.g., "language-js"

      return {
        rules: [
          {
            selector: `hljs`,
            declarations: [{ color: "var(--hljs-text-l)" }, { border: "3px solid var(--hljs-bg)" }, { "background-color": "var(--hljs-bg)" }],
          },
          {
            selector: `hljs`,
            suffix: "::selection",
            declarations: [{ "background-color": "var(--hljs-selection)" }],
          },
          {
            // Comments, Invisibles, Line Highlighting
            selector: `hljs-comment`,
            declarations: [{ color: "var(--hljs-comment)" }, { "font-style": "italic" }],
          },
          {
            // Purposely do not highlight these things
            selector: `hljs-formula`,
            declarations: [{ color: "var(--hljs-formula)" }],
          },
          {
            // Purposely do not highlight these things
            selector: `hljs-params`,
            declarations: [{ color: "var(--hljs-params)" }],
          },
          {
            // Purposely do not highlight these things
            selector: `hljs-property`,
            declarations: [{ color: "inherit" }],
          },
          {
            // Dark Foreground (Used for status bars)
            selector: `hljs-tag`,
            declarations: [{ color: "var(--hljs-tag)" }],
          },
          {
            selector: `hljs-bullet`,
            declarations: [{ color: "var(--hljs-bullet)" }],
          },
          {
            selector: `hljs-variable`,
            declarations: [{ color: "var(--hljs-variable)" }],
          },
          {
            selector: `hljs-template-variable`,
            declarations: [{ color: "var(--hljs-template-variable)" }],
          },
          {
            selector: `hljs-selector-tag`,
            declarations: [{ color: "var(--hljs-selector-tag)" }],
          },
          {
            selector: `hljs-deletion`,
            declarations: [{ color: "var(--hljs-deletion)" }],
          },
          {
            selector: `hljs-name`,
            declarations: [{ color: "var(--hljs-name)" }],
          },
          {
            selector: `hljs-title`,
            declarations: [{ color: "var(--hljs-title)" }],
          },
          {
            selector: `hljs-attribute`,
            declarations: [{ color: "var(--hljs-attribute)" }],
          },
          {
            selector: `hljs-attr`,
            declarations: [{ color: "var(--hljs-attr)" }],
          },
          {
            selector: `hljs-symbol`,
            declarations: [{ color: "var(--hljs-symbol)" }],
          },
          {
            selector: `hljs-number`,
            declarations: [{ color: "var(--hljs-number)" }],
          },
          {
            selector: `hljs-link`,
            declarations: [{ color: "var(--hljs-link)" }],
          },
          {
            selector: `hljs-literal`,
            declarations: [{ color: "var(--hljs-literal)" }],
          },
          {
            selector: `hljs-keyword`,
            declarations: [{ color: "var(--hljs-keyword)" }],
          },
          {
            selector: `hljs-keyword`,
            declarations: [{ color: "var(--hljs-keyword)" }],
          },
          {
            selector: `hljs-punctuation`,
            declarations: [{ color: "var(--hljs-punctuation)" }],
          },
          {
            selector: `hljs-subst`,
            declarations: [{ color: "var(--hljs-subst)" }],
          },
          {
            selector: `hljs-built_in`,
            declarations: [{ color: "var(--hljs-built_in)" }],
          },
          {
            selector: `hljs-string`,
            declarations: [{ color: "var(--hljs-string)" }],
          },
                    {
            selector: `hljs-strong`,
            declarations: [{ color: "var(--hljs-strong)" }],
          },
                    {
            selector: `hljs-emphasis`,
            declarations: [{ color: "var(--hljs-emphasis)" }],
          },
        ],
      };
    },
  },
];
/*

  

  // base0D - Functions, Methods, Attribute IDs, Headings 
    .hljs-attribute,
  .ruby .hljs-property,
    .hljs-section {
    color: var(--hljs-function);
  }

  // Strings, Inherited Class, Markup Code, Diff Inserted 
  .hljs-code,
  .hljs-addition,
  .hljs-title.class_.inherited__,
  .hljs-string {
    color: var(--hljs-string);
  }

  // Keywords, Storage, Selector, Markup Italic, Diff Changed 
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-type,
  .hljs-template-tag,
  .diff .hljs-meta,
  .hljs-keyword {
    color: var(--hljs-keyword);
  }

  // Support, Regular Expressions, Escape Characters, Markup Quotes 
  // guessing 
  .hljs-doctag,
  .hljs-quote,
  .hljs-keyword.hljs-atrule,
  .hljs-regexp {
    color: var(--hljs-built-in);
  }



  .hljs-strong {
    font-weight: bold;
    color: var(--hljs-strong);
  }

  .hljs-emphasis {
    font-style: italic;
    color: var(--hljs-emphasis);
  }
*/
