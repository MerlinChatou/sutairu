const terms = {
  t: 'top',
  c: 'center',
  b: 'bottom',
  l: 'left',
  r: 'right'
};

const matrix = {
  top:    'flex-start',
  center: 'center',
  bottom: 'flex-end',
  left:   'flex-start',
  right:  'flex-end'
};

const pairs = [
  ['t', 'l'], ['t', 'c'], ['t', 'r'],
  ['c', 'l'], ['c', 'c'], ['c', 'r'],
  ['b', 'l'], ['b', 'c'], ['b', 'r']
];

export const rules = pairs.reduce((acc, [yKey, xKey]) => {
  const yName = terms[yKey];
  const xName = terms[xKey];
  
  const declarations = [
    {
      'display': 'flex',
      'justify-content': matrix[xName],
      'align-items': matrix[yName]
    }
  ];

  const createEntry = (key, isImportant) => ({
    isImportant,
    rules: [
      {
        selector: isImportant ? `!${key}` : key,
        declarations
      }
    ]
  });

  // 1. Shorthand: align-tl, !align-tl
  const shortKey = `align-${yKey}${xKey}`;
  acc[shortKey] = createEntry(shortKey, false);
  acc[`!${shortKey}`] = createEntry(shortKey, true);

  // 2. Full Name: align-top-left, !align-top-left
  const fullKey = `align-${yName}-${xName}`;
  acc[fullKey] = createEntry(fullKey, false);
  acc[`!${fullKey}`] = createEntry(fullKey, true);
  
  return acc;
}, {});