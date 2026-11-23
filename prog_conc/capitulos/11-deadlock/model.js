(function (root) {
  'use strict';

  const TASKS = ['A', 'B'];

  function cloneState(A, B, free) {
    return {
      state: {
        A: { holds: [...A.holds], waiting: A.waiting, work: A.work },
        B: { holds: [...B.holds], waiting: B.waiting, work: B.work },
      },
      free: { ...free },
    };
  }

  function createDeadlockSchedule(fixedOrder) {
    const steps = [];
    let A = { holds: [], waiting: null, work: 0 };
    let B = { holds: [], waiting: null, work: 0 };
    let free = { R1: true, R2: true };
    const goal = 3;

    const actions = fixedOrder
      ? [
          ['A', 'R1', 'lock'], ['B', 'wait'], ['A', 'R2', 'lock'], ['A', 'work'],
          ['A', 'R2', 'unlock'], ['A', 'work'], ['A', 'R1', 'unlock'], ['A', 'work'],
          ['B', 'R1', 'lock'], ['B', 'R2', 'lock'], ['B', 'work'], ['B', 'work'], ['B', 'work'],
          ['B', 'R2', 'unlock'], ['B', 'R1', 'unlock'],
        ]
      : [
          ['A', 'R1', 'lock'], ['B', 'R2', 'lock'], ['A', 'R2', 'block'], ['B', 'R1', 'block'],
        ];

    let deadlock = false;
    for (const action of actions) {
      if (action[1] === 'wait') {
        steps.push({ ...cloneState(A, B, free), deadlock: false, work: { A: A.work, B: B.work } });
        continue;
      }
      if (action[1] === 'work') {
        if (action[0] === 'A') A.work++;
        else B.work++;
      } else if (action[2] === 'lock' && action[1] !== 'block') {
        const r = action[1];
        free[r] = false;
        (action[0] === 'A' ? A : B).holds.push(r);
      } else if (action[2] === 'unlock') {
        const r = action[1];
        free[r] = true;
        const t = action[0] === 'A' ? A : B;
        t.holds = t.holds.filter((x) => x !== r);
      } else if (action[2] === 'block') {
        const r = action[1];
        (action[0] === 'A' ? A : B).waiting = r;
        if (A.waiting === 'R2' && B.waiting === 'R1' && A.holds.includes('R1') && B.holds.includes('R2')) {
          deadlock = true;
        }
      }
      steps.push({ ...cloneState(A, B, free), deadlock, work: { A: A.work, B: B.work } });
      if (deadlock) break;
    }

    if (fixedOrder) {
      while (A.work < goal) {
        A.work++;
        steps.push({ ...cloneState(A, B, free), deadlock: false, work: { A: A.work, B: B.work } });
      }
      while (B.work < goal) {
        B.work++;
        steps.push({ ...cloneState(A, B, free), deadlock: false, work: { A: A.work, B: B.work } });
      }
    }

    return { steps, duration: steps.length, fixedOrder: Boolean(fixedOrder), deadlock, workGoal: goal };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.steps.length));
    const step = elapsed > 0 ? schedule.steps[elapsed - 1] : null;
    const done = !schedule.deadlock && elapsed === schedule.steps.length;
    return {
      state: step?.state ?? {
        A: { holds: [], waiting: null, work: 0 },
        B: { holds: [], waiting: null, work: 0 },
      },
      free: step?.free ?? { R1: true, R2: true },
      deadlock: step?.deadlock ?? false,
      work: step?.work ?? { A: 0, B: 0 },
      done,
      elapsed,
    };
  }

  const api = { TASKS, createDeadlockSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DeadlockLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);