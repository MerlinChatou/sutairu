
  /**
 * Creates a debounced function that delays invoking `func` until after `wait` 
 * milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - Returns the new debounced function.
 * 
 * @example
 * const handleSearch = debounce((query) => console.log(query), 300);
 * window.addEventListener('resize', handleSearch);
 */
export function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }