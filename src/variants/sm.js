export default function sm() {
  return {
    wrapper: (content) => `@media (width >= 40rem) {\n${content}\n}`,
    selector: (sel) => sel // Media queries usually don't change the selector itself
  };
}