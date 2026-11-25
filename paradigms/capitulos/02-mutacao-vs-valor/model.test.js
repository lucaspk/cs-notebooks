'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { run } = require('./model.js');

describe('cap 02 mutação vs valor', () => {
  it('mutação surpreende B', () => {
    const r = run('mutate', 5);
    assert.ok(r.bSurprise);
    assert.deepStrictEqual(r.B.items, r.A.items);
  });
  it('cópia mantém B', () => {
    const r = run('copy', 5);
    assert.ok(!r.bSurprise);
    assert.strictEqual(r.B.total, 10);
    assert.strictEqual(r.A.total, 15);
  });
});