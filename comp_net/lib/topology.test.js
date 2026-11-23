'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createTopology, findPath, hopDelays } = require('./topology.js');

test('encontra caminho e soma atrasos por enlace', () => {
  const topo = createTopology(['A', 'S', 'B'], [
    { from: 'A', to: 'S', delayMs: 2 },
    { from: 'S', to: 'B', delayMs: 5 },
  ]);
  const path = findPath(topo, 'A', 'B');
  assert.deepEqual(path, ['A', 'S', 'B']);
  const { hops, totalDelayMs } = hopDelays(topo, path);
  assert.equal(hops.length, 2);
  assert.equal(totalDelayMs, 7);
});

test('sem rota retorna null', () => {
  const topo = createTopology(['A', 'B', 'C'], [{ from: 'A', to: 'B', delayMs: 1 }]);
  assert.equal(findPath(topo, 'A', 'C'), null);
});