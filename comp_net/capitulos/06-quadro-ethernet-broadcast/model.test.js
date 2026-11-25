'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createLan, buildSendPlan, BROADCAST_MAC } = require('./model.js');

const DEMO_LAN = createLan([
  { id: 'A', mac: 'aa:11:11:11:11:01', label: 'Host A' },
  { id: 'B', mac: 'aa:11:11:11:11:02', label: 'Host B' },
  { id: 'C', mac: 'aa:11:11:11:11:03', label: 'Host C' },
]);

test('broadcast alcança todos exceto o emissor', () => {
  const plan = buildSendPlan(DEMO_LAN, 'A', BROADCAST_MAC);
  assert.equal(plan.recipients.length, 2);
  assert.ok(plan.isBroadcast);
});

test('unicast só entrega ao MAC destino', () => {
  const plan = buildSendPlan(DEMO_LAN, 'A', 'aa:11:11:11:11:02');
  assert.equal(plan.recipients.length, 1);
  assert.equal(plan.recipients[0].id, 'B');
});