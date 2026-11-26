(function (root) {
  'use strict';

  function makeAccount(initial) {
    let balance = Number(initial);
    if(!Number.isFinite(balance)||balance<0) throw new RangeError('saldo inicial inválido');
    return {
      deposit(amount) {
        const a = Number(amount);
        if (!Number.isFinite(a) || a <= 0) throw new RangeError('depósito inválido');
        balance += a;
        return balance;
      },
      withdraw(amount) {
        const a = Number(amount);
        if (!Number.isFinite(a) || a <= 0) throw new RangeError('saque inválido');
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