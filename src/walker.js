import { variantHandlers } from "./variants/index.js";
import { resolveCoreStyle } from "./resolver.js";
import { escapeClassName } from "./utils/escaper.js";
import { logger } from "./utils/logger.js";



/**
 * Walk through the tree and generate the CSS
 * @param {object} tree The tree to processs
 * @returns {string} The CSS generated
 */
export function buildCSS(tree) {
  let cssOutput = "";

  /**
   * The Recursive Walker
   * @param {Object} node - Current branch (e.g., the 'md' object)
   * @param {Array} path - The chain of variants (e.g., ['dark', 'md'])
   */
  function walk(node, path = []) {
    //console.log (node);
    // 1. Process Utilities at this level if they exist
    if (node._utilities && node._utilities.length > 0) {
      // Initialize the variant "tools" for this specific branch
      const tools = path.map((key) => {
        // Get the variant functions
        const handler = variantHandlers[key];
        // Check if the variant exists,
        if (!handler) {
          // Log a warning
          //console.log (path);
          logger.warn(`Unknown variant "${key}" detected in class chain "${path.join(":")}". ` + `This variant will be ignored.`);
          return null;
        }

        return handler();
      }).filter(tool => tool !== null);

      const rules = node._utilities
        .map((util) => {
          const body = resolveCoreStyle(util);
          if (!body) return null;

          // Reconstruct the class name for the CSS selector
          const fullClass = path.length > 0 ? `${path.join(":")}:${util}` : util;
          let selector = `.${escapeClassName(fullClass)}`;

          // Transform the Selector (Inside-Out)
          // e.g., .class -> & .class -> & .class:hover
          for (const tool of [...tools].reverse()) {
            selector = tool.selector(selector);
          }

          return `${selector} {\n  ${body}\n}`;
        })
        .filter(Boolean)
        .join("\n\n");

      // Transform the Wrapper (Inside-Out)
      // e.g., body -> @media { body } -> :where { @media { body } }
      let wrappedOutput = rules;
      for (const tool of [...tools].reverse()) {
        // Indent content for clean nested output
        const indented = wrappedOutput
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n");
        wrappedOutput = tool.wrapper(indented);
      }

      cssOutput += wrappedOutput + "\n\n";
    }

    // 2. Dive deeper into sub-variants
    for (const key in node) {
      if (key === "_utilities") continue;
      walk(node[key], [...path, key]);
    }
  }

  // Kick off the walk from the root
  walk(tree);
  return cssOutput;
}
