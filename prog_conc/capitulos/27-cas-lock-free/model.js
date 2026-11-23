(function (root) {
  'use strict';

  const RACE_SCHEDULE = [
    { thread: 'A', op: 'read' },
    { thread: 'B', op: 'read' },
    { thread: 'A', op: 'write' },
    { thread: 'B', op: 'write' },
    { thread: 'A', op: 'read' },
    { thread: 'A', op: 'write' },
    { thread: 'B', op: 'read' },
    { thread: 'B', op: 'write' },
  ];

  function runRace(mode) {
    let value = 0;
    const registers = { A: null, B: null };
    const timeline = [];

    for (let i = 0; i < RACE_SCHEDULE.length; i++) {
      const step = { ...RACE_SCHEDULE[i], index: i, valueBefore: value, casFail: false };
      if (step.op === 'read') {
        registers[step.thread] = value;
        step.event = `observou ${value}`;
      } else if (mode === 'none') {
        value = (registers[step.thread] ?? value) + 1;
        step.event = `gravou ${value}`;
      } else if (mode === 'cas') {
        const expected = registers[step.thread];
        if (value !== expected) {
          step.casFail = true;
          registers[step.thread] = value;
          step.event = `CAS falhou; re-lê ${value}`;
          value = value + 1;
          registers[step.thread] = value;
          step.event = `CAS falhou → re tentativa ${value}`;
        } else {
          value = expected + 1;
          registers[step.thread] = value;
          step.event = `CAS ok → ${value}`;
        }
      }
      step.valueAfter = value;
      timeline.push(step);
    }

    const expected = RACE_SCHEDULE.filter((s) => s.op === 'write').length;
    return { mode, timeline, final: value, expected, lostUpdates: expected - value };
  }

  function runMutex() {
    let value = 0;
    const timeline = [];
    const order = [
      { thread: 'A', op: 'inc' },
      { thread: 'B', op: 'inc' },
      { thread: 'A', op: 'inc' },
      { thread: 'B', op: 'inc' },
    ];
    for (let i = 0; i < order.length; i++) {
      const step = { ...order[i], index: i, valueBefore: value, event: 'mutex exclusivo', casFail: false };
      value += 1;
      step.valueAfter = value;
      timeline.push(step);
    }
    return { mode: 'mutex', timeline, final: value, expected: order.length, lostUpdates: 0 };
  }

  function buildIncrementPlan(mode) {
    if (mode === 'mutex') return runMutex();
    return runRace(mode === 'cas' ? 'cas' : 'none');
  }

  function runIncrementSchedule(mode, schedule) {
    if (schedule) return runRace(mode === 'cas' ? 'cas' : 'none');
    return buildIncrementPlan(mode);
  }

  function snapshot(run, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), run.timeline.length));
    const done = elapsed >= run.timeline.length;
    const frame = run.timeline[Math.min(elapsed, run.timeline.length - 1)] || null;
    return { frame, time: elapsed, done, final: run.final, expected: run.expected, mode: run.mode };
  }

  const api = { buildIncrementPlan, runIncrementSchedule, snapshot, RACE_SCHEDULE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CasLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);