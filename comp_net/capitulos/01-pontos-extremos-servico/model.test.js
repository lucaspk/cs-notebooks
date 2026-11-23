'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createDeliveryPlan, snapshot, payloadByteLength } = require('./model.js');

test('mesmos bytes na rede; interpretação muda só na aplicação B', () => {
  const plan = createDeliveryPlan('Olá');
  assert.equal(plan.bytes, payloadByteLength('Olá'));
  const endText = snapshot(plan, plan.steps.length, 'text');
  const endJson = snapshot(plan, plan.steps.length, 'json');
  assert.equal(endText.steps.at(-1).ok, true);
  assert.equal(endJson.steps.at(-1).ok, false);
  assert.match(endText.steps.find((s) => s.id === 'transit').body, /opaco/);
});

test('avanço monotônico e reinício em zero', () => {
  const plan = createDeliveryPlan('ping');
  for (let t = 0; t <= plan.steps.length; t++) {
    const view = snapshot(plan, t, 'text');
    assert.equal(view.time, t);
    assert.equal(view.done, t >= plan.steps.length);
    assert.equal(view.steps.length, t);
  }
});