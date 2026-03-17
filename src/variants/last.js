export default function last() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:last-child`
  };
}