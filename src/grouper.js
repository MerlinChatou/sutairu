/**
 * Nested Grouping Engine
 * Transforms ['dark:md:m-4', 'flex'] into:
 * {
 * _utilities: ['flex'],
 * dark: {
 * md: { _utilities: ['m-4'] }
 * }
 * }
 */
export function groupClassesByVariant(allUniqueClasses) {
  const tree = { _utilities: [] };

  for (const fullClass of allUniqueClasses) {
    const parts = fullClass.split(':');
    const utility = parts.pop();
    const variants = parts; // e.g., ['dark', 'md']

    // Start at the root of the tree
    let currentNode = tree;

    // Traverse (or create) the path for each variant
    for (const variant of variants) {
      if (!currentNode[variant]) {
        currentNode[variant] = { _utilities: [] };
      }
      currentNode = currentNode[variant];
    }
    if (utility == '') console.log ('full-class', fullClass);
    // Push the utility into the leaf node
    currentNode._utilities.push(utility);
  }

  return tree;
}