'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { compare } = require('./model.js');

describe('cap 05 composição', () => {
  it('mesmo texto final', () => {
    const r = compare('oi');
    assert.ok(r.same);
    assert.ok(r.composition.includes('oi'));
  });
});