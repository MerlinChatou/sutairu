export default function active() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:active` 
  };
}