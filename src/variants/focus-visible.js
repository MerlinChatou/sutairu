export default function focus_visible() {
  return {
    wrapper: (content) => content, // Hover doesn't need an outer block
    selector: (sel) => `${sel}:focus-visible` // It changes the selector
  };
}