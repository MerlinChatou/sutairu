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
  "dotted-green",
  "dotted-white-200",
  "dotted-gray/50",
  "dotted-black-800/80",
  "!dotted-page",
  "sm:dotted-subtle",

  // /background/hatching.js
  "hatching-green",
  "hatching-white-200",
  "hatching-gray/50",
  "hatching-black-800/80",
  "!hatching-page",
  "sm:hatching-subtle",

  // /background/pattern-angle.js
  "!pa-1/4",
  "pattern-angle-35deg",
  "pattern-angle-0.5turn",
  "pattern-angle-3.14rad",
  "pattern-angle-90",

  // /background/pattern-period.js
  "pp-5",
  "pattern-period-20px",
  "pattern-period-20%",
  "pattern-period-1/3",

  // /background/pattern-width.js
  "pw-5",
  "pattern-width-20px",
  "pattern-width-20%",
  "pattern-width-1/3",

  // /background/stripes.js
  "stripes-green",
  "stripes-white-200",
  "stripes-gray/50",
  "stripes-black-800/80",
  "!stripes-page",
  "sm:stripes-subtle",

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
  "r-5px",
  "rb-12rem",
  "r-100%",
  "r-0.5rem",

  // /border/border-style.js
  "b-solid",
  "!b-groove",

  // /border/border-width.js
  "b-1",
  "!b-3/2",
  "b-0.5",
  "even:b-7",

  // /border/border-width-unit.js
  "b-1px",
  "!b-1.5rem",
  "b-1/3cqw",
  "even:b-7vw",

  // :::::::::::::: COMPONENTS ::::::::::::::

  // /components/badge.js
  "badge",
  "badge-pill",
  "badge-outline",
  "!badge-dot",

  // /components/btn-close.js
  "btn-close",
  "btn-close-red",
  "btn-close-red-800",
  "btn-close-red-800/50",

  // /components/card.js
  "card",

  // /components/group.js
  // /components/masonry.js
  "masonry",
  "!masonry",

  // /components/modal.js
  "modal",
  "modal-content",

  // :::::::::::::: EFFECTS ::::::::::::::

  // /effects/blur.js
  "blur-50",
  "blur-2rem",
  "!blur-3/2rem",
  "blur-12.5px",

  // /effects/brightness.js
  "brightness-50",
  "brightness-2/3",
  "!brightness-0.6",

  // /effects/contrast.js
  "contrast-50",
  "contrast-0.7",
  "contrast-0.33333333",
  "contrast-2/3",
  "!contrast-60",

  // /effects/grayscale.js
  "grayscale-50",
  "grayscale-5/2",
  "grayscale-0.6",
  "sm:!grayscale-80",

  // /effects/hue-rotate.js
  "hue-rotate-90",
  "!hue-rotate-90deg",
  "hue-rotate-3.6rad",
  "hue-rotate-180/2",
  "hue-rotate-1/4turn",

  // /effects/invert.js
  "invert-80",
  "invert-0.8333333",
  "!invert-1/2",

  // /effects/opacity.js
  "opacity-0.5",
  "opacity-50",
  "!opacity-1/2",

  // /effects/saturate.js
  "saturate-200",
  "saturate-0.2",
  "!saturate-3/2",

  // /effects/sepia.js
  "sepia-200",
  "sepia-0.2",
  "!sepia-3/2",

  // /effects/transitions.js
  "tr-colors",
  "tr-colors-200-ease-out",
  "tr-opacity-200-150-ease-in",
  "tr-bg-500-ease-in",
  "tr-opacity-200-cubic(0.1,0.7,1.0,0.1)",
  "tr-shadow-step(1,end)",

  // :::::::::::::: INTERACTIVITY ::::::::::::::

  // /interactivity/cursor.js
  "cur-wait",
  "!cur-grab",
  "md:!cur-copy",

  // /interactivity/outline-color.js
  "ol-red",
  "!ol-blue/50",
  "ol-green-200",
  "ol-cyan-600/80",

  // /interactivity/outline-style.js
  "ol-solid",
  "!ol-groove",
  "focus:ol-dashed",

  // /interactivity/outline-width.js
  "ol-5",
  "!ol-12",

  // /interactivity/outline-width-unit.js
  "ol-5rem",
  "!ol-12px",

  // /interactivity/pointer-events.js
  "pe-none",
  "!pe-all",

  // /interactivity/resize.js
  "resize-none",
  "!resize-vertical",

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
  "align-cc",
  "!align-tr",
  "!align-bottom-left",

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
  "top-50%",
  "top-middle",
  "!-left-20rem",
  "inset-middle",
  "inset-x-20%",
  "!inset-y-20vw",

  // /layout/display.js
  "!d-flex",
  "d-hidden",
  "!d-none",
  "d-grid",
  "dark:sm:d-block",

  // /layout/flex-basis-static.js
  "fb-auto",
  "fb-max",
  "fb-fit",
  "!fb-content",

  // /layout/flex-basis-dynamic.js
  "fb-1/2",
  "fb-200",
  "fb-150rem",
  "fb-0",
  "!fb-50vw",

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
  
  // /layout/grid.js
  "grid-y",
  "hover:grid-x",
  "!grid-col",

  // /layout/grid-cols.js
  "grid-cols-12",
  "!grid-cols-2",
  "grid-cols-subgrid",
  "!grid-cols-none",

  // /layout/grid-rows.js
  "grid-rows-3",
  "grid-rows-none",
  "!grid-cols-subgrid",

  // /layout/grid-span.js
  "gc-span-2",
  "gr-span-full",

  // /layout/justify-content.js
  "jc-start",
  "!jc-flex-start",
  "focus-visible:jc-center",
  "jc-evenly",
  "jc-between",

  // /layout/justify-self.js
  "js-auto",
  "js-start",
  "hover:!js-center",


  // /layout/object-fit.js
  "of-cover",
  "!object-none",
  "object-cover",

  // /layout/overflow.js
  "ov-hidden",
  "!ov-x-clip",
  "odd:!ov-visible",

  // /layout/position.js
  "pos-static",
  "!pos-rel",
  "md:!pos-sticky",

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

  // /layout/stack.js
  "stack",
  "!stack",
  
  // /layout/z-index.js
  "z-base",
  "z-sticky",
  "even:!z-100",

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

  // :::::::::::::: TRANSFORM ::::::::::::::

  // /transform/rotate.js
  "rot-45",
  "rot-1/4turn",
  "-rot-180/3deg",
  "!rot-1/3",

  // /transform/scale.js
  "sc-110",
  "sc-15",
  "sc-x-12",
  "!sc-y-50.5",
  "sc-x-3/2",

  // /transform/translate.js
  "mv-x-10",
  "mv-y-20px",
  "-mv-x-10%",
  "!mv-x-50%",
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
  "ls-md",
  "-ls-xl",
  "ls-12rem",
  "!ls-5.2px",
  "ls-5",
  "ls-3/2",
  "ls-0.5",
  "ls-12.3rem",

  // /typography/line-height.js
  "lh-none",
  "lh-5",
  "lh-2%",
  "lh-2/3",
  "!lh-xs",
  "md:lh-12px",

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

  // /typography/text-transform.js
  "tt-capitalize",
  "tt-none",
  "!tt-capitalize",

  // /typography/text-wrap.js
  "text-nowrap",
  "text-wrap",
  "!text-pretty",

  // /typography/white-space.js
  "ws-normal",
  "!ws-pre",
];
