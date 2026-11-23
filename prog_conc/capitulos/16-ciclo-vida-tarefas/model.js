(function (root) {
  'use strict';

  const STATES = ['pendente', 'em execução', 'sucesso', 'falha', 'cancelada', 'timeout'];

  function createLifecycleSchedule(poolSize = 2) {
    const defs = [
      { id: 'T1', duration: 2 },
      { id: 'T2', duration: 4, failAt: 2 },
      { id: 'T3', duration: 3 },
      { id: 'T4', duration: 2, joins: 'T2', joinTimeout: 3 },
    ];
    const tasks = defs.map((d) => ({
      ...d,
      state: 'pendente',
      progress: 0,
      joinWait: 0,
    }));
    const steps = [];
    const queue = [...tasks];
    const running = [];

    const snapshotStep = (time) =>
      steps.push({
        time,
        tasks: tasks.map((t) => ({ id: t.id, state: t.state, progress: t.progress })),
        running: running.map((t) => t.id),
        queue: queue.filter((t) => t.state === 'pendente').map((t) => t.id),
      });

    snapshotStep(0);
    let time = 0;

    while (time < 18) {
      time++;
      while (running.length < poolSize) {
        const next = queue.find((t) => {
          if (t.state !== 'pendente') return false;
          if (!t.joins) return true;
          const target = tasks.find((x) => x.id === t.joins);
          return target && ['sucesso', 'falha', 'cancelada'].includes(target.state);
        });
        if (!next) break;
        running.push(next);
        next.state = 'em execução';
      }

      for (const t of [...running]) {
        t.progress++;
        if (t.failAt && t.progress === t.failAt) {
          t.state = 'falha';
          running.splice(running.indexOf(t), 1);
        } else if (t.progress >= t.duration) {
          t.state = 'sucesso';
          running.splice(running.indexOf(t), 1);
        }
      }

      for (const t of tasks) {
        if (t.joins && t.state === 'pendente') {
          const target = tasks.find((x) => x.id === t.joins);
          if (target && target.state === 'em execução') {
            t.joinWait++;
            if (t.joinWait >= t.joinTimeout) t.state = 'timeout';
          }
        }
      }

      snapshotStep(time);
      if (tasks.every((t) => !['pendente', 'em execução'].includes(t.state))) break;
    }

    return { steps, duration: steps.length, poolSize };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.steps.length));
    const step = schedule.steps[Math.max(0, elapsed - 1)];
    return { ...step, done: elapsed === schedule.steps.length, elapsed };
  }

  const api = { STATES, createLifecycleSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LifecycleLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);