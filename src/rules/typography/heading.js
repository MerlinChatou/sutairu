// 1. Static Rules for .h1 through .h6
// These use the fluid clamp() and optical letter-spacing we defined
const baseHeadings = {
  h1: `
    font-size: var(--su-fs-h1);
    letter-spacing:var(--su-ls-h1);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h1);    
    color: var(--su-text-title);
  `,
  h2: `
    font-size: var(--su-fs-h2);
    letter-spacing:var(--su-ls-h2);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h2);
    color: var(--su-text-title);
  `,
  h3: `
    font-size:  var(--su-fs-h3);
    letter-spacing:var(--su-ls-h3);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h3);
    color: var(--su-text-title);
  `,
  h4: `
    font-size:  var(--su-fs-h4);
    letter-spacing:var(--su-ls-h4);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h4);
    color: var(--su-text-title);
  `,
  h5: `
    font-size:  var(--su-fs-h5);
    letter-spacing:var(--su-ls-h5);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h5);
    color: var(--su-text-title);
  `,
  h6: `
    font-size: var(--su-fs-h6);
    letter-spacing:var(--su-ls-h6);
    line-height: var(--su-lh-title);
    font-weight: var(--su-fw-h6);
    color: var(--su-text-title);
  `,
};

export const rules = Object.entries(baseHeadings).reduce((acc, [key, value]) => {
  // Standard class: .h1
  acc[key] = value.trim().replace(/\n\s+/g, " ");

  // Important class: .!h1
  acc[`!${key}`] = value.trim().replace(/;/g, " !important;").replace(/\n\s+/g, " ");

  return acc;
}, {});
