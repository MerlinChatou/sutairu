/**
 * Ensures all @import rules are at the very top of the CSS file.
 * @param {string} css - The full CSS string
 * @returns {string} - CSS with imports hoisted
 */
export function hoistImports(css) {
  // This regex looks for @import at the start of a line and matches 
  // until it finds a semicolon that is followed by a line break or EOF.
  // It handles both ' and " and ( )
  const importRegex = /^@import [^]+?;(?=\s|$)/gm;
  
  // 1. Find all matches
  const imports = css.match(importRegex) || [];
  
  // 2. Clean the CSS (remove the imports)
  // We use the same regex to replace them with an empty string
  const cssWithoutImports = css.replace(importRegex, '').trim();
  
  // 3. Deduplicate and Join
  const uniqueImports = [...new Set(imports.map(i => i.trim()))];
  
  return uniqueImports.length > 0 
    ? uniqueImports.join('\n') + '\n\n' + cssWithoutImports 
    : cssWithoutImports;
}

