(function (root) {
  'use strict';

  function validateInt(name, value, min, max) {
    if (!Number.isInteger(value) || value < min || value > max) {
      throw new RangeError(`${name} deve ser inteiro entre ${min} e ${max}.`);
    }
  }

  /**
   * @param {{ workers: number, cores: number, localTicks: number, criticalTicks: number, sharded: boolean }} opts
   */
  function simulateContention(opts) {
    const { workers, cores, localTicks, criticalTicks, sharded } = opts;
    validateInt('workers', workers, 2, 8);
    validateInt('cores', cores, 1, 4);
    validateInt('localTicks', localTicks, 1, 6);
    validateInt('criticalTicks', criticalTicks, 1, 4);

    const lockCount = sharded ? Math.min(cores, workers) : 1;
    const locks = Array.from({ length: lockCount }, () => ({ holder: null, left: 0 }));

    const state = Array.from({ length: workers }, (_, id) => ({
      id,
      localLeft: localTicks,
      criticalLeft: criticalTicks,
      phase: 'local',
      useful: 0,
      waiting: 0,
      lockIndex: sharded ? id % lockCount : 0,
    }));

    const timeline = [];
    const maxSteps = workers * (localTicks + criticalTicks) * 8 + 100;

    for (let time = 0; time < maxSteps; time++) {
      const running = [];
      const waiting = [];
      const onCritical = [];

      for (const lock of locks) {
        if (lock.holder === null) continue;
        const w = state[lock.holder];
        lock.left--;
        w.useful++;
        onCritical.push(w.id);
        if (lock.left === 0) {
          w.phase = 'done';
          lock.holder = null;
        }
      }

      let slots = cores;
      for (const w of state) {
        if (slots === 0) break;
        if (w.phase !== 'local' || w.localLeft <= 0) continue;
        w.localLeft--;
        w.useful++;
        running.push(w.id);
        slots--;
        if (w.localLeft === 0) w.phase = 'queue';
      }

      for (const w of state) {
        if (w.phase !== 'queue') continue;
        const lock = locks[w.lockIndex];
        if (lock.holder === null) {
          lock.holder = w.id;
          lock.left = criticalTicks;
          w.phase = 'critical';
        } else {
          w.waiting++;
          waiting.push(w.id);
        }
      }

      const done = state.every((w) => w.phase === 'done');
      timeline.push({ time, running, waiting, onCritical, done });
      if (done) break;
    }

    const aggregate = {
      useful: state.reduce((s, w) => s + w.useful, 0),
      waiting: state.reduce((s, w) => s + w.waiting, 0),
    };
    const denom = aggregate.useful + aggregate.waiting;
    aggregate.efficiency = denom === 0 ? 1 : aggregate.useful / denom;

    return { timeline, duration: timeline.length, workers: state, aggregate, params: opts };
  }

  function snapshot(run, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), run.duration));
    const index = Math.min(elapsed, run.duration - 1);
    const frame = run.timeline[index] || null;
    const done = elapsed >= run.duration;
    return { frame, time: elapsed, done, duration: run.duration, aggregate: run.aggregate, params: run.params };
  }

  const api = { simulateContention, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ContentionLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);