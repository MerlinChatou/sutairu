import { staticUtilitiesMap, dynamicUtilitiesPatterns,  staticComponentsMap, dynamicComponentsPatterns  } from "./rules/index.js";



export function resolveCoreUtilitiesStyle(cls) {

  // 1. Check static maps first (Performance)
  if (staticUtilitiesMap[cls]) return staticUtilitiesMap[cls];

  // 2. Check dynamic regex patterns
  for (const pattern of dynamicUtilitiesPatterns) {
    const match = cls.match(pattern.test);
    if (match) {
      return pattern.parse(match);
    }
  }

  // 3. If the class is not found, returns null
  return null;
}



export function resolveCoreComponentsStyle(cls) {

  // 1. Check static maps first (Performance)
  if (staticComponentsMap[cls]) return staticComponentsMap[cls];

  // 2. Check dynamic regex patterns
  for (const pattern of dynamicComponentsPatterns) {
    const match = cls.match(pattern.test);
    if (match) {
      return pattern.parse(match);
    }
  }

  // 3. If the class is not found, returns null
  return null;
}


