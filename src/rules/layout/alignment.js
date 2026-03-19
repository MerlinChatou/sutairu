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

// All 9 coordinate pairs
const pairs = [
  ['t', 'l'], ['t', 'c'], ['t', 'r'],
  ['c', 'l'], ['c', 'c'], ['c', 'r'],
  ['b', 'l'], ['b', 'c'], ['b', 'r']
];

export const rules = pairs.reduce((acc, [yKey, xKey]) => {
  const yName = terms[yKey];
  const xName = terms[xKey];
  
  const props = {
    'display': 'flex',
    'justify-content': matrix[xName],
    'align-items': matrix[yName]
  };

  const build = (p, imp) => Object.entries(p)
    .map(([k, v]) => `${k}: ${v}${imp ? ' !important' : ''};`).join(' ');

  // 1. Shorthand: align-cc
  const shortKey = `align-${yKey}${xKey}`;
  acc[shortKey] = build(props, false);
  acc[`!${shortKey}`] = build(props, true);

  // 2. Full Name: align-center-center
  const fullKey = `align-${yName}-${xName}`;
  acc[fullKey] = build(props, false);
  acc[`!${fullKey}`] = build(props, true);
  
  return acc;
}, {});