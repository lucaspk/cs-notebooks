'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot, ISOLATIONS } = require('./model.js');

test('segunda leitura muda só em read committed', () => {
  const rc = snapshot(createScenario('read-committed'), 6);
  assert.deepEqual([rc.firstRead, rc.secondRead], [10, 15]);
  assert.equal(rc.anomaly, true);
  const rr = snapshot(createScenario('repeatable-read'), 6);
  assert.deepEqual([rr.firstRead, rr.secondRead], [10, 10]);
  assert.equal(rr.anomaly, false);
});

test('isolamentos válidos', () => {
  assert.deepEqual(ISOLATIONS, ['read-committed', 'repeatable-read']);
});