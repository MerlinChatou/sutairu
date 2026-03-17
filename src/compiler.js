import { groupClassesByVariant } from "./grouper.js";
import { buildCSS } from "./walker.js";

export function compileCSS(classes) {
  const tree = groupClassesByVariant(classes);
  return buildCSS(tree);
}