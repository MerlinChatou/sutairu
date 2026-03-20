const baseRules = {
  // The Stage
  "masonry": {
    "position": "relative",
  },

  // The Actor
  "masonry-item": {
    "position": "absolute",
  },
};

const build = (props, imp = false) => {
  const suffix = imp ? " !important" : "";
  return Object.entries(props)
    .map(([k, v]) => `${k}: ${v}${suffix};`)
    .join(" ");
};

export const rules = Object.entries(baseRules).reduce((acc, [key, props]) => {
  // Standard: .masonry, .masonry-item
  acc[key] = build(props, false);
  
  // Important: !masonry, !masonry-item
  acc[`!${key}`] = build(props, true);
  
  return acc;
}, {});