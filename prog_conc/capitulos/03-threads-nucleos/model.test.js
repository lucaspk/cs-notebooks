'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createThreadScheduler, snapshot } = require('./model.js');

test('1 núcleo e 2 threads alterna; 2 núcleos executam pares', () => {
  const one = createThreadScheduler({ cores: 1, threadWorks: [3, 3], quantum: 1 });
  assert.equal(one.duration, 6);
  assert.deepEqual(one.schedule.map((t) => t[0]?.id).filter(Boolean), ['T1', 'T2', 'T1', 'T2', 'T1', 'T2']);
  const two = createThreadScheduler({ cores: 2, threadWorks: [2, 2, 2, 2], quantum: 1 });
  assert.equal(two.duration, 4);
  assert.ok(two.schedule.every((tick) => tick.filter((s) => s).length <= 2));
});

test('progresso preserva trabalho total por thread', () => {
  const sched = createThreadScheduler({ cores: 2, threadWorks: [3, 1, 2], quantum: 1 });
  const works = [3, 1, 2];
  const end = snapshot(sched.schedule, sched.duration, works);
  assert.equal(end.progress.T1, 3);
  assert.equal(end.progress.T2, 1);
  assert.equal(end.progress.T3, 2);
});