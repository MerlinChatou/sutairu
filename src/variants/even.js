export default function even() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel} > :nth-child(even)`
  };
}