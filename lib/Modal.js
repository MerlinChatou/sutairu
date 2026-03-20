import Scroll from "./utils/Scroll.js";

// Event

/** @type {Event & { triggerEvent?: Event }} */
const eventOpen = new Event("onModalOpen");

/** @type {Event & { triggerEvent?: Event }} */
const eventOpened = new Event("onModalOpened");

/** @type {Event & { triggerEvent?: Event }} */
const eventClose = new Event("onModalClose");

/** @type {Event & { triggerEvent?: Event }} */
const eventClosed = new Event("onModalClosed");

// Prevent adding listener twice
let listenerClickAttached = false;
let listenerKeydownAttached = false;

/** @type {HTMLElement | null} */
let previouslyFocused = null;

/**
 * Initializes global modal event listeners.
 *
 * This function sets up all necessary event handlers for modal interactions:
 * - Click events on elements that open or close modals
 * - Keyboard events (e.g., Escape key to close the active modal)
 *
 * It should be called once after the DOM is ready, typically when initializing
 * your modal system.
 *
 * @returns {void}
 */
const init = () => {
  setupModalClickListeners();
  setupModalKeyboardListeners();
  Scroll.unlock();
};

/**
 * Handles modal interactions:
 * - Opens a modal when an element with [data-open-modal] is clicked
 * - Closes a modal when an element with [data-close-modal] is clicked
 * - Supports clicking outside the modal to close it (if implemented in `closeModal`)
 */
const setupModalClickListeners = () => {
  // Prevent attaching listener twice
  if (listenerClickAttached) return;
  listenerClickAttached = true;

  // Add event listener
  document.body.addEventListener("click", handleBodyClick);
};

/**
 * Handles delegated click events on the document body
 * to trigger modal opening.
 *
 * @param {MouseEvent} event
 */
const handleBodyClick = (event) => {
  // Check if the event target is an HTMLElement
  if (!(event.target instanceof HTMLElement)) return;

  let triggerElement;

  // Check if modal target attribute data-open-modal exists
  triggerElement = event.target.closest("[data-open-modal]");
  if (triggerElement instanceof HTMLElement) {
    const modalId = triggerElement.dataset.openModal;
    if (modalId) {
      open(modalId, event);
      event.preventDefault();
      return;
    }
  }

  // Check if modal target attribute data-close-modal exists
  triggerElement = event.target.closest("[data-close-modal]");
  if (!(triggerElement instanceof HTMLElement)) return;

  // Get the opened modal
  const openedModalEl = document.querySelector(".modal[open]");
  if (!(openedModalEl instanceof HTMLElement)) return;

  // Backdrop click
  if (triggerElement === openedModalEl && (event.target === openedModalEl || event.target.classList.contains("modal-scroll"))) {
    close(openedModalEl.id, event);
    return;
  }

  if (triggerElement === openedModalEl && event.target === openedModalEl) {
    close(openedModalEl.id, event);
    return;
  }

  // Button click
  if (triggerElement !== openedModalEl) {
    close(openedModalEl.id, event);
    return;
  }
};

/**
 * Handles global Escape key presses to close the currently open modal.
 *
 * - Listens for 'keydown' events on the document body
 * - When Escape is pressed:
 *   - Finds any <dialog class="modal"> with the [open] attribute
 *   - Closes it using closeModal()
 *   - Prevents default Escape behavior (like exiting fullscreen or triggering native dialog cancel)
 */
const setupModalKeyboardListeners = () => {
  // Prevent attaching listener twice
  if (listenerKeydownAttached) return;
  listenerKeydownAttached = true;

  // Add event listener
  document.body.addEventListener("keydown", handleKeyPressed);
};

/**
 * Handles keydown events to close the currently open modal
 * when the Escape key is pressed.
 *
 * @param {KeyboardEvent} event
 */
const handleKeyPressed = (event) => {
  // If the Escape key is pressed
  if (event.key === "Escape") {
    // Find the active modal
    const openModal = document.querySelector(".modal[open]");
    if (openModal) {
      // Close the modal
      close(openModal.id, event);
      // prevent default escape behavior (like exiting fullscreen or cancel current modal)
      event.preventDefault();
    }
  }
};

/**
 * Moves keyboard focus to the first focusable and visible element
 * within the given container. If no suitable focusable element is found,
 * focus is set on the container itself as a fallback.
 *
 * This utility is intended for focus management in components such as
 * modals or dialogs to ensure proper accessibility and keyboard navigation.
 *
 * @param {HTMLElement} container - The element within which to search for
 * focusable descendants.
 */
const focusFirstElement = (container) => {
  if (!(container instanceof HTMLElement)) return;

  const focusable = container.querySelectorAll(`
    a[href],
    button:not([disabled]),
    input:not([disabled]),
    select:not([disabled]),
    textarea:not([disabled]),
    iframe,
    object,
    embed,
    [contenteditable],
    [tabindex]:not([tabindex="-1"])`);

  for (const el of focusable) {
    // Skip elements that are not actually visible
    if (el instanceof HTMLElement && el.offsetParent !== null) {
      el.focus();
      return;
    }
  }
  // Fallback: focus the modal container itself
  container.setAttribute("tabindex", "-1");
  container.focus();
};

/**
 * Handles `focusin` events to ensure focus remains within the currently
 * open modal. If focus moves to an element outside the modal, it can be
 * redirected back to the modal or to the first focusable element inside it.
 *
 * @param {FocusEvent} event - The focusin event triggered when focus changes.
 */
