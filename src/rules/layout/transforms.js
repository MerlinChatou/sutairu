/**
 * The Transform Engine Object
 * Ensures all transform variables are composed into a single property.
 */
const getTransformEngine = (isImportant) => ({
  "transform": `translateX(var(--su-tr-x, 0)) translateY(var(--su-tr-y, 0)) rotate(var(--su-rot, 0)) scaleX(calc(var(--su-sc-x, 1) * var(--su-sc, 1))) scaleY(calc(var(--su-sc-y, 1) * var(--su-sc, 1)))`
});

export const patterns = [
  {
    /**
     * Move (Translate)
     * Matches: !mv-x-10, -mv-y-4, mv-x-50%
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
          declarations: [
            { [variable]: value },
            getTransformEngine()
          ]
        }]
      };
    },
  },
  {
    /**
     * Rotate
     * Matches: rot-45, !-rot-90, rot-30deg
     */
    test: /^(!?)(-?)rot-(\d+)(deg)?$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const value = match[3];
      
      const finalValue = `${isNegative ? "-" : ""}${value}deg`;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [
            { "--su-rot": finalValue },
            getTransformEngine()
          ]
        }]
      };
    },
  },
  {
    /**
     * Scale
     * Matches: sc-150 (1.5), !-sc-x-100 (-1)
     */
    test: /^(!?)(-?)sc-(?:(x|y)-)?(\d+)$/,
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const isNegative = match[2] === "-";
      const axis = match[3]; // 'x', 'y', or undefined
      const rawValue = parseInt(match[4], 10);
      
      const multiplier = (isNegative ? -1 : 1) * (rawValue / 100);
      const variable = `--su-sc${axis ? `-${axis}` : ""}`;

      return {
        isImportant,
        rules: [{
          selector: util,
          declarations: [
            { [variable]: multiplier.toString() },
            getTransformEngine()
          ]
        }]
      };
    },
  },
];