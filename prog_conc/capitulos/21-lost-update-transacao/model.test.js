'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot } = require('./model.js');

test('lost update deixa saldo 120; controle otimista aborta T2', () => {
  const loose = snapshot(createScenario('sem-controle'), 8);
  assert.equal(loose.committed.saldo, 120);
  assert.equal(loose.anomaly, true);
  const strict = snapshot(createScenario('bloqueio-otimista'), 8);
  assert.equal(strict.committed.saldo, 150);
  assert.equal(strict.aborted, true);
});