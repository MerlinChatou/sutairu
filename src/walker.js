import { variantHandlers } from "./variants/index.js";
import { resolveCoreStyle } from "./resolver.js";
import { generateCSS } from "./cssGenerator.js";
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
    // 1. Process Utilities at this level if they exist
    if (node._utilities && node._utilities.length > 0) {
      // Initialize the variant "tools" for this specific branch
      const tools = path
        .map((key) => {
          // Get the variant functions
          const handler = variantHandlers[key];
          // Check if the variant exists,
          if (!handler) {
            // Log a warning
            logger.warn(`Unknown variant "${key}" detected in class chain "${path.join(":")}". ` + `This variant will be ignored.`);
            return null;
          }
          return handler();
        })
        .filter((tool) => tool !== null);

      // If the tools array contains any nulls, the whole chain is invalid.
      if (tools.includes(null)) {
        return null; // Exit early, do not generate CSS for this class
      }

      const rules = node._utilities
        .map((util) => {
          logger.verbose(`Resolve ${util}`);
          const rulesConfig = resolveCoreStyle(util);
          if (!rulesConfig) return null;

          // Generate CSS properties from rules
          return generateCSS(rulesConfig, path, util, tools);
        })
        .filter(Boolean)
        .join("\n\n");

      if (!rules || rules.trim().length === 0) {
        // No valid CSS was generated for these utilities,
        // skip wrapping and move to sub-variants.
      } else {
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
