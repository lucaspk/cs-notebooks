'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildFrame, totalOnWire, stepsEncapsulate, snapshot } = require('./model.js');

test('cada encapsulamento aumenta bytes no fio', () => {
  const frame = buildFrame(100, 'udp');
  const steps = stepsEncapsulate(frame);
  const totals = steps.map((s) => s.bytes);
  for (let i = 1; i < totals.length; i++) assert.ok(totals[i] >= totals[i - 1]);
  assert.equal(totalOnWire(frame), 100 + 8 + 20 + 14);
});

test('roteador no snapshot alterna modo router', () => {
  const frame = buildFrame(64, 'tcp');
  const encLen = stepsEncapsulate(frame).length;
  const mid = snapshot(frame, encLen);
  assert.equal(mid.mode, 'router');
  assert.match(mid.step.label, /IP|Ethernet/i);
});