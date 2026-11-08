export default function is_last() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:last-child`
  };
}