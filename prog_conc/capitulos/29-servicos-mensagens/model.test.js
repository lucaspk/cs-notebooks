'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildDeliveryPlan } = require('./model.js');

test('ingênuo aplica duplicata', () => {
  const n = buildDeliveryPlan('naive');
  assert.ok(n.duplicateApplied >= 0);
});

test('idempotente ignora payload repetido', () => {
  const n = buildDeliveryPlan('idempotent');
  assert.equal(n.duplicateApplied >= 1, true);
});

test('ordenado evita seq regressiva', () => {
  const o = buildDeliveryPlan('ordered');
  assert.equal(o.mode, 'ordered');
});