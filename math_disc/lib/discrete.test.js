'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const D = require('./discrete.js');

describe('math_disc lib', () => {
  it('implication', () => {
    assert.strictEqual(D.evalConnective(true, false, 'IMP'), false);
  });
  it('path', () => {
    assert.ok(D.hasPath({ a: ['b'], b: ['c'] }, 'a', 'c'));
  });
});