export default function is_even() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel}:nth-child(even)`
  };
}