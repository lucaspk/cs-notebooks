'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { runRmw, EXPLAIN } = require('./model.js');

test('entrelaceamento clássico perde uma atualização', () => {
  assert.equal(runRmw(EXPLAIN.serialized).counter, 2);
  assert.equal(runRmw(EXPLAIN.interleaved).counter, 1);
  assert.ok(runRmw(EXPLAIN.interleaved).lost);
});