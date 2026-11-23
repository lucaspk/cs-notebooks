'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildAbaDemo } = require('./model.js');

test('sem stamp: armadilha ABA', () => {
  const r = buildAbaDemo(false);
  assert.equal(r.abaTrap, true);
  assert.equal(r.linearizable, false);
});

test('com stamp/versão: detecta mudança intermediária', () => {
  const r = buildAbaDemo(true);
  assert.equal(r.abaTrap, false);
  assert.ok(r.history.some((h) => h.detail.includes('falhou')));
});