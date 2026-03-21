import dark from './dark.js';

import sm from './sm.js';
import md from './md.js';
import lg from './lg.js';
import xl from './xl.js';
import _2xl from './2xl.js';

import portrait from './portrait.js';
import landscape from './landscape.js';

import hover from './hover.js';
import focus from './focus.js';
import active from './active.js';
import disabled from './disabled.js';
import focus_visible from './focus-visible.js';
import selected from './selected.js';

import placeholder from './placeholder.js';
import first from './first.js';
import last from './last.js';
import odd from './odd.js';
import even from './even.js';

import group_hover from './group-hover.js';
import group_selected from './group-selected.js';

// We map the string keys from your tree to the actual logic
export const variantHandlers = {
  'dark': dark,
  'sm': sm,
  'md': md,
  'lg': lg,
  'xl': xl,
  '2xl': _2xl,

  'portrait': portrait,
  'landscape': landscape,


  'hover': hover,
  'focus': focus,
  'focus-visible': focus_visible,
  'active': active,
  'disabled': disabled,
  "selected": selected,
  
  'placeholder': placeholder,
  'first': first,
  'last': last,
  'odd': odd,
  'even': even,

  'group-hover': group_hover,
  'group-selected': group_selected,
};

/*
To ensure your engine is truly "Surgical" and matches the high standards of modern CSS frameworks like Tailwind or UnoCSS, we should add **State**, **Structural**, and **Contextual** variants.

Here are the missing variants categorized by their "Surgical" utility:

### 1. Interactive & Form States

These are essential for accessible and dynamic UIs.

* **`autofill`**: Style inputs when the browser auto-fills them.
* **`invalid`**: Highlight form fields with validation errors.
* **`required`**: Target mandatory fields.
* **`read-only`**: Target inputs the user can't edit.
* **`checked`**: Specific for checkboxes and radio buttons.

### 2. Structural & Child Selectors

You have `first` and `last`, but these others prevent the need for extra classes on every element:

* **`even`**: The partner to your `odd` variant.
* **`only`**: For when an element is the only child.
* **`not-first` / `not-last**`: Very useful for borders between list items.

### 3. Reduced Motion & Accessibility

A "Surgical" engine should respect user system preferences:

* **`motion-safe`**: Apply animations only if the user hasn't requested reduced motion.
* **`motion-reduce`**: The opposite—apply static styles if they have.
* **`print`**: Essential for ensuring your layout doesn't break when a user hits `Cmd+P`.

---

### Updated Variant Registry

Here is the updated object with the new "Surgical" additions:

```javascript
{
  // Media Queries / Responsive
  'dark': dark,
  'sm': sm,
  'md': md,
  'lg': lg,
  'xl': xl,
  '2xl': _2xl,
  'portrait': portrait,
  'landscape': landscape,
  'print': print, // NEW: For printer-friendly layouts

  // Interaction States
  'hover': hover,
  'focus': focus,
  'focus-within': focus_within, // NEW: Parent reacts to child focus
  'focus-visible': focus_visible,
  'active': active,
  'disabled': disabled,
  "selected": selected,
  'checked': checked, // NEW: Radio/Checkbox state

  // Form States
  'placeholder': placeholder,
  'invalid': invalid, // NEW: Validation
  'required': required, // NEW: Validation
  'autofill': autofill, // NEW: Browser autofill colors

  // Structural Selectors
  'first': first,
  'last': last,
  'only': only, // NEW: Single child
  'odd': odd,
  'even': even, // NEW: The other half of zebra-striping

  // Group States
  'group-hover': group_hover,
  'group-focus': group_focus, // NEW: Standard group interaction
  'group-selected': group_selected,
  'group-active': group_active, // NEW: For "press down" states on cards

  // Accessibility / System
  'motion-safe': motion_safe, // NEW: Animation respect
  'motion-reduce': motion_reduce, // NEW: Accessibility
}

```

### Why `focus-within` is a Must

If you have a search bar with an icon inside it, `focus-within` on the wrapper allows you to change the border color of the whole container when the user clicks the input inside. It’s much cleaner than using JavaScript.

**Would you like me to help you write the logic for the `focus-within` media/pseudo selector generator?**
  */