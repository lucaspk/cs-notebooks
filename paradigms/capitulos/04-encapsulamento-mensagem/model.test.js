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
it('rejected withdrawal preserves the previous balance',()=>{
 const acc=makeAccount(20);
 assert.throws(()=>acc.withdraw(30),RangeError);
 assert.strictEqual(acc.balance(),20);
 assert.throws(()=>acc.deposit(Infinity),RangeError);
 assert.strictEqual(acc.balance(),20);
 acc.withdraw(20);assert.strictEqual(acc.balance(),0);
});
it('rejects invalid initial state',()=>assert.throws(()=>makeAccount(-1),RangeError));
