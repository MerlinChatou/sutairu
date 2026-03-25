/**
 * Base Heading Definitions
 * Defines the core typography tokens for H1-H6.
 * Using CSS variables allows for fluid scaling (clamp) and centralized theming.
 */
const baseHeadings = {
  h1: { "font-size": "var(--su-fs-h1)", "letter-spacing": "var(--su-ls-h1)", "font-weight": "var(--su-fw-h1)" },
  h2: { "font-size": "var(--su-fs-h2)", "letter-spacing": "var(--su-ls-h2)", "font-weight": "var(--su-fw-h2)" },
  h3: { "font-size": "var(--su-fs-h3)", "letter-spacing": "var(--su-ls-h3)", "font-weight": "var(--su-fw-h3)" },
  h4: { "font-size": "var(--su-fs-h4)", "letter-spacing": "var(--su-ls-h4)", "font-weight": "var(--su-fw-h4)" },
  h5: { "font-size": "var(--su-fs-h5)", "letter-spacing": "var(--su-ls-h5)", "font-weight": "var(--su-fw-h5)" },
  h6: { "font-size": "var(--su-fs-h6)", "letter-spacing": "var(--su-ls-h6)", "font-weight": "var(--su-fw-h6)" },
};

// Common shared properties for all titles to keep the baseHeadings map clean
const sharedTitleProps = {
  "line-height": "var(--su-lh-title)",
  color: "var(--su-title)",
};

/**
 * Heading Registry
 * Generates both standard (.h1) and important (.!h1) variants.
 */
export const rules = Object.entries(baseHeadings).reduce((acc, [key, props]) => {
  const baseConfig = {
    identifier: ".",
    rules: [
      {
        selector: key, // "h1", "h2", etc.
        declarations: [{ ...sharedTitleProps, ...props }],
      },
    ],
  };

  // 1. Standard version: .h1
  acc[key] = {
    ...baseConfig,
    isImportant: false,
  };

  // 2. Important version: .!h1
  acc[`!${key}`] = {
    ...baseConfig,
    isImportant: true,
    rules: baseConfig.rules.map((rule) => ({
      ...rule,
      selector: `!${rule.selector}`, // Becomes "!h1"
    })),
  };

  return acc;
}, {});