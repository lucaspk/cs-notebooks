'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createQueue, enqueue, dequeue, occupancy } = require('./queue.js');

test('aceita até a capacidade e descarta o restante', () => {
  const q = createQueue(2);
  assert.equal(enqueue(q, 'a').accepted, true);
  assert.equal(enqueue(q, 'b').accepted, true);
  assert.equal(enqueue(q, 'c').accepted, false);
  assert.equal(q.dropped, 1);
  assert.equal(occupancy(q), 1);
  assert.deepEqual(dequeue(q), { item: 'a', size: 1 });
  assert.deepEqual(dequeue(q), { item: 'b', size: 0 });
  assert.deepEqual(dequeue(q), { item: null, size: 0 });
});