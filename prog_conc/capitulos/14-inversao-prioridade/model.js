(function (root) {
  'use strict';

  function createInversionSchedule(mitigated) {
    const steps = [];
    let mutexHolder = 'L';
    let hWaiting = false;
    let mRunning = false;
    let lProgress = 0;
    const lGoal = 3;
    let guard = 0;

    const push = (note) =>
      steps.push({
        mutexHolder,
        hWaiting,
        mRunning,
        lProgress,
        note,
        inverted: hWaiting && mutexHolder === 'L' && mRunning,
      });

    push('L segura o mutex e começa a seção crítica.');
    hWaiting = true;
    push('H precisa do mutex e bloqueia.');
    if (!mitigated) {
      mRunning = true;
      push('M (prioridade média) executa e atrasa L.');
      while (lProgress < lGoal && guard++ < 20) {
        push('M ainda executa; H continua bloqueada.');
      }
    } else {
      push('M preemptado: núcleo prioriza conclusão de L.');
      while (lProgress < lGoal) {
        lProgress++;
        push(`L avança sob proteção de inversão (${lProgress}/${lGoal}).`);
      }
      mutexHolder = null;
      hWaiting = false;
      push('L libera; H adquire o mutex.');
    }

    if (!mitigated && guard >= 0) {
      while (lProgress < lGoal) {
        lProgress++;
        push(`L avança um bloco (${lProgress}/${lGoal}).`);
        mRunning = lProgress < 2;
      }
      mutexHolder = null;
      hWaiting = false;
      push('L libera o mutex; H finalmente executa.');
    }

    const inverted = steps.some((s) => s.inverted);
    return { steps, duration: steps.length, mitigated: Boolean(mitigated), inverted, lGoal };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.steps.length));
    const step = elapsed > 0 ? schedule.steps[elapsed - 1] : null;
    return {
      ...step,
      done: elapsed === schedule.steps.length,
      elapsed,
    };
  }

  const api = { createInversionSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PriorityInversionLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);