'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createSequentialSchedule, snapshot } = require('./model.js');

test('sequencial termina A antes de começar B', () => {
  const { schedule, duration, finishA, finishB } = createSequentialSchedule(3, 2);
  assert.equal(duration, 5);
  assert.equal(finishA, 3);
  assert.equal(finishB, 5);
  assert.deepEqual(schedule.flat(), ['A', 'A', 'A', 'B', 'B']);
});

test('snapshot reflete fila única sem sobreposição', () => {
  const { schedule } = createSequentialSchedule(4, 4);
  assert.deepEqual(snapshot(schedule, 2, 4, 4).progress, { A: 2, B: 0 });
  assert.equal(snapshot(schedule, 2, 4, 4).state.B, 'Aguardando');
  assert.deepEqual(snapshot(schedule, 5, 4, 4).progress, { A: 4, B: 1 });
  assert.deepEqual(snapshot(schedule, 8, 4, 4).state, { A: 'Concluída', B: 'Concluída' });
});