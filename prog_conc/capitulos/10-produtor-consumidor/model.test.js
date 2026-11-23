'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createBufferSchedule, snapshot } = require('./model.js');

test('modo sincronizado não excede capacidade e consome tudo', () => {
  const s = createBufferSchedule(2, 6, true);
  for (const tick of s.ticks) assert.ok(tick.buffer <= 2);
  const end = snapshot(s, s.duration);
  assert.equal(end.consumed, 6);
  assert.equal(end.done, true);
});

test('modo inseguro pode acumular acima da capacidade', () => {
  const s = createBufferSchedule(2, 6, false);
  assert.ok(s.ticks.some((t) => t.overCapacity));
});