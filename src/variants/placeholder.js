export default function placeholder() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}::placeholder`
  };
}