'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { applyPipeline } = require('./model.js');

describe('cap 03 primeira classe', () => {
  it('pipeline double+inc', () => {
    const r = applyPipeline([1, -2], ['double', 'inc']);
    assert.deepStrictEqual(r.result, [3, -3]);
  });
});