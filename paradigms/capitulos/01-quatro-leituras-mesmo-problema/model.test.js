'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { runAll, sumImperative, sumReduce } = require('./model.js');

describe('cap 01 paradigms — quatro leituras', () => {
  it('mesmo resultado em todos os estilos', () => {
    const run = runAll('1 2 3 4');
    assert.ok(run.sameResult);
    assert.strictEqual(run.results.imperative.value, 10);
  });
  it('imperativo e reduce batem', () => {
    const nums = [5, -2, 7];
    assert.strictEqual(sumImperative(nums).value, sumReduce(nums).value);
  });
  it('rejeita lista vazia', () => {
    assert.throws(() => runAll(''), RangeError);
  });
});