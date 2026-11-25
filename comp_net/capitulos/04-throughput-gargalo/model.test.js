'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { bottleneckMbps, transferTimeMs } = require('./model.js');

test('throughput limitado pelo menor enlace', () => {
  const links = [100, 10, 1000];
  const b = bottleneckMbps(links);
  assert.equal(b.mbps, 10);
  assert.equal(b.index, 1);
});

test('dobrar elo lento aproxima pela metade o tempo', () => {
  const file = 10 * 1024 * 1024;
  const slow = transferTimeMs(file, [100, 5, 100]);
  const faster = transferTimeMs(file, [100, 10, 100]);
  assert.ok(Math.abs(faster / slow - 0.5) < 0.01);
});

test('melhorar elo não-gargalo não muda tempo', () => {
  const file = 1e6;
  const base = transferTimeMs(file, [3, 50, 50]);
  const tweaked = transferTimeMs(file, [3, 500, 500]);
  assert.equal(base, tweaked);
});