export default function xl() {
  return {
    wrapper: (content) => `@media (width >= 80rem) {\n${content}\n}`,
    selector: (sel) => sel // Media queries usually don't change the selector itself
  };
}