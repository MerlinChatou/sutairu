export default function is_first() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:first-child`
  };
}