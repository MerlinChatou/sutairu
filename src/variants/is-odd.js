export default function is_odd() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:nth-child(odd)`
  };
}