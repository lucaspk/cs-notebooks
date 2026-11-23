'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { runWithSync, RACE, MUTEX_A, ATOMIC } = require('./model.js');

test('mutex e atomic corrigem o contador', () => {
  assert.equal(runWithSync(RACE, 'none').counter, 1);
  assert.equal(runWithSync(MUTEX_A, 'mutex').counter, 2);
  assert.equal(runWithSync(ATOMIC, 'atomic').counter, 2);
});