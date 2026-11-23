'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { amdahlSpeedup, amdahlTimeline, compareFalseSharing } = require('./model.js');

test('Amdahl: speedup limitado pela parte sequencial', () => {
  assert.equal(amdahlSpeedup(0, 4), 1);
  assert.ok(amdahlSpeedup(0.9, 16) < 8);
  assert.ok(amdahlSpeedup(0.5, 2) > 1);
});

test('mais workers além do limite rende menos ganho marginal', () => {
  const t = amdahlTimeline(0.25, 8);
  const first = t.points[1].speedup - t.points[0].speedup;
  const last = t.points[7].speedup - t.points[6].speedup;
  assert.ok(first > last);
});

test('false sharing aumenta tráfego', () => {
  const c = compareFalseSharing(4, 10);
  assert.ok(c.shared.traffic > c.padded.traffic);
});