export default function group_hover() {
  return {
    wrapper: (content) => content, 
    selector: (sel) => `.group:hover ${sel}`
  };
}