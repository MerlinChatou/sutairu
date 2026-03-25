// Background
import * as background_color from "./background/background-color.js";
import * as dotted from "./background/dotted.js";
import * as hatching from "./background/hatching.js";
import * as pattern_angle from "./background/pattern-angle.js";
import * as pattern_period from "./background/pattern-period.js";
import * as pattern_width from "./background/pattern-width.js";
import * as stripes from "./background/stripes.js";

// Border
import * as border_color from "./border/border-color.js";
import * as border_radius from "./border/border-radius.js";
import * as border_radius_unit from "./border/border-radius-unit.js";
import * as border_style from "./border/border-style.js";
import * as border_width from "./border/border-width.js";
import * as border_width_unit from "./border/border-width-unit.js";

// Components
import * as badge from "./components/badge.js";
import * as button from "./components/button.js";
import * as button_base from "./components/button-base.js";
import * as card from "./components/card.js";
import * as group from "./components/group.js";
import * as masonry from "./components/masonry.js";

// Effects
import * as blur from "./effects/blur.js";
import * as brightness from "./effects/brightness.js";
import * as contrast from "./effects/contrast.js";
import * as grayscale from "./effects/grayscale.js";
import * as hue_rotate from "./effects/hue-rotate.js";
import * as invert from "./effects/invert.js";
import * as opacity from "./effects/opacity.js";
import * as saturate from "./effects/saturate.js";
import * as sepia from "./effects/sepia.js";
import * as transitions from "./effects/transitions.js";

// Interactivity
import * as cursor from "./interactivity/cursor.js";

// Layout
import * as alignment from "./layout/alignment.js";
import * as align_content from "./layout/align-content.js";
import * as align_items from "./layout/align-items.js";
import * as align_self from "./layout/align-self.js";
import * as aspect_ratio from "./layout/aspect-ratio.js";
import * as coordinate from "./layout/coordinate.js";
import * as display from "./layout/display.js";
import * as flex from "./layout/flex.js";
import * as flex_basis from "./layout/flex-basis.js";
import * as flex_grow from "./layout/flex-grow.js";
import * as flex_shrink from "./layout/flex-shrink.js";
import * as grid from "./layout/grid.js";
import * as grid_cols from "./layout/grid-cols.js";
import * as grid_rows from "./layout/grid-rows.js";
import * as grid_span from "./layout/grid-span.js";
import * as justify_content from "./layout/justify-content.js";
import * as justify_self from "./layout/justify-self.js";
import * as object_fit from "./layout/object-fit.js";
import * as overflow from "./layout/overflow.js";
import * as position from "./layout/position.js";
import * as size from "./layout/size.js";
import * as size_unit from "./layout/size-unit.js";
import * as z_index from "./layout/z-index.js";

// Spacing
import * as gap from "./spacing/gap.js";
import * as gap_unit from "./spacing/gap-unit.js";
import * as margin from "./spacing/margin.js";
import * as margin_unit from "./spacing/margin-unit.js";
import * as padding from "./spacing/padding.js";
import * as padding_unit from "./spacing/paddding-unit.js";

// Transform
import * as rotate from "./transform/rotate.js";
import * as scale from "./transform/scale.js";
import * as translate from "./transform/translate.js";

// Typography
import * as font_family from "./typography/font-family.js";
import * as font_size from "./typography/font-size.js";
import * as font_size_fluid from "./typography/font-size-fluid.js";
import * as font_weight from "./typography/font-weight.js";
import * as heading from "./typography/heading.js";
import * as letter_spacing from "./typography/letter-spacing.js";
import * as line_height from "./typography/line-height.js";
import * as text_alignement from "./typography/text-alignment.js";
import * as text_color from "./typography/text-color.js";
import * as text_decoration from "./typography/text-decoration.js";
import * as text_wrap from "./typography/text-wrap.js";
import * as white_space from "./typography/white-space.js";

/*
src/
└── rules/
    ├── index.js          # The "Brain" that merges everything
    ├── layout/           # display, position, z-index, overflow
    ├── spacing/          # margin, padding, gap
    ├── typography/       # font-size, color, leading, tracking
    ├── flex-grid/        # flex-direction, grid-cols, justify, align
    ├── effects/          # shadow, opacity, border-radius
    └── interactivity/    # cursor, pointer-events, user-select, outline
*/

const utilities = [
  // Background
  background_color,
  dotted,
  hatching,
  pattern_angle,
  pattern_period,
  pattern_width,
  stripes,

  // Border
  border_color,
  border_style,
  border_radius,
  border_radius_unit,
  border_width,
  border_width_unit,

  // Effects
  blur,
  brightness,
  contrast,
  grayscale,
  hue_rotate,
  invert,
  opacity,
  saturate,
  sepia,
  transitions,

  // Interactivity
  cursor,

  // Layout
  alignment,
  align_content,
  align_items,
  align_self,
  aspect_ratio,
  coordinate,
  display,
  flex,
  flex_basis,
  flex_grow,
  flex_shrink,
  grid,
  grid_cols,
  grid_rows,
  grid_span,
  justify_content,
  justify_self,
  object_fit,
  overflow,
  position,
  size,
  size_unit,
  z_index,

  // Spacing
  gap,
  gap_unit,
  margin,
  margin_unit,
  padding,
  padding_unit,

  // Transform
  rotate,
  scale,
  translate,

  // Typography
  font_family,
  font_size,
  font_size_fluid,
  font_weight,
  heading,
  letter_spacing,
  line_height,
  text_alignement,
  text_color,
  text_decoration,
  text_wrap,
  white_space,
];

// Components
const components = [badge, button, button_base, card, group, masonry];

// Flatten all static utilities rules into one object for O(1) lookup
export const staticUtilitiesMap = utilities.reduce((acc, mod) => ({ ...acc, ...mod.rules }), {});

// Flatten all regex utilities patterns into one array
export const dynamicUtilitiesPatterns = utilities.flatMap((mod) => mod.patterns || []);



// Flatten all static components rules into one object for O(1) lookup
export const staticComponentsMap = components.reduce((acc, mod) => ({ ...acc, ...mod.rules }), {});

// Flatten all regex components patterns into one array
export const dynamicComponentsPatterns = components.flatMap((mod) => mod.patterns || []);
