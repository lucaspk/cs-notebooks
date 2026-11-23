'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot } = require('./model.js');

test('read skew quebra soma; snapshot mantém consistência', () => {
  const rc = snapshot(createScenario('read-committed'), 7);
  assert.equal(rc.sum, 1100);
  assert.equal(rc.anomaly, true);
  const snap = snapshot(createScenario('snapshot'), 7);
  assert.equal(snap.sum, 1000);
  assert.equal(snap.anomaly, false);
});