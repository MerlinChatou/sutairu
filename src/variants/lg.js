export default function lg() {
  return {
    wrapper: (content) => `@media (width >= 64rem) {\n${content}\n}`,
    selector: (sel) => sel // Media queries usually don't change the selector itself
  };
}