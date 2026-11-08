import { test } from "node:test";
import { compileCSS } from "../src/compiler.js";
import { sampleClasses } from "./fixtures.js";



// Loop through your sample classes to create individual test cases
sampleClasses.forEach((className) => {
  test(`compiler: ${className}`, async (t) => {
    // Compile just this one class
    const css = await compileCSS([className]);

    // Clean up the output (remove extra newlines/whitespace)
    const sanitizedCss = css.trim();

    // The snapshot will now be specific to this one class
    t.assert.snapshot(sanitizedCss);
  });
});
/*
test("compiler snapshot", async (t) => {
  const css = await compileCSS(sampleClasses);
  // Split by newline and trim empty lines to keep the snapshot clean
  const cssLines = css
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  // Native Node.js snapshot assertion
  t.assert.snapshot(cssLines);
});
*/