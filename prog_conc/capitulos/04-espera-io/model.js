(function (root) {
  'use strict';

  function createIoSchedule({ cpuBefore, ioTicks, cpuAfter, cpuB }) {
    const events = [];
    for (let i = 0; i < cpuBefore; i++) events.push('cpu');
    for (let i = 0; i < ioTicks; i++) events.push('io');
    for (let i = 0; i < cpuAfter; i++) events.push('cpu');
    let ai = 0;
    let bLeft = cpuB;
    const schedule = [];
    while (ai < events.length || bLeft > 0) {
      const tick = { core: null, a: null, b: null };
      const phase = events[ai];
      if (phase === 'cpu') {
        tick.core = 'A';
        tick.a = 'cpu';
        ai++;
      } else if (phase === 'io') {
        tick.a = 'io';
        ai++;
        if (bLeft > 0) {
          tick.core = 'B';
          tick.b = 'cpu';
          bLeft--;
        }
      } else if (bLeft > 0) {
        tick.core = 'B';
        tick.b = 'cpu';
        bLeft--;
      } else {
        break;
      }
      schedule.push(tick);
    }
    return {
      schedule,
      duration: schedule.length,
      ioWindow: { start: cpuBefore, end: cpuBefore + ioTicks },
    };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.length));
    let aCpu = 0;
    let aIo = 0;
    let bCpu = 0;
    for (const tick of schedule.slice(0, elapsed)) {
      if (tick.a === 'cpu') aCpu++;
      if (tick.a === 'io') aIo++;
      if (tick.b === 'cpu') bCpu++;
    }
    const active = elapsed > 0 ? schedule[elapsed - 1] : null;
    const done = elapsed === schedule.length;
    return { progress: { aCpu, aIo, bCpu }, active, done, elapsed };
  }

  const api = { createIoSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.IoWaitLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);