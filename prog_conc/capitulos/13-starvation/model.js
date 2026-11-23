(function (root) {
  'use strict';

  const TASKS = ['H', 'M', 'L'];
  const priority = { H: 3, M: 2, L: 1 };
  const GOALS = { H: 20, M: 20, L: 3 };

  /** fair: rodízio; unfair: sempre maior prioridade com meta pendente */
  function createStarvationSchedule(fair) {
    const progress = { H: 0, M: 0, L: 0 };
    const ticks = [];
    const maxTicks = 12;
    let rr = 0;

    for (let t = 0; t < maxTicks; t++) {
      const eligible = TASKS.filter((id) => progress[id] < GOALS[id]);
      let ran = null;
      if (eligible.length) {
        if (fair) {
          ran = eligible[rr % eligible.length];
          rr++;
        } else {
          ran = eligible.sort((a, b) => priority[b] - priority[a])[0];
        }
        progress[ran]++;
      }
      ticks.push({ progress: { ...progress }, ran, ready: eligible });
    }

    const starved = progress.L < GOALS.L;
    return { ticks, duration: ticks.length, fair: Boolean(fair), starved, workPerTask: GOALS.L };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.ticks.length));
    const tick = elapsed > 0 ? schedule.ticks[elapsed - 1] : null;
    const progress = tick?.progress ?? { H: 0, M: 0, L: 0 };
    const done = elapsed === schedule.ticks.length;
    return { progress, ran: tick?.ran ?? null, done, elapsed, starved: schedule.starved && done };
  }

  const api = { TASKS, createStarvationSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.StarvationLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);