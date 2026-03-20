import { staticMap, dynamicPatterns } from "./rules/index.js";



export function resolveCoreStyle(cls) {

  // 1. Check static maps first (Performance)
  if (staticMap[cls]) return staticMap[cls];

  // 2. Check dynamic regex patterns
  for (const pattern of dynamicPatterns) {
    const match = cls.match(pattern.test);
    if (match) {
      return pattern.parse(match);
    }
  }

  // 3. If the class is not found, returns null
  return null;
}


