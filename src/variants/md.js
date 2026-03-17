export default function md() {
  return {
    wrapper: (content) => `@media (width >= 48rem) {\n${content}\n}`,
    selector: (sel) => sel // Media queries usually don't change the selector itself
  };
}