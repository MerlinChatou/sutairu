import { groupClassesByVariant } from "./grouper.js";
import { buildCSS } from "./walker.js";

export function compileCSS(classes) {
  const tree = groupClassesByVariant(classes);
  const componentsCSS = buildCSS(tree,  { isComponents: true });
  const utilitiesCSS = buildCSS(tree);
  return `@layer components {\n ${componentsCSS}\n}\n\n@layer utilities {\n${utilitiesCSS}}`;
}