const handleFocusIn = (event) => {
  // Check if the event target is an HTMLElement
  if (!(event.target instanceof HTMLElement)) return;

  // If the focus is outside the modal
  if (!event.target.closest(".modal[open]")) {
    // Set the focus to the first modal element
    const modal = document.querySelector(".modal[open]");

    if (!(modal instanceof HTMLElement)) return;
    focusFirstElement(modal);
  }
};

/**
 * Opens a modal by its ID, handling already-open modals.
 *
 * This function:
 * - Checks if any modal is currently open
 *   - If the requested modal is already open, it does nothing
 *   - If a different modal is open, it closes that modal first
 * - Opens the requested modal
 * - Optionally uses the `triggerElement` for positioning, focus, or accessibility purposes
 *
 * @param {string} modalId - The ID of the modal to open.
 * @param {Event} [triggerEvent] - The element that triggered opening the modal. Optional
 * @param {Boolean} [toggling] - True when toggling from one modal to another. Optional
 * @returns {void}
 */
const open = (modalId, triggerEvent, toggling = false) => {
  // Check if a modal is already opened
  const openedModalEl = document.querySelector(".modal[open]");
  if (openedModalEl) {
    // Get the opened modal ID
    const openedModalId = openedModalEl.id;

    // If the requested modal is the currently opened modal, stop execution
    if (openedModalId == modalId) return;

    // If another modal is currently opened, close before opening the new one
    close(openedModalId, triggerEvent, modalId);
    return;
  }

  // Get the modal element (throw an error if the modal does not exist)
  const modalEl = document.getElementById(modalId);
  if (!modalEl) throw new Error(`Sutairu components [Modal]: No element with id "${modalId}" was found in the DOM.`);

  // Store element with focus when modal is open
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  // Dispatch the show event
  eventOpen.triggerEvent = triggerEvent;
  modalEl.dispatchEvent(eventOpen);

  // Lock the scroll bar to prevent DOM shift
  if (!toggling) {
    // Lock scrollbar
    Scroll.lock();
    document.documentElement.classList.add("modal-open");
    // Add the animation class
    modalEl.classList.add("modal-is-opening");
  }
  // Add the animation class
  else modalEl.classList.add("modal-is-switching-in");

  // Event listener on animation end (only once)
  modalEl.addEventListener("animationend", function onOpeningAnimationEnd(e) {
    // Wait for the modal animation end
    if (e.animationName != "modal-animation") return;

    // Remove listener once triggered on .modal
    modalEl.removeEventListener("animationend", onOpeningAnimationEnd);

    // The modal is visible, remove the class
    modalEl.classList.remove("modal-is-opening");
    modalEl.classList.remove("modal-is-switching-in");

    modalEl.focus();

    // Trap focus
    document.body.addEventListener("focusin", handleFocusIn);

    // Dispatch the shown event
    eventOpened.triggerEvent = triggerEvent;
    modalEl.dispatchEvent(eventOpened);
  });

  // Set the modal open
  modalEl.setAttribute("open", "");
};

/**
 * Close the modal with a given ID
 * @param {string} modalId ID of the modal
 * @param {Event} [triggerEvent] The event that triggered the modal closing (optional).
 * @param {string} [next] ID of the next modal to open (toogle) (optional)
 */
const close = (modalId, triggerEvent, next) => {
  // Check if a modal is already opened
  const modalEl = document.getElementById(modalId);

  // Check if the modal is not opened
  if (!modalEl) {
    // If not, open the next modal if requested
    if (next) open(next, triggerEvent);
    return;
  }

  // Dispatch the close event
  eventClose.triggerEvent = triggerEvent;
  modalEl.dispatchEvent(eventClose);

  // Stop trapping focus
  document.body.removeEventListener("focusin", handleFocusIn);

  // Restore initial focus
  if (previouslyFocused && typeof previouslyFocused.focus === "function") {
    previouslyFocused.focus();
    previouslyFocused = null;
  }

  // Add the animation class
  if (next) modalEl.classList.add("modal-is-switching-out");
  else modalEl.classList.add("modal-is-closing");

  // Event listener on animation end (only once)
  modalEl.addEventListener("animationend", function onClosingAnimationEnd(e) {
    // Wait for the modal animation end
    if (e.animationName != "modal-animation") return;

    // Remove listener once triggered on .modal
    modalEl.removeEventListener("animationend", onClosingAnimationEnd);

    // The modal is hidden, remove the class
    modalEl.classList.remove("modal-is-closing");
    modalEl.classList.remove("modal-is-switching-out");

    // Set the modal close
    modalEl.removeAttribute("open");

    // Dispatch the closed event
    eventClosed.triggerEvent = triggerEvent;
    modalEl.dispatchEvent(eventClosed);

    // Open the next modal if required
    if (next) open(next, triggerEvent, true);
    else {
      // Restore scrollbar
      Scroll.unlock();

      // Remove global class modal-open
      document.documentElement.classList.remove("modal-open");
    }
  });
};

/**
 * Removes all event listeners registered by the modal module
 * and resets internal listener state flags.
 *
 * This function should be called when the modal system is no longer needed
 * to prevent memory leaks and duplicate listeners.
 */
const destroy = () => {
  if (listenerClickAttached) document.body.removeEventListener("click", handleBodyClick);
  listenerKeydownAttached = false;

  if (listenerKeydownAttached) document.body.removeEventListener("keydown", handleKeyPressed);
  listenerKeydownAttached = false;
};

// Export function individually
export { init, open, close, destroy, setupModalClickListeners, setupModalKeyboardListeners };

// Export global component
const Modal = {
  init,
  open,
  close,
  destroy,
};

export default Modal;