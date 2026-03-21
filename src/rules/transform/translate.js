const getTransformEngine = () => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

export const patterns = [
  {
    /**
     * Matches: mv-x-10, !-mv-y-50%, mv-x-2rem
     */
    test: /^(!?)(-?)mv-(x|y)-(\d*\.?\d+)(px|rem|%|em)?$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNeg = match[2] === "-";
      const axis = match[3];
      const num = match[4];
      const unit = match[5] || "px";

      const value = `${isNeg ? "-" : ""}${num}${unit}`;
      const variable = `--su-tr-${axis}`;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [{ [variable]: value }, getTransformEngine()]
        }]
      };
    }
  }
];