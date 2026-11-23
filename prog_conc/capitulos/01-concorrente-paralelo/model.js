(function (root) {
  'use strict';

  function createSchedules(work, quantum) {
    if (!Number.isInteger(work) || work < 1 || !Number.isInteger(quantum) || quantum < 1) {
      throw new RangeError('Trabalho e intervalo de alternância devem ser inteiros positivos.');
    }
    const remaining = { A: work, B: work };
    const concurrent = [];
    while (remaining.A || remaining.B) {
      for (const task of ['A', 'B']) {
        for (let block = 0; block < quantum && remaining[task] > 0; block++) {
          concurrent.push([task]);
          remaining[task]--;
        }
      }
    }
    const parallel = Array.from({ length: work }, () => ['A', 'B']);
    return { concurrent, parallel, duration: concurrent.length };
  }

  function snapshot(schedule, time, work) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.length));
    const progress = { A: 0, B: 0 };
    for (const tick of schedule.slice(0, elapsed)) {
      for (const task of tick) progress[task]++;
    }
    const done = elapsed === schedule.length;
    // The highlighted block is the interval just completed by the latest step.
    const active = elapsed > 0 && !done ? schedule[elapsed - 1] : [];
    const state = {};
    for (const task of ['A', 'B']) {
      state[task] = progress[task] === work ? 'Concluída' : active.includes(task) ? 'Executando' : elapsed === 0 ? 'Pronta' : 'Aguardando';
    }
    return { progress, active, state, done, elapsed };
  }

  const api = { createSchedules, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ExecutionLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
