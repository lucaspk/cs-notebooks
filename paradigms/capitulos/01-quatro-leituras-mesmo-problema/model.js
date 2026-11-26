(function (root) {
  'use strict';

  function sumImperative(nums) {
    const list = nums.map(Number);
    let acc = 0;
    const trace = [{ kind: 'init', acc: 0 }];
    for (const n of list) {
      acc += n;
      trace.push({ kind: 'add', n, acc });
    }
    return { style: 'imperativo', value: acc, trace };
  }

  function sumFold(nums) {
    const list = nums.map(Number);
    let acc = 0;
    const trace = [{ kind: 'init', acc: 0 }];
    for (const n of list) {
      acc = ((a, x) => a + x)(acc, n);
      trace.push({ kind: 'fold', n, acc });
    }
    return { style: 'dobragem', value: acc, trace };
  }

  function sumReduce(nums) {
    const list = nums.map(Number);
    const trace = [{ kind: 'init', acc: 0 }];
    const value = list.reduce((a, n) => {
      const next = a + n;
      trace.push({ kind: 'reduce', n, acc: next });
      return next;
    }, 0);
    return { style: 'reduce', value, trace };
  }

  function sumPipeline(nums) {
    const operations = nums.map(Number).map((n) => (acc) => acc + n);
    const trace = [{ kind: 'init', acc: 0 }];
    const value = operations.reduce((acc, operation) => {
      const next = operation(acc);
      const n = next - acc;
      trace.push({ kind: 'pipe', n, acc: next });
      return next;
    }, 0);
    return { style: 'pipeline', value, trace };
  }

  const STYLES = {
    imperative: sumImperative,
    fold: sumFold,
    reduce: sumReduce,
    pipeline: sumPipeline,
  };

  function runAll(nums) {
    const parsed = String(nums ?? '')
      .split(/[\s,;]+/)
      .filter(Boolean)
      .map(Number);
    if (parsed.some((n) => !Number.isFinite(n))) throw new RangeError('números inválidos');
    if (parsed.length === 0) throw new RangeError('lista vazia');
    const results = Object.fromEntries(
      Object.entries(STYLES).map(([key, fn]) => [key, fn(parsed)])
    );
    const values = new Set(Object.values(results).map((r) => r.value));
    return { nums: parsed, results, sameResult: values.size === 1 };
  }

  function snapshot(run, styleKey, time) {
    const res = run.results[styleKey];
    if (!res) return { done: true, steps: res?.trace ?? [], active: null };
    const total = res.trace.length;
    const t = Math.max(0, Math.min(Math.floor(time), total));
    return {
      steps: res.trace.slice(0, t),
      active: t > 0 && t < total ? res.trace[t] : null,
      done: t >= total,
      time: t,
      total,
      value: res.value,
      style: res.style,
    };
  }

  const api = { STYLES, sumImperative, sumFold, sumReduce, sumPipeline, runAll, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ParadigmSumLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);