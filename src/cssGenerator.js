import { escapeClassName } from "./utils/escaper.js";

export const generateCSS = (ruleConfig, path, util, tools) => {
<<<<<<< HEAD
  const isImportant = ruleConfig.isImportant;
  const suffix = isImportant ? " !important" : "";

  // 1. Reconstruct the base class (e.g., "hover:!test")
  //const fullClass = path.length > 0 ? `${path.join(":")}:${util}` : util;
  //const escapedBaseClass = `${rule.identifier || "."}${escapeClassName(fullClass)}`;

  // 2. Loop through each rule in the object
  return ruleConfig.rules
    .map((rule) => {

      // Prepend path to selector
      let selector = path.length > 0 ? `${path.join(":")}:${rule.selector}` : `${rule.selector}`;

      // Add prefix and escape selector
      selector = `${rule.identifier || "."}${escapeClassName(selector)}`;
=======
  
  const isImportant = ruleConfig.isImportant;
  const suffix = isImportant ? " !important" : "";

  // Loop through each rule in the object
  return ruleConfig.rules
    .map((rule) => {
      // Prepend path to selector
      let selector = path.length > 0 ? `${path.join(":")}:${rule.selector}` : `${rule.selector}`;

      // Add prefix and escape selector      
      selector = `${rule.identifier ?? "."}${escapeClassName(selector)}`;
>>>>>>> newrules
      
      // Apply path tools (& selector or selector:hover)
      for (const tool of [...tools].reverse()) {
        selector = tool.selector(selector);
      }
<<<<<<< HEAD

      // Add suffix
      selector = `${selector}${rule.suffix || ""}`;
=======
      // Add suffix
      selector = `${rule.prefix || ""}${selector}${rule.suffix || ""}`;
>>>>>>> newrules

      // 4. Build the declarations block
      const body = rule.declarations
        .map((decl) => {
          return Object.entries(decl)
            .map(([prop, value]) => `  ${prop}: ${value}${suffix};`)
            .join("\n");
        })
        .join("\n");

      return `${selector} {\n${body}\n}`;
    })
    .join("\n\n");
};
