'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot, ISOLATIONS } = require('./model.js');

test('leitura suja aparece só sem proteção de commit', () => {
  for (const isolation of ISOLATIONS) {
    const scenario = createScenario(isolation);
    const atRead = snapshot(scenario, 4);
    assert.equal(atRead.t2Read, isolation === 'read-uncommitted' ? 200 : 100);
    const end = snapshot(scenario, scenario.steps.length);
    assert.equal(end.committed.saldo, 100);
    if (isolation === 'read-uncommitted') assert.equal(end.anomaly, true);
    else assert.equal(end.anomaly, false);
  }
});

test('criar cenário rejeita isolamento desconhecido', () => {
  assert.throws(() => createScenario('serializable'), RangeError);
});