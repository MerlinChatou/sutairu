export function convertToOklch({ color, shade = "500", transparency = "100" }) {
  // 1. Look up the Hue and Chroma based on the color name
  // 2. Adjust Lightness based on the shade (e.g., 900 is dark, 100 is light)
  // 3. Normalize transparency (convert 0-100 scale to 0-1 if needed)

  if (shade == 500 && transparency == 100) return `var(--su-${color})`;

  const alpha = transparency < 100 ? transparency / 100 : 1;

  if (shade == 500) return `oklch(from var(--su-${color}) l c h / ${alpha})`;

  let ratio = -0.2 * shade + 100;
  let baseColor = `color-mix(in oklch, var(--su-${color}), #fff ${ratio}%)`;

  if (shade > 500) {
    ratio = 0.2 * shade - 100;
    baseColor = `color-mix(in oklch, var(--su-${color}), #000 ${ratio}%)`;
  } 

  if (transparency == 100) return `${baseColor}`;

  
  return `oklch(from ${baseColor} l c h / ${alpha})`;
}
