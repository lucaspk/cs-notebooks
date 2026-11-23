'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot } = require('./model.js');

test('write skew esvazia plantão ou é abortado', () => {
  const loose = snapshot(createScenario('sem-serializacao'), 8);
  assert.equal(loose.onCall, 0);
  assert.equal(loose.anomaly, true);
  const strict = snapshot(createScenario('serializavel'), 8);
  assert.ok(strict.onCall >= 1 || strict.aborted);
});