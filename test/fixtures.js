// test/fixtures.js
export const sampleClasses = [
  // :::::::::::::: BACKGROUND ::::::::::::::

  // /background/background-color.js
  "bg-green",
  "bg-white-200",
  "bg-gray/50",
  "bg-black-800/80",
  "!bg-page",
  "sm:bg-subtle",

  // /background/dotted.js
  // /background/hatching.js
  // /background/pattern-angle.js
  // /background/pattern-period.js
  // /background/pattern-width.js
  // /background/stripes.js

  // :::::::::::::: BORDER ::::::::::::::

  // /border/border-color.js
  "b-yellow",
  "b-orange-800",
  "b-red/50",
  "b-pink-200/30",
  "b-purple-200/60",
  "!b-blue-133/12",
  "dark:landscape:b-cyan-1000/1",

  // /border/border-radius.js
  "r-2",
  "r-3/2",
  "!r-2.5",
  "first:rb-2",

  // /border/border-radius-unit.js
  // /border/border-style.js
  // /border/border-width.js
  // /border/border-width-unit.js

  // :::::::::::::: COMPONENTS ::::::::::::::

  // /components/badge.js
  // /components/group.js
  // /components/masonry.js

  // :::::::::::::: EFFECTS ::::::::::::::

  // /effects/blur.js
  // /effects/brightness.js
  // /effects/contrast.js
  // /effects/grayscale.js
  // /effects/hue-rotate.js
  // /effects/invert.js
  // /effects/opacity.js
  // /effects/saturate.js
  // /effects/sepia.js

  // :::::::::::::: INTERACTIVITY ::::::::::::::

  // /interactivity/cursor.js
  "cur-wait",
  "!cur-grab",
  "md:!cur-copy",

  // :::::::::::::: LAYOUT ::::::::::::::

  // /layout/align-content.js
  "ac-start",
  "!ac-center",
  "group-hover:!ac-evenly",

  // /layout/align-items.js
  "ai-start",
  "!ai-flex-start",
  "md:ai-center",
  "ai-stretch",

  // /layout/alignment.js

  // /layout/align-self.js
  "as-auto",
  "as-flex-start",
  "!as-center",
  "disabled:as-stretch",

  // /layout/aspect-ratio.js
  "ar-1",
  "ar-1/2",
  "ar-0.5",
  "!ar-2/3",
  "ar-auto",
  "ar-cinema",

  // /layout/coordinate.js

  // /layout/display.js
  "!d-flex",
  "d-hidden",
  "!d-none",
  "d-grid",
  "dark:sm:d-block",

  // /layout/flex-basis.js
  // /layout/flex-grow.js
  "grow-initial",
  "grow-0",
  "!grow-1",

  // /layout/flex.js
  "flex-y",
  "flex-y",
  "fd-row",
  "!flex-row",
  "fw-wrap",
  "active:fw-nowrap",

  // /layout/flex-shrink.js
  "shrink-0",
  "shrink-inherit",
  "!shrink-5",
  "xl:!shrink-2",

  // /layout/grid-cols.js
  // /layout/grid.js
  // /layout/grid-rows.js
  // /layout/grid-span.js

  // /layout/justify-content.js
  "jc-start",
  "!jc-flex-start",
  "focus-visible:jc-center",
  "jc-evenly",
  "jc-between",

  // /layout/justify-self.js
  // /layout/object-fit.js

  // /layout/overflow.js
  "ov-hidden",
  "!ov-x-clip",
  "odd:!ov-visible",

  // /layout/position.js

  // /layout/size.js
  "w-4",
  "min-w-3",
  "w-2/3",
  "w-2.5",
  "!max-w-sm",
  "w-fit",
  "w-full",
  "w-screen",
  "!w-screen-h",
  "last:h-12",

  // /layout/size-unit.js
  "w-48px",
  "!min-w-12vw",
  "group-selected:!max-h-26cm",

  // /layout/transforms.js
  // /layout/z-index.js

  // :::::::::::::: SPACING ::::::::::::::

  // /spacing/gap.js
  "gap-0",
  "!gap-2",
  "gap-4",
  "gap-x-2.5",
  "lg:gap-5/2",

  // /spacing/gap-unit.js
  "gap-0px",
  "gap-53mm",
  "gap-x-12vw",
  "!gap-y-5%",
  "2xl:hover:gap-3",

  // /spacing/margin-unit.js
  "m-2px",
  "m-4.2px",
  "m-3/2px",
  "hover:m-3rem",
  "dark:md:hover:m-2.5em",

  // /spacing/margin.js
  "m-0",
  "!m-0",
  "md:m-auto",
  "hover:m-auto",
  "dark:md:hover:!m-auto",
  "m-1",
  "!m-2",
  "!-m-4",
  "dark:md:hover:!m-8",
  "m-2.5",
  "m-12/3",

  // /spacing/paddding-unit.js
  "p-4px",
  "p-3.2px",
  "p-3/2px",
  "!p-2",
  "dark:md:hover:p-4vw",

  // /spacing/padding.js
  "p-0",
  "!p-0",
  "dark:md:hover:!px-0",
  "p-1",
  "dark:md:hover:!p-2",
  "!py-2.5",
  "p-2/3",
  "ps-0",

  // :::::::::::::: TYPOGRAPHY ::::::::::::::

  // /typography/font-family.js
  "ff-mono",
  "!ff-handwritten",

  // /typography/font-size-fluid.js

  // /typography/font-size.js
  "fs-sm",
  "!fs-xl",
  "md:!fs-5xl",

  // /typography/font-weight.js
  "fw-thin",
  "!fw-350",
  "selected:!fw-bold",

  // /typography/heading.js
  "h1",
  "h2",
  "h3",
  "!h4",
  "hover:h5",
  "dark:portrait:hover:!h6",

  // /typography/letter-spacing.js
  // /typography/line-height.js

  // /typography/text-alignment.js
  "text-center",
  "text-start",
  "text-justify",
  "!text-end",

  // /typography/text-color.js
  "text-red",
  "text-title/50",
  "text-body-200",
  "!text-container-300/10",

  // /typography/text-decoration.js
  "td-u",
  "!td-s",
  "td-w-2",
  "!td-w-5.5",
  "td-w-3/2rem",
  "td-y-12",
  "!td-y-3.6",
  "!td-y-3.6vw",

  // /typography/text-wrap.js
  // /typography/white-space.js

  /*
  "p-2",
  "p-1/2",
  "-m-2",
  "!m-32px",
  "hover:bg-blue-500",
  "md:flex",
  "dark:md:hover:bg-red-300/30",
  "object-contain",
  "of-cover",
  "!of-cover",
  "ov-hidden",
  "!of-contain",
  "!ov-x-hidden",
  "ov-auto",

  "hue-rotate-45",
  "-hue-rotate-45",
  "hue-rotate-45deg",
  "-hue-rotate-45deg",
  "hue-rotate-3/4turn",
  "-hue-rotate-1/4turn",

  "opacity-inherit",
  "opacity-initial",
  "opacity-revert",
  "opacity-unset",
  "opacity-50",

  "pattern-angle-50",
  "pattern-angle-50deg",
  "-pattern-angle-50deg",
  "!-pattern-angle-50deg",
  "pattern-angle-1/4",
  "pattern-angle-1/3turn",
  "-pattern-angle-1/3turn",

  "flex-row",
  "!flex-x",
  "fd-row",
  "fd-col",
  "fw-wrap",

  "lh-sm",
  "lh-150%",
  "!lh-15",
  "!lh-sm",
  "lh-2em",
  "lh-3/2em",
  "lh-12px",
  "lh-none",

  "!align-cc",
  "align-center-center",
  "!align-top-center",
  "align-top-center",
  "align-tl",
  "align-br",
  "align-bl",

  */
];
