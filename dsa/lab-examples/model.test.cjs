const { test } = require('node:test');
const assert = require('node:assert/strict');
const model = require('./model.js');
test('checklist counts selected evidence only', () => assert.equal(model.count({ input: true, environment: false }), 1));
test('calculation and table agree on the worked example', () => {
  assert.equal(model.total({ quantity: 3, price: 4 }), 12);
  assert.deepEqual(model.rows({ quantity: 3, price: 4 }), [[3, 4, 12]]);
});
test('step simulation completes and clamps the clock', () => {
  assert.deepEqual(model.snapshot(['entrada', 'cálculo'], 10), { time: 2, done: true, steps: ['entrada', 'cálculo'] });
});
