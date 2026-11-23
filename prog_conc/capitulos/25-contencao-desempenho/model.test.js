'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { simulateContention, snapshot } = require('./model.js');

test('lock único: mais workers implica mais tempo de espera', () => {
  const low = simulateContention({ workers: 2, cores: 2, localTicks: 2, criticalTicks: 2, sharded: false });
  const high = simulateContention({ workers: 6, cores: 2, localTicks: 2, criticalTicks: 2, sharded: false });
  assert.ok(high.aggregate.waiting >= low.aggregate.waiting);
  assert.ok(high.duration >= low.duration);
});

test('sharding reduz espera com vários locks', () => {
  const shared = simulateContention({ workers: 4, cores: 4, localTicks: 2, criticalTicks: 2, sharded: false });
  const sharded = simulateContention({ workers: 4, cores: 4, localTicks: 2, criticalTicks: 2, sharded: true });
  assert.ok(sharded.aggregate.waiting <= shared.aggregate.waiting);
});

test('snapshot avança e termina no fim da simulação', () => {
  const run = simulateContention({ workers: 3, cores: 2, localTicks: 2, criticalTicks: 1, sharded: false });
  assert.equal(snapshot(run, 0).done, false);
  assert.equal(snapshot(run, run.duration).done, true);
  assert.ok(snapshot(run, run.duration - 1).frame);
});