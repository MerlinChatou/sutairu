
  

export function escapeClassName(name) {
  return name
    .replace(/([^a-zA-Z0-9_-])/g, "\\$1") // Escapes anything NOT a letter, number, underscore, or hyphen
    .replace(/^(-)/, "\\$1");             // Specifically escapes a leading hyphen
}


/* v1
export function escapeClassName(name) {
  // Escapes colons (:) and slashes (/) for valid CSS selectors
  return name.replace(/:/g, "\\:").replace(/\//g, "\\/");
}
*/