export default function group_selected() {
  return {
    wrapper: (content) => content, 
    selector: (sel) => `.group.selected ${sel}`
  };
}