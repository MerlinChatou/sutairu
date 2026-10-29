export default function after() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}::after`
  };
}