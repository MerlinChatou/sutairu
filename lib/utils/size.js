  /**
   * Calculates the "useful" width of an element (excluding padding, borders, and scrollbars).
   * @param {HTMLElement} element - The DOM element to measure.
   * @returns {number} The width of the content area in pixels.
   */
  export function getContentWidth(element) {
    const styles = window.getComputedStyle(element);

    // Parse padding values as numbers (they return as strings like "20px")
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;

    // clientWidth = Content Area + Padding (excludes borders and scrollbars)
    // Therefore: Content Area = clientWidth - Padding
    return element.clientWidth - paddingLeft - paddingRight;
  }