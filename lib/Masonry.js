import { getContentWidth } from "./utils/size.js";
import { debounce } from "./utils/debounce.js";

/**
 * Calculates the number of columns that can fit within a container based on
 * a target item width and gap, with different fitting strategies.
 *
 * @param {number} containerWidth - The total available width of the parent container.
 * @param {number} targetWidth - The desired width for each grid item.
 * @param {number} gap - The spacing between columns (gutters).
 * @param {'min' | 'max' | 'closest'} [mode='min'] - The fitting strategy:
 *   - 'min': (Default) Round down. Items will be at least `targetWidth` or wider.
 *   - 'max': Round up. Items will be `targetWidth` or narrower.
 *   - 'closest': Round to the nearest integer for a natural fit.
 * @returns {number} The calculated number of columns (minimum of 1).
 *
 * @example
 * const columns = getColumnCount(1200, 300, 20, 'min');
 * // Result: 3 columns (items will stretch to fill extra space)
 */
const getColumnCount = (containerWidth, targetWidth, gap, mode) => {
  const raw = (containerWidth + gap) / (targetWidth + gap);
  switch (mode) {
    case "max":
      return Math.max(1, Math.ceil(raw)); // More columns = skinnier items
    case "closest":
      return Math.max(Math.round(raw)); // Nearest fit
    case "min": // Fewer columns = wider items
    default:
      return Math.max(Math.floor(raw));
  }
};

/**
 * Orchestrates the positioning of child elements within a container using a
 * masonry-style algorithm. It calculates column spans, positions items
 * via CSS transforms, and updates the container height.
 *
 * @param {HTMLElement} container - The DOM element acting as the grid parent.
 * @param {Object} settings - Layout configuration object.
 * @param {number} settings.targetWidth - Ideal width for each item.
 * @param {number} settings.gap - Spacing between items in pixels.
 * @param {'min'|'max'|'closest'} settings.mode - The column fitting strategy.
 * @param {Function} [settings.onReflow] - Optional callback fired after layout completion.
 *
 * @returns {void}
 */
const arrange = (container, settings) => {
  // Get container width and childrens
  const containerWidth = getContentWidth(container);
  const items = Array.from(container.children);
  // Safety check: If the element doesn't exist, exit early
  if (!container) {
    console.error("Masonry: Container not found.");
    return;
  }
  const columnsCount = getColumnCount(containerWidth, settings.targetWidth, settings.gap, settings.mode);
  // Calculate the actual width so columns fill the space perfectly
  const totalGapsWidth = (columnsCount - 1) * settings.gap;
  const actualColumnWidth = (containerWidth - totalGapsWidth) / columnsCount;

  // 5. Layout Execution
  let columnHeights = new Array(columnsCount).fill(0);

  items.forEach((item) => {
    item.style.width = `${actualColumnWidth}px`;
    const minHeight = Math.min(...columnHeights);
    const columnIndex = columnHeights.indexOf(minHeight);

    // X calculation: column index * (width + gap)
    const x = columnIndex * (actualColumnWidth + settings.gap);
    const y = minHeight;

    item.style.transform = `translate(${x}px, ${y}px)`;

    // 3. Re-enable transitions for future resizes (using a tiny timeout)
    setTimeout(() => {
      item.style.transition = ""; // This lets the CSS file take over
    }, 100);

    // Update the tracker for this column
    columnHeights[columnIndex] += item.offsetHeight + settings.gap;
  });

  // 6. Set container height so it wraps the absolute children
  const containerStyle = window.getComputedStyle(container);
  const paddingTop = parseFloat(containerStyle.paddingTop);
  const paddingBottom = parseFloat(containerStyle.paddingBottom);
  const totalContentHeight = Math.max(...columnHeights) - settings.gap;
  const finalHeight = totalContentHeight + paddingTop + paddingBottom;
  container.style.height = `${finalHeight}px`;

  // Trigger Callback
  if (typeof settings.onReflow === "function") {
    console.log ('ici')
    settings.onReflow({
      container,
      columns: columnsCount,
      height: finalHeight,
    });
  }
};

/**
 * Initializes a responsive masonry grid on a target container.
 * This function sets up the initial layout, handles window resizing with
 * debouncing, and provides a cleanup mechanism.
 *
 * @param {string|HTMLElement} selector - A CSS selector string or the actual DOM element.
 * @param {Object} [options={}] - Configuration for the grid layout.
 * @param {number} [options.targetWidth=250] - The ideal width for grid items in pixels.
 * @param {'min'|'max'|'closest'} [options.columnMode='closest'] - How to handle column fitting.
 * @param {number} [options.gap=16] - The space between grid items in pixels.
 * @param {Function} [options.onReflow] - Callback function executed after every reflow.
 *
 * @returns {Function} A cleanup function that disconnects the ResizeObserver.
 *
 * @example
 * // Basic initialization
 * const destroy = init('#masonry-root', { gap: 20 });
 *
 * // Clean up when the element is removed
 * destroy();
 */
const init = (selector, options = {}) => {
  // Resolve the container (Handle ID string or Element)
  const container = typeof selector === "string" ? document.querySelector(selector) : selector;

  // Set Defaults using an Options Object
  const settings = {
    targetWidth: options.targetWidth || 250,
    columnMode: options.columnMode || "closest",
    gap: options.gap || 16,
    onReflow: options.onReflow || (() => {}),
    ...options,
  };
  //arrange(container, settings);

  // Set up ResizeObserver with a debounce
  const debouncedLayout = debounce(() => { arrange(container, settings); }, 150 );
  const ro = new ResizeObserver(() => debouncedLayout());
  
  // This will trigger the first 'arrange' automatically
  ro.observe(container);

  // Return a way to disconnect if needed (cleanup)
  return () => ro.disconnect();
};

// Export function individually
export { init, arrange };

// Export global component
const Masonry = {
  init,
  arrange,
};

export default Masonry;
