'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDeadlockSchedule, snapshot } = require('./model.js');

test('ordem oposta entra em deadlock; ordem fixa conclui', () => {
  const risky = createDeadlockSchedule(false);
  const safe = createDeadlockSchedule(true);
  assert.equal(risky.deadlock, true);
  assert.equal(safe.deadlock, false);
  const rEnd = snapshot(risky, risky.duration);
  assert.equal(rEnd.deadlock, true);
  const sEnd = snapshot(safe, safe.duration);
  assert.equal(sEnd.done, true);
  assert.equal(sEnd.work.A, safe.workGoal);
  assert.equal(sEnd.work.B, safe.workGoal);
});