'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createStarvationSchedule, snapshot } = require('./model.js');

test('prioridade maximalista inaniciona L; rodízio não', () => {
  const unfair = createStarvationSchedule(false);
  const fair = createStarvationSchedule(true);
  assert.equal(unfair.starved, true);
  assert.equal(fair.starved, false);
  const f = snapshot(fair, fair.duration);
  assert.equal(f.progress.L, unfair.workPerTask);
});