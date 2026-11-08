export default function dark() {
  return {
    // The big outer box
    wrapper: (content) => `:is([data-color-scheme="dark"] *) {\n${content}\n}`,
    //wrapper: (content) => `[data-color-scheme="dark"] {\n${content}\n}`,
    
    // Inside the dark box, we use the nesting selector
    selector: (sel) => `&${sel}`,
    //selector: (sel) => `& ${sel}`,
  };
}
