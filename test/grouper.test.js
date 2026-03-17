import { test } from "node:test";
import assert from "node:assert/strict";
import { groupClassesByVariant } from "../src/grouper.js";

test("groupClassesByVariant groups classes correctly", () => {
  const input = ["flex", "m-4", "md:m-5", "md:text-center", "md:portrait:p-2", "md:portrait:p-3", "dark:md:portrait:hover:bg-red"];

  const expected = {
    _utilities: ["flex", "m-4"],
    md: {
      _utilities: ["m-5", "text-center"],
      portrait: {
        _utilities: ["p-2", "p-3"],
      },
    },
    // New nested branch for the dark chain
    dark: {
      _utilities: [],
      md: {
        _utilities: [],
        portrait: {
          _utilities: [],
          hover: {
            _utilities: ["bg-red"],
          },
        },
      },
    },
  };

  const result = groupClassesByVariant(input);

  // Deep equality check
  assert.deepEqual(result, expected);
});

test("handles classes without variants", () => {
  const input = ["block", "hidden"];
  const result = groupClassesByVariant(input);
  assert.deepEqual(result._utilities, ["block", "hidden"]);
});
