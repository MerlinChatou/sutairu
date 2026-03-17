/**
 * Locks background scrolling while preserving the scrollbar space.
 *
 * This prevents layout shifts when a modal is opened by:
 * - Disabling document scrolling
 * - Compensating for the removed scrollbar width using padding
 *
 * Intended to be called when a modal enters the open state.
 */
const lock = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  document.documentElement.classList.add("modal-open");
}

/**
 * Restores normal document scrolling after a modal is closed.
 *
 * This function:
 * - Re-enables scrolling
 * - Removes the scrollbar width compensation
 *
 * Intended to be called when the last modal is closed.
 */
const unlock = () => {
  document.documentElement.classList.remove("modal-open");
  document.documentElement.style.paddingRight = "";
}




// Export function individually
export { 
  lock, 
  unlock
};

// Export global component
const Scroll = {
  lock,
  unlock,
};

export default Scroll;
