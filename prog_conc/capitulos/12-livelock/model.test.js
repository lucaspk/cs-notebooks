'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createLivelockSchedule, snapshot } = require('./model.js');

test('cedência educada não conclui; backoff conclui', () => {
  const polite = createLivelockSchedule(false);
  const pragmatic = createLivelockSchedule(true);
  assert.equal(polite.done, false);
  assert.equal(pragmatic.done, true);
  assert.ok(polite.steps.length >= pragmatic.steps.length);
  const end = snapshot(pragmatic, pragmatic.duration);
  assert.equal(end.aPos, pragmatic.goal);
  assert.equal(end.bPos, pragmatic.goal);
});