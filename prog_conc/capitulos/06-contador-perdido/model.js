(function (root) {
  'use strict';

  function runRmw(sequence) {
    let counter = 0;
    const registers = { A: null, B: null };
    const trace = [];
    for (const step of sequence) {
      const [who, phase] = step.split(':');
      if (phase === 'read') {
        registers[who] = counter;
        trace.push({ who, phase, counter, registers: { ...registers } });
      } else if (phase === 'add') {
        registers[who] = (registers[who] ?? counter) + 1;
        trace.push({ who, phase, counter, registers: { ...registers } });
      } else if (phase === 'write') {
        counter = registers[who];
        registers[who] = null;
        trace.push({ who, phase, counter, registers: { ...registers } });
      }
    }
    return { counter, trace, expected: 2, lost: counter < 2 };
  }

  const EXPLAIN = {
    serialized: ['A:read', 'A:add', 'A:write', 'B:read', 'B:add', 'B:write'],
    interleaved: ['A:read', 'B:read', 'A:add', 'B:add', 'A:write', 'B:write'],
  };

  const api = { runRmw, EXPLAIN };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LostCounterLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);