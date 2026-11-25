(function (root) {
  'use strict';

  function makeAccount(initial) {
    let balance = Number(initial) || 0;
    return {
      deposit(amount) {
        const a = Number(amount);
        if (a <= 0) throw new RangeError('depósito inválido');
        balance += a;
        return balance;
      },
      withdraw(amount) {
        const a = Number(amount);
        if (a <= 0) throw new RangeError('saque inválido');
        if (a > balance) throw new RangeError('saldo insuficiente');
        balance -= a;
        return balance;
      },
      balance() {
        return balance;
      },
    };
  }

  function brokenAccount(initial) {
    return { balance: Number(initial) || 0 };
  }

  const api = { makeAccount, brokenAccount };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EncapLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);