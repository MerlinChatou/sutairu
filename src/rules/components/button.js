const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral', 'dark'];

const getBtnDeclarations = (key, state = '') => [
  { 'background-color': `var(--su-btn-${key}-bg${state})` },
  { 'border-color': `var(--su-btn-${key}-border${state})` },
  { 'color': `var(--su-btn-${key}-text${state})` },
  { 'outline': `var(--su-btn-${key}-outline${state})` }
];

export const patterns = [
  {
    test: new RegExp(`^btn-(${colors.join('|')})$`),
    parse: (match) => {
      const [, key] = match;
      const selector = match[0];

      return {
        rules: [
          { 
            selector, 
            declarations: getBtnDeclarations(key) 
          },
          { 
            selector, 
            suffix: ':hover', 
            declarations: [...getBtnDeclarations(key, '-hover'), { 'cursor': 'pointer' }] 
          },
          { 
            selector, 
            suffix: ':focus', 
            declarations: getBtnDeclarations(key, '-focus') 
          },
          { 
            selector, 
            suffix: ':focus-visible', 
            declarations: getBtnDeclarations(key, '-focus-visible') 
          },
          { 
            selector, 
            suffix: ':active', 
            declarations: getBtnDeclarations(key, '-active') 
          },
          { 
            selector, 
            suffix: '.selected', 
            declarations: getBtnDeclarations(key, '-selected') 
          },
          { 
            selector, 
            suffix: ':is(:disabled, [aria-disabled="true"])', 
            declarations: [...getBtnDeclarations(key, '-disabled'), { 'cursor': 'not-allowed' }] 
          }
        ]
      };
    }
  }
];