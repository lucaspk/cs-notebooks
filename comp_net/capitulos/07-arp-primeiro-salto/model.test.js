'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createSubnet, buildArpPlan, applyCache } = require('./model.js');

const HOSTS = createSubnet([
  { id: 'A', hostOctet: 1, mac: 'aa:01', label: 'A' },
  { id: 'B', hostOctet: 2, mac: 'aa:02', label: 'B' },
]);

test('primeira resolução usa request broadcast e reply unicast', () => {
  const cache = {};
  const plan = buildArpPlan(HOSTS, 'A', '10.0.0.2', cache);
  assert.equal(plan.cacheHit, false);
  assert.ok(plan.steps.some((s) => s.id === 'request' && s.broadcast));
  applyCache(plan, cache);
  const again = buildArpPlan(HOSTS, 'A', '10.0.0.2', cache);
  assert.equal(again.cacheHit, true);
});

test('fora da sub-rede não faz ARP direto ao destino', () => {
  const plan = buildArpPlan(HOSTS, 'A', '192.0.2.1', {});
  assert.equal(plan.viaGateway, true);
});