/**
 * Portrait Variant
 * Contract: returns { wrapper, selector }
 */
export default function landscape() {
  return {
    // Stage 1: Wrap the rules in the orientation media query
    wrapper: (content) => {
      return `@media (orientation: landscape) {\n${content}\n}`;
    },

    // Stage 2: Return the selector unchanged 
    // (Media queries don't typically modify the class name itself)
    selector: (sel) => sel
  };
}