'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createInversionSchedule, snapshot } = require('./model.js');

test('cenário bruto registra inversão; mitigado conclui mais cedo', () => {
  const raw = createInversionSchedule(false);
  const mitigated = createInversionSchedule(true);
  assert.equal(raw.inverted, true);
  assert.ok(mitigated.duration < raw.duration);
  const end = snapshot(mitigated, mitigated.duration);
  assert.equal(end.done, true);
});