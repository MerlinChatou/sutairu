# Style Rules

Modular CSS-in-JS utility and component definitions, aggregated and exported via `index.js`.

## Folders

* **`background/`** – Surface colors and procedural background patterns (dots, hatching, stripes) with angle, period, and width controls.
* **`border/`** – Border colors, styles, widths, corner radii, and unit-specific variants.
* **`components/`** – Multi-part UI patterns (buttons, inputs, cards, modals, tooltips, badges, masonry, syntax highlighting, and loaders).
* **`effects/`** – CSS filters (blur, brightness, contrast, etc.), opacity, transitions, and animation durations.
* **`icons/`** – Icon assets, metadata, and rendering rules.
* **`interactivity/`** – Cursor styles, pointer events, resize behavior, and focus outlines.
* **`layout/`** – Display, visibility, positioning, sizing, z-index, overflow, Flexbox, Grid, and alignment primitives.
* **`spacing/`** – Margin, padding, and gap scales alongside explicit unit helpers.
* **`transform/`** – 2D/3D rotation, scaling, and translation utilities.
* **`typography/`** – Font families, static/fluid sizing, weights, headings, line height, spacing, color, and text wrapping/alignment.

## Root Files

* **`index.js`** – Aggregates and exports all rule modules.
* **`utils.js`** – Shared helpers for building and formatting rule objects.