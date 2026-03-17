/**
 * Patterns for extracting class names from various web frameworks.
 * Supports: HTML, React (className), Svelte (class:name), and JSX expressions.
 */

// Standard: class="btn" or className="btn"
const standardAttr = /(?:class|className)=["']([^"']+)["']/.source;

// Expressions: class={'btn'} or className={`btn`}
const expressionAttr = /(?:class|className)=\{[`'"]([^`'"]+)[`'"]\}/.source;

// Svelte Directives: class:active={condition} -> captures "active"
// Added [a-zA-Z0-9_:-] to support utility classes with colons
//const svelteDirective = /class:([a-zA-Z0-9_:-]+)/.source;

/** * Improved Svelte Directive Regex:
 * 1. Must start with alpha-numeric [a-zA-Z0-9]
 * 2. Can have colons/dashes in the middle (optional)
 * 3. Must end with alpha-numeric
 */
const svelteDirective = /class:([a-zA-Z0-9](?:[a-zA-Z0-9_:-]*[a-zA-Z0-9])?)/.source;

// Combine into a single Global regex
export const classRegex = new RegExp(`${standardAttr}|${expressionAttr}|${svelteDirective}`, "g");

/**
 * Helper to extract the correct string from regex match groups
 */
export function getClassNameFromMatch(match) {
  // Return the first captured group that isn't undefined
  return match[1] || match[2] || match[3];
}
