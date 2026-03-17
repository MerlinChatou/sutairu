export default function hover() {
  return {
    wrapper: (content) => content, 
    selector: (sel) => `${sel}:hover`
  };
}