(function (root) {
  'use strict';

  const WORKERS = ['A', 'B', 'C', 'D'];

  /**
   * Simula trabalho dentro de um recurso compartilhado limitado por semáforo.
   * unlimited=true: todos podem estar dentro ao mesmo tempo.
   */
  function createPoolSchedule(capacity, work, unlimited) {
    if (!Number.isInteger(work) || work < 1) throw new RangeError('Trabalho deve ser inteiro positivo.');
    const cap = unlimited ? WORKERS.length : capacity;
    if (!unlimited && (!Number.isInteger(capacity) || capacity < 1)) {
      throw new RangeError('Capacidade do semáforo deve ser inteiro positivo.');
    }

    const progress = Object.fromEntries(WORKERS.map((w) => [w, 0]));
    const inPool = new Set();
    const waiting = [];
    const ticks = [];

    function admit() {
      for (const w of WORKERS) {
        if (progress[w] >= work || inPool.has(w) || waiting.includes(w)) continue;
        if (inPool.size < cap) inPool.add(w);
        else waiting.push(w);
      }
    }

    admit();
    let guard = 0;
    while (WORKERS.some((w) => progress[w] < work)) {
      if (++guard > 500) throw new Error('Simulação do pool excedeu limite.');
      admit();
      const inside = [...inPool].sort();
      for (const w of inside) progress[w]++;
      const finished = inside.filter((w) => progress[w] >= work);
      for (const w of finished) inPool.delete(w);
      if (finished.length && waiting.length) {
        for (const w of waiting.splice(0)) {
          if (inPool.size < cap) inPool.add(w);
          else waiting.push(w);
        }
      }
      ticks.push({
        inside,
        waiting: [...waiting],
        progress: { ...progress },
        maxInside: inside.length,
      });
      admit();
    }

    return { ticks, duration: ticks.length, capacity: cap, work, unlimited: Boolean(unlimited) };
  }

  function snapshot(schedule, time, work) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.ticks.length));
    const tick = elapsed > 0 ? schedule.ticks[elapsed - 1] : null;
    const progress = tick?.progress ?? Object.fromEntries(WORKERS.map((w) => [w, 0]));
    const inside = tick?.inside ?? [];
    const waiting = tick?.waiting ?? [];
    const done = elapsed === schedule.ticks.length;
    const peakInside = schedule.ticks.reduce((m, t) => Math.max(m, t.maxInside), 0);
    return { progress, inside, waiting, done, elapsed, peakInside };
  }

  const api = { WORKERS, createPoolSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SemaphoreLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);