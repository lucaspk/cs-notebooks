'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { simulateLoss, classifyPrimaryLoss } = require('./model.js');

test('fila pequena e carga alta aumenta descarte por fila', () => {
  const heavy = simulateLoss({
    arrivals: 60,
    queueCapacity: 3,
    arrivalPerRound: 5,
    serviceSlotsPerRound: 1,
    linkBer: 0,
    seed: 3,
  });
  const light = simulateLoss({
    arrivals: 10,
    queueCapacity: 30,
    arrivalPerRound: 1,
    serviceSlotsPerRound: 4,
    linkBer: 0,
    seed: 3,
  });
  assert.ok(heavy.droppedQueue > light.droppedQueue);
  assert.equal(classifyPrimaryLoss(heavy, 0), 'queue');
});

test('BER sem fila cheia classifica perda no enlace', () => {
  const r = simulateLoss({ arrivals: 20, queueCapacity: 50, serviceSlotsPerRound: 5, linkBer: 0.25, seed: 7 });
  assert.ok(r.droppedLink > 0);
  assert.equal(classifyPrimaryLoss(r, 0.25), 'link');
});

test('entrega 100% quando fila sobra e BER zero', () => {
  const r = simulateLoss({ arrivals: 5, queueCapacity: 10, serviceSlotsPerRound: 3, linkBer: 0, seed: 1 });
  assert.equal(r.droppedQueue, 0);
  assert.equal(r.droppedLink, 0);
  assert.equal(r.delivered, 5);
});