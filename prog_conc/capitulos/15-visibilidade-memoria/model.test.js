'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createVisibilitySchedule, snapshot } = require('./model.js');

test('publicação insegura expõe bug; segura não', () => {
  const unsafe = createVisibilitySchedule(false);
  const safe = createVisibilitySchedule(true);
  assert.equal(unsafe.hasBug, true);
  assert.equal(safe.hasBug, false);
  const u = snapshot(unsafe, unsafe.duration);
  assert.equal(u.bug, true);
  const s = snapshot(safe, safe.duration);
  assert.equal(s.reader.data, 42);
  assert.equal(s.reader.ready, 1);
});