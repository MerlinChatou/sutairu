export default function before() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}::before`
  };
}