'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { runSequence, PRESETS } = require('./model.js');

test('invariante x=2 falha com entrelaceamento perdido', () => {
  assert.equal(runSequence(PRESETS.safe).counter, 2);
  assert.equal(runSequence(PRESETS.lost).counter, 1);
  assert.equal(runSequence(PRESETS.lost).invariantOk, false);
});