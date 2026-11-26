(function (root) {
  'use strict';
  const api = {
    count: state => Object.values(state).filter(Boolean).length,
    total: ({ quantity, price }) => quantity * price,
    rows: ({ quantity, price }) => [[quantity, price, quantity * price]],
    snapshot: (plan, time) => ({ time: Math.min(time, plan.length), done: time >= plan.length, steps: plan.slice(0, time) }),
  };
  root.ReferenceLab = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
