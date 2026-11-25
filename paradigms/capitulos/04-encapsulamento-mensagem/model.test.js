'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { makeAccount } = require('./model.js');

describe('cap 04 encapsulamento', () => {
  it('saldo via mensagens', () => {
    const acc = makeAccount(10);
    acc.deposit(5);
    assert.strictEqual(acc.balance(), 15);
    acc.withdraw(3);
    assert.strictEqual(acc.balance(), 12);
  });
  it('saldo só via função balance()', () => {
    const acc = makeAccount(1);
    assert.strictEqual(typeof acc.balance, 'function');
    assert.strictEqual(acc.balance(), 1);
  });
});