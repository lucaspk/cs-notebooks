(function (root) {
  'use strict';

  function baseCart() {
    return { total: 10, items: [10] };
  }

  /** B aponta para o mesmo array interno de A (aliasing). */
  function scenarioMutate(delta) {
    const A = baseCart();
    const B = { total: A.total, items: A.items };
    A.total += delta;
    A.items.push(delta);
    return {
      mode: 'mutate',
      delta,
      A: { total: A.total, items: [...A.items] },
      B: { total: B.total, items: [...B.items] },
      bSurprise: B.items.length > 1,
    };
  }

  /** B mantém cópia; alteração em A não compartilha array. */
  function scenarioCopy(delta) {
    const A = baseCart();
    const B = { total: A.total, items: [...A.items] };
    const A2 = { total: A.total + delta, items: [...A.items, delta] };
    return {
      mode: 'copy',
      delta,
      A: A2,
      B,
      bSurprise: B.total !== 10,
    };
  }

  function run(mode, delta) {
    const d = Number(delta);
    if (!Number.isFinite(d)) throw new RangeError('delta inválido');
    return mode === 'mutate' ? scenarioMutate(d) : scenarioCopy(d);
  }

  const api = { scenarioMutate, scenarioCopy, run };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MutationLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);