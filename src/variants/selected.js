export default function selected() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}.selected`
  };
}