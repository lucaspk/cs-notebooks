'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { compare } = require('./model.js');

describe('cap 07 concorrência modelo', () => {
  it('mesmo contador final', () => {
    const r = compare(3);
    assert.ok(r.sameFinal);
    assert.strictEqual(r.shared.final, 3);
  });
});