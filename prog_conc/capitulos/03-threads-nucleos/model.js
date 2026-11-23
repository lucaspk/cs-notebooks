(function (root) {
  'use strict';

  function createThreadScheduler({ cores, threadWorks, quantum }) {
    if (!Number.isInteger(cores) || cores < 1) throw new RangeError('Núcleos inválidos.');
    if (!Number.isInteger(quantum) || quantum < 1) throw new RangeError('Quantum inválido.');
    if (!Array.isArray(threadWorks) || !threadWorks.length) throw new RangeError('Threads inválidas.');
    const remaining = threadWorks.map((w, i) => ({ id: `T${i + 1}`, left: w }));
    const schedule = [];
    let round = 0;
    while (remaining.some((t) => t.left > 0)) {
      const ready = remaining.filter((t) => t.left > 0);
      const tick = [];
      for (let c = 0; c < cores; c++) {
        if (!ready.length) {
          tick.push(null);
          continue;
        }
        const thread = ready[(round + c) % ready.length];
        const slice = Math.min(quantum, thread.left);
        tick.push({ id: thread.id, slice });
        thread.left -= slice;
      }
      schedule.push(tick);
      round++;
    }
    const duration = schedule.length;
    return {
      schedule,
      duration,
      threads: threadWorks.map((w, i) => ({ id: `T${i + 1}`, work: w })),
    };
  }

  function snapshot(schedule, time, threadWorks) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.length));
    const progress = Object.fromEntries(threadWorks.map((_, i) => [`T${i + 1}`, 0]));
    for (const tick of schedule.slice(0, elapsed)) {
      for (const slot of tick) {
        if (slot && slot.id) progress[slot.id] += slot.slice;
      }
    }
    const active = elapsed > 0 && elapsed <= schedule.length ? schedule[elapsed - 1] : [];
    const done = elapsed === schedule.length;
    const state = {};
    for (let i = 0; i < threadWorks.length; i++) {
      const id = `T${i + 1}`;
      const total = threadWorks[i];
      const running = active.some((slot) => slot && slot.id === id);
      if (progress[id] === total) state[id] = 'Concluída';
      else if (running) state[id] = 'Executando';
      else if (elapsed === 0) state[id] = 'Pronta';
      else state[id] = 'Na fila de prontas';
    }
    return { progress, active, state, done, elapsed };
  }

  const api = { createThreadScheduler, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ThreadSchedulerLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);