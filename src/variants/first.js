export default function first() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:first-child`
  };
}