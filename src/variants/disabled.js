/**
 * Disabled Variant (A11y friendly)
 * Uses :is() to group the native state and the ARIA attribute.
 */
export default function disabled() {
  return {
    wrapper: (content) => content,

    // Combines native :disabled and aria-disabled attribute
    selector: (sel) => `${sel}:is(:disabled, [aria-disabled="true"])`
  };
}