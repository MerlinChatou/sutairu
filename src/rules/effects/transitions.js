const properties = {
  'all': 'all',
  'base': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
  'colors': 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke',
  'layout': 'width, height, margin, padding, top, right, bottom, left, inset, gap',
  'opacity': 'opacity',
  'transform': 'transform',
  'filter': 'filter',
  'shadow': 'box-shadow',
  'bg': 'background-color',
  'color': 'color',
  'radius': 'border-radius',
  'width': 'width',
  'height': 'height',
  'border': 'border-color',
  'fill': 'fill',
  'outline': 'outline-color'
};

const easingKeys = ['linear', 'ease-in-out', 'ease-in', 'ease-out', 'ease', 'step-start', 'step-end'];

const propPattern = `(${Object.keys(properties).join('|')})`;
const easingPattern = `(${easingKeys.join('|')}|cubic\\([^\\)]+\\)|steps?\\([^\\)]+\\))`;
const masterRegex = new RegExp(`^(!?)tr-${propPattern}(?:-(\\d+))?(?:-(\\d+))?(?:-${easingPattern})?$`);

export const patterns = [
  {
    test: masterRegex,
    parse: (match) => {
      // Note: match[0] is the full string, match[1] is the !
      const [, important, propKey, durationRaw, delayRaw, easingRaw] = match;

      const property = properties[propKey];
      const duration = durationRaw ? `${durationRaw}ms` : "150ms";
      const delay = (delayRaw && delayRaw !== "0") ? ` ${delayRaw}ms` : "";
      
      let easing = easingRaw || "ease";
      if (easing.startsWith('cubic(')) easing = easing.replace('cubic(', 'cubic-bezier(');
      if (easing.startsWith('step(')) easing = easing.replace('step(', 'steps(');

      const transitionValue = `${property} ${duration} ${easing} ${delay}`;

      return {
        isImportant: important === "!",
        rules: [{
          selector: match[0], // Use the full utility name as selector
          declarations: [
            // We apply the transition property directly.
            // This overwrites any other transition classes on the element.
            { 'transition': transitionValue }
          ]
        }]
      };
    }
  }
];