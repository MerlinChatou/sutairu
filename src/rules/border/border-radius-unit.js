import { spacingUnitPattern } from "../constants.js";

const sideMap = {
  r: ["border-radius"],
  rt: ["border-top-left-radius", "border-top-right-radius"],
  rb: ["border-bottom-left-radius", "border-bottom-right-radius"],
  rl: ["border-top-left-radius", "border-bottom-left-radius"],
  rr: ["border-top-right-radius", "border-bottom-right-radius"],
  rtl: ["border-top-left-radius"],
  rtr: ["border-top-right-radius"],
  rbl: ["border-bottom-left-radius"],
  rbr: ["border-bottom-right-radius"],
};

export const patterns = [
  {
    // Matches: r-12vw, rt-5vh, !rl-20px, r-10%
    test: new RegExp(`^(!?)(r|rt|rb|rl|rr|rtl|rtr|rbl|rbr)-([0-9.]+?)${spacingUnitPattern}$`),
    parse: (match) => {
      const isImportant = match[1] === "!";
      const properties = sideMap[match[2]];
      const value = match[3];
      const unit = match[4];

      const cssValue = `${value}${unit}${isImportant ? " !important" : ""}`;

      return properties.map((p) => `${p}: ${cssValue};`).join(" ");
    },
  },
];
