export default function focus() {
  return {
    wrapper: (content) => content, // Hover doesn't need an outer block
    selector: (sel) => `${sel}:focus` // It changes the selector
  };
}