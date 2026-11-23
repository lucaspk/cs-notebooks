(function (root) {
  'use strict';

  function createSequentialSchedule(workA, workB) {
    if (!Number.isInteger(workA) || workA < 1 || !Number.isInteger(workB) || workB < 1) {
      throw new RangeError('Trabalho deve ser inteiro positivo.');
    }
    const schedule = [];
    for (let i = 0; i < workA; i++) schedule.push(['A']);
    for (let i = 0; i < workB; i++) schedule.push(['B']);
    return { schedule, duration: schedule.length, finishA: workA, finishB: workA + workB };
  }

  function snapshot(schedule, time, workA, workB) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.length));
    const progress = { A: 0, B: 0 };
    for (const tick of schedule.slice(0, elapsed)) {
      for (const task of tick) progress[task]++;
    }
    const done = elapsed === schedule.length;
    const active = elapsed > 0 && !done ? schedule[elapsed - 1] : [];
    const state = {};
    for (const task of ['A', 'B']) {
      const total = task === 'A' ? workA : workB;
      if (progress[task] === total) state[task] = 'Concluída';
      else if (active.includes(task)) state[task] = 'Executando';
      else if (elapsed === 0) state[task] = 'Pronta';
      else if (task === 'B' && progress.A < workA) state[task] = 'Aguardando';
      else state[task] = 'Aguardando';
    }
    return { progress, active, state, done, elapsed };
  }

  const api = { createSequentialSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SequentialLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);