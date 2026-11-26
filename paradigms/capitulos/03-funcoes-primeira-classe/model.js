(function (root) {
  'use strict';

  const OPS = {
    double: (n) => n * 2,
    inc: (n) => n + 1,
    abs: (n) => Math.abs(n),
  };

  function applyPipeline(nums, opKeys) {
    const list = nums.map(Number);
    if(!list.length || list.some(n=>!Number.isFinite(n))) throw new RangeError('Use uma lista de números finitos');
    let step = 0;
    const trace = [{ step: 0, value: [...list], op: 'entrada' }];
    let cur = list;
    for (const key of opKeys) {
      const fn = OPS[key];
      if (!fn) throw new RangeError(`op desconhecida: ${key}`);
      cur = cur.map(fn);
      step += 1;
      trace.push({ step, value: [...cur], op: key });
    }
    return { trace, result: cur };
  }

  const api = { OPS, applyPipeline };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FirstClassLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);