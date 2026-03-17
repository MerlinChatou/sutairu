export default function dark() {
  return {
    // The big outer box
    wrapper: (content) => `:where([data-color-scheme="dark"] *) {\n${content}\n}`,
    // Inside the dark box, we use the nesting selector
    selector: (sel) => `& ${sel}`
  };
}