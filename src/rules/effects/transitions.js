const properties = {
  none: "none",
  all: "all",
  base: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  colors: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
  layout: "width, height, margin, padding, top, right, bottom, left, inset, gap",
  opacity: "opacity",
  transform: "transform",
  filter: "filter",
  shadow: "box-shadow",
  bg: "background-color",
  color: "color",
  radius: "border-radius",
  width: "width",
  height: "height",
  border: "border-color",
  fill: "fill",
  outline: "outline-color",
};

const easingKeys = ["linear", "ease-in-out", "ease-in", "ease-out", "ease", "step-start", "step-end"];

const propPattern = `(${Object.keys(properties).join("|")})`;
// Supports digits, optional decimals, and optional 'ms' or 's' units
const timePattern = `(\\d+(?:\\.\\d+)?(?:ms|s)?)`;
const easingPattern = `(${easingKeys.join("|")}|cubic\\([^\\)]+\\)|steps?\\([^\\)]+\\))`;
const masterRegex = new RegExp(`^(!?)tr-${propPattern}(?:-${timePattern})?(?:-${timePattern})?(?:-${easingPattern})?$`);

export const patterns = [
  {
    test: masterRegex,
    parse: (match) => {
      const [, important, propKey, durationRaw, delayRaw, easingRaw] = match;
      
      // Special Case: tr-none
      if (propKey === "none") {
        return {
          isImportant: important === "!",
          rules: [
            {
              selector: match[0],
              declarations: [{ transition: "none" }],
            },
          ],
        };
      }

      const rawProperties = properties[propKey];

      // Helper to ensure time values have units (defaults plain numbers to ms)
      const formatTime = (raw) => {
        if (!raw) return null;
        return /(?:ms|s)$/.test(raw) ? raw : `${raw}ms`;
      };

      const duration = durationRaw ? formatTime(durationRaw) : "150ms";
      const delay = delayRaw && delayRaw !== "0" ? ` ${formatTime(delayRaw)}` : "";

      let easing = easingRaw || "ease";
      if (easing.startsWith("cubic(")) easing = easing.replace("cubic(", "cubic-bezier(");
      if (easing.startsWith("step(")) easing = easing.replace("step(", "steps(");

      const transitionValue = rawProperties
        .split(",")
        .map((prop) => `${prop.trim()} ${duration} ${easing}${delay}`)
        .join(", ");

      return {
        isImportant: important === "!",
        rules: [
          {
            selector: match[0],
            declarations: [
              { transition: transitionValue },
            ],
          },
        ],
      };
    },
  },
];