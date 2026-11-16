/**
 * Tooltip Component Utility
 * Handles the anchor container, tooltip body styling, hover states, and directional placements.
 */

export const rules = {
  "tip": {
    rules: [
      {
        // 1. Base Anchor Container
        selector: "tip",
        declarations: [{
          "anchor-name": "--su-tip",
          "anchor-scope": "--su-tip"
        }]
      },
      {
        // 2. Tooltip Body Base Styles
        selector: "tip",
        suffix: " > .tip-body",
        declarations: [{
          "position": "fixed",
          "position-anchor": "--su-tip",
          "position-area": "top",
          "justify-self": "anchor-center",
          "position-try-fallbacks": "flip-block, --su-tip-shift-r, --su-tip-shift-l",
          "max-inline-size": "min(20rem, calc(100vw - 1rem))",
          "z-index": "var(--su-z-tooltip)",
          "background-color": "var(--su-tip-bg-color)",
          "color": "var(--su-tip-text-color)",
          "border-width": "var(--su-tip-border-width)",
          "border-color": "var(--su-tip-border-color)",
          "border-style": "var(--su-tip-border-style)",
          "border-radius": "var(--su-tip-border-radius)",
          "padding": "var(--su-tip-padding)",
          "margin": "var(--su-tip-margin)",
          "box-shadow": "var(--su-tip-shadow)",
          "background-clip": "padding-box",
          "opacity": "0",
          "visibility": "hidden",
          "transition": "opacity 0.15s, visibility 0.15s",
          "pointer-events": "none"
        }]
      },
      {
        // 3. Hover & Focus Visibility (Parent)
        selector: "tip",
        suffix: ":is(:hover, :focus-visible) > .tip-body",
        declarations: [{
          "opacity": "var(--su-tip-opacity)",
          "visibility": "visible",
          "pointer-events": "auto"
        }]
      },
      {
        // 4. Hover Bridge Visibility (Body)
        selector: "tip",
        suffix: " > .tip-body:hover",
        declarations: [{
          "opacity": "var(--su-tip-opacity)",
          "visibility": "visible",
          "pointer-events": "auto"
        }]
      }
    ]
  },
  "tip-top": {
    rules: [
      {
        // Vertical placement: top
        selector: "tip-top",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "block-start",
          "justify-self": "anchor-center",
          "position-try-fallbacks": "flip-block, --su-tip-t-r, --su-tip-t-l"
        }]
      }
    ]
  },
  "tip-bottom": {
    rules: [
      {
        // Vertical placement: bottom
        selector: "tip-bottom",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "block-end",
          "justify-self": "anchor-center",
          "position-try-fallbacks": "flip-block, --su-tip-b-r, --su-tip-b-l"
        }]
      }
    ]
  },
  "tip-left": {
    rules: [
      {
        // Horizontal placement: left
        selector: "tip-left",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "left",
          "justify-self": "end",
          "align-self": "anchor-center",
          "position-try-fallbacks": "flip-inline, --su-tip-s-d, --su-tip-s-u"
        }]
      }
    ]
  },
  "tip-right": {
    rules: [
      {
        // Horizontal placement: right
        selector: "tip-right",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "right",
          "justify-self": "start",
          "align-self": "anchor-center",
          "position-try-fallbacks": "flip-inline, --su-tip-e-d, --su-tip-e-u"
        }]
      }
    ]
  },
  "tip-start": {
    rules: [
      {
        // Logical horizontal placement: inline-start
        selector: "tip-start",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "inline-start",
          "justify-self": "end",
          "align-self": "anchor-center",
          "position-try-fallbacks": "flip-inline, --su-tip-s-d, --su-tip-s-u"
        }]
      }
    ]
  },
  "tip-end": {
    rules: [
      {
        // Logical horizontal placement: inline-end
        selector: "tip-end",
        suffix: " > .tip-body",
        declarations: [{
          "position-area": "inline-end",
          "justify-self": "start",
          "align-self": "anchor-center",
          "position-try-fallbacks": "flip-inline, --su-tip-e-d, --su-tip-e-u"
        }]
      }
    ]
  }
};
/*

  .tip > .tip-body {

    position: fixed;
    position-anchor: --su-tip;
    position-area: top;
    justify-self: anchor-center;
    position-try-fallbacks: flip-block, --su-tip-shift-r, --su-tip-shift-l;
    max-inline-size: min(20rem, 100vw - 1rem);
    z-index: var(--su-z-tooltip);

    background-color: var(--su-tip-bg-color);
    color: var(--su-tip-text-color);
    border-width: var(--su-tip-border-width);
    border-color: var(--su-tip-border-color);
    border-style: var(--su-tip-border-style);
    border-radius: var(--su-tip-border-radius);
    padding: var(--su-tip-padding);
    margin: var(--su-tip-margin);
    
    background-clip: padding-box;
    
    opacity: var(--su-tip-opacity);
    visibility: hidden;
    transition:
      opacity 0.15s,
      visibility 0.15s;
    pointer-events: none;
  }


  .tip:is(:hover, :focus-visible) > .tip-body,
  .tip > .tip-body:hover {
    opacity: var(--su-tip-opacity);
    visibility: visible;
    pointer-events: auto; 
  }

  .tip-top > .tip-body {
    position-area: block-start;
    justify-self: anchor-center;
    position-try-fallbacks: flip-block, --su-tip-t-r, --su-tip-t-l;
  }
  .tip-bottom > .tip-body {
    position-area: block-end;
    justify-self: anchor-center;
    position-try-fallbacks: flip-block, --su-tip-b-r, --su-tip-b-l;
  }

  .tip-left > .tip-body {
    position-area: left;
    align-self: anchor-center;
    position-try-fallbacks: flip-inline, --su-tip-s-d, --su-tip-s-u;
  }

  .tip-right > .tip-body {
    position-area: right;
    align-self: anchor-center;
    position-try-fallbacks: flip-inline, --su-tip-e-d, --su-tip-e-u;
  }

  .tip-start > .tip-body {
    position-area: inline-start;
    align-self: anchor-center;
    position-try-fallbacks: flip-inline, --su-tip-s-d, --su-tip-s-u;
  }
  .tip-end > .tip-body {
    position-area: inline-end;
    align-self: anchor-center;
    position-try-fallbacks: flip-inline, --su-tip-e-d, --su-tip-e-u;
  }

  */