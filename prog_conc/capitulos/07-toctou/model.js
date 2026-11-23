(function (root) {
  'use strict';

  function runToctou(sequence, seats = 1) {
    let free = seats;
    const decisions = { A: null, B: null };
    const trace = [];
    for (const step of sequence) {
      const [who, phase] = step.split(':');
      if (phase === 'check') {
        const ok = free > 0;
        decisions[who] = ok;
        trace.push({ who, phase, free, ok });
      } else if (phase === 'use') {
        const ok = decisions[who] === true;
        if (ok) {
          free--;
          trace.push({ who, phase, free, ok: true, assigned: true, violation: free < 0 });
        } else {
          trace.push({ who, phase, free, ok, assigned: false });
        }
        decisions[who] = null;
      }
    }
    const assignedCount = trace.filter((t) => t.assigned).length;
    const bothAssigned = assignedCount > seats;
    const overflow = free < 0;
    return { free, trace, overflow, bothAssigned, invariantOk: !bothAssigned };
  }

  const SCENARIOS = {
    safe: ['A:check', 'A:use', 'B:check', 'B:use'],
    toctou: ['A:check', 'B:check', 'A:use', 'B:use'],
  };

  const api = { runToctou, SCENARIOS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ToctouLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);