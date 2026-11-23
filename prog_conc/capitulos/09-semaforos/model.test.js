'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { WORKERS, createPoolSchedule, snapshot } = require('./model.js');

test('semáforo limita pico de ocupação e todos terminam', () => {
  const cap = 2;
  const work = 2;
  const limited = createPoolSchedule(cap, work, false);
  const unlimited = createPoolSchedule(cap, work, true);
  assert.ok(limited.ticks.length > 0);
  for (const tick of limited.ticks) {
    assert.ok(tick.maxInside <= cap);
    assert.ok(tick.inside.length <= cap);
  }
  const unlimitedPeak = Math.max(...unlimited.ticks.map((t) => t.maxInside));
  assert.equal(unlimitedPeak, WORKERS.length);
  const limitedPeak = Math.max(...limited.ticks.map((t) => t.maxInside));
  assert.ok(limitedPeak <= cap);
  const end = snapshot(limited, limited.duration, work);
  assert.equal(end.done, true);
  for (const w of WORKERS) assert.equal(end.progress[w], work);
});