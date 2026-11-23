'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildIncrementPlan, runIncrementSchedule } = require('./model.js');

test('sem sincronização: lost update no contador', () => {
  const r = buildIncrementPlan('none');
  assert.ok(r.lostUpdates > 0);
  assert.ok(r.final < r.expected);
});

test('mutex: incrementos não se perdem', () => {
  const r = buildIncrementPlan('mutex');
  assert.equal(r.final, r.expected);
});

test('CAS: pelo menos uma falha e resultado melhor que corrida pura', () => {
  const race = buildIncrementPlan('none');
  const cas = buildIncrementPlan('cas');
  assert.ok(cas.timeline.some((f) => f.casFail));
  assert.ok(cas.final >= race.final);
});