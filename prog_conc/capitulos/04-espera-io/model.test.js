'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createIoSchedule, snapshot } = require('./model.js');

test('durante I/O de A, B usa o núcleo', () => {
  const s = createIoSchedule({ cpuBefore: 1, ioTicks: 2, cpuAfter: 1, cpuB: 2 });
  const ioTicks = s.schedule.filter((t) => t.a === 'io');
  assert.ok(ioTicks.some((t) => t.b === 'cpu'));
  assert.equal(snapshot(s.schedule, s.duration).progress.bCpu, 2);
});

test('sem I/O longo, B espera mais', () => {
  const s = createIoSchedule({ cpuBefore: 3, ioTicks: 0, cpuAfter: 0, cpuB: 2 });
  assert.ok(s.schedule.every((t) => t.core !== 'B' || t.a !== 'cpu'));
});