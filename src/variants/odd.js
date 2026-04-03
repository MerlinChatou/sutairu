export default function odd() {
  return {
    wrapper: (content) => content,
    selector: (sel) => `${sel} > :nth-child(odd)`
  };
}