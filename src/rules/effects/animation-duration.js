export const rules = {
  // Static rules can be added here if needed (e.g., "anim-dur-0")
};

export const patterns = [
  {
    /**
     * Matches:
     * anim-dur-200, !anim-dur-1s, anim-dur-500ms, !anim-dur-2.5
     * 
     * Group 1: (!?)       -> Importance
     * Group 2: ([0-9.]+)  -> Numerical value
     * Group 3: (s|ms)?    -> Optional unit (s or ms)
     */
    test: new RegExp(`^(!?)anim-dur-([0-9.]+)(s|ms)?$`),
    parse: (match) => {
      const util = match[0];
      const isImportant = match[1] === "!";
      const value = match[2];
      const unit = match[3];

      // Format duration value: use explicit unit if provided, 
      // otherwise default to milliseconds ('ms') for unitless numbers
      const durationValue = unit ? `${value}${unit}` : `${value}ms`;

      return {
        isImportant,
        identifier: ".",
        rules: [
          {
            // Selector is passed raw (e.g., "!anim-dur-2.5")
            // Downstream generator handles escaping the "!" and special characters
            selector: util,
            declarations: [
              { "animation-duration": durationValue },
            ],
          },
        ],
      };
    },
  },
];