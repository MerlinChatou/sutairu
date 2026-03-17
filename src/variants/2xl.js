export default function _2xl() {
  return {
    wrapper: (content) => `@media (width >= 96rem) {\n${content}\n}`,
    selector: (sel) => sel // Media queries usually don't change the selector itself
  };
}