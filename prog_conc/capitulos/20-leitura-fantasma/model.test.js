'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot } = require('./model.js');

test('consulta repetida ganha linha fantasma só em read committed', () => {
  const rc = snapshot(createScenario('read-committed'), 6);
  assert.deepEqual([rc.firstCount, rc.secondCount], [1, 2]);
  assert.equal(rc.anomaly, true);
  const rr = snapshot(createScenario('repeatable-read'), 6);
  assert.deepEqual([rr.firstCount, rr.secondCount], [1, 1]);
  assert.equal(rr.anomaly, false);
});