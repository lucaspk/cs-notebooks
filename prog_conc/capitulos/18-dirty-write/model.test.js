'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createScenario, snapshot, MODES } = require('./model.js');

test('escrita suja ou bloqueio conforme o modo', () => {
  const loose = snapshot(createScenario('sem-protecao'), 6);
  assert.equal(loose.committed.nota, 'C');
  assert.equal(loose.anomaly, true);
  const strict = snapshot(createScenario('bloqueia-escrita-sujeja'), 4);
  assert.equal(strict.blocked, true);
  assert.equal(strict.committed.nota, 'A');
});

test('todos os modos expostos geram roteiro completo', () => {
  for (const mode of MODES) {
    const scenario = createScenario(mode);
    const end = snapshot(scenario, scenario.steps.length);
    assert.equal(end.done, true);
  }
});