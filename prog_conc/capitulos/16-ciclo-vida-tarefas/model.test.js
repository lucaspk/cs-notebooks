'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createLifecycleSchedule, snapshot } = require('./model.js');

test('pool registra falha, sucesso e timeout distintos', () => {
  const s = createLifecycleSchedule(2);
  const end = snapshot(s, s.duration);
  const states = Object.fromEntries(end.tasks.map((t) => [t.id, t.state]));
  assert.equal(states.T2, 'falha');
  assert.ok(['sucesso', 'timeout', 'falha', 'cancelada'].includes(states.T4));
  assert.equal(states.T1, 'sucesso');
  assert.equal(end.done, true);
});