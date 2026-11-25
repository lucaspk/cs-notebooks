'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { computeDelays, msTransmission } = require('./model.js');

test('transmissão domina com enlace lento e fila pequena', () => {
  const d = computeDelays({
    distanceKm: 50,
    linkMbps: 1,
    packetBytes: 1500,
    queueMs: 0,
    processMs: 1,
  });
  assert.equal(d.dominant, 'transmission');
  assert.ok(d.transmission > d.propagation);
});

test('fila pode dominar quando transmissão e propagação são baixas', () => {
  const d = computeDelays({
    distanceKm: 10,
    linkMbps: 1000,
    packetBytes: 64,
    queueMs: 80,
    processMs: 1,
  });
  assert.equal(d.dominant, 'queue');
  assert.equal(d.rtt, 2 * d.oneWay);
});

test('RTT é ida e volta simétrica', () => {
  const d = computeDelays({ distanceKm: 100, linkMbps: 100, packetBytes: 1000, queueMs: 5, processMs: 2 });
  const expectedOneWay =
    d.propagation + d.transmission + d.queue + d.processing;
  assert.equal(Math.abs(d.oneWay - expectedOneWay) < 0.001, true);
  assert.equal(d.rtt, 2 * expectedOneWay);
});

test('msTransmission escala com tamanho do pacote', () => {
  const small = msTransmission(500, 10);
  const big = msTransmission(2000, 10);
  assert.ok(big > small);
});