import { test } from 'node:test';
import { compileCSS } from '../src/compiler.js';
import { sampleClasses } from './fixtures.js';
  

test('compiler snapshot', async (t) => {  
  const css = await compileCSS(sampleClasses);

  // Native Node.js snapshot assertion
  t.assert.snapshot(css);
});
