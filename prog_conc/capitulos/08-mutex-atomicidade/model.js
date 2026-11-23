(function (root) {
  'use strict';

  function runWithSync(sequence, mode) {
    let counter = 0;
    let lock = false;
    const registers = { A: null, B: null };
    const trace = [];
    const needsLock = mode === 'mutex';
    for (const step of sequence) {
      const parts = step.split(':');
      const who = parts[0];
      const phase = parts[1];
      if (phase === 'lock') {
        if (mode !== 'mutex') continue;
        if (lock) throw new Error('mutex ocupado');
        lock = true;
        trace.push({ who, phase, counter, lock });
      } else if (phase === 'unlock') {
        if (mode !== 'mutex') continue;
        lock = false;
        trace.push({ who, phase, counter, lock });
      } else if (phase === 'read') {
        if (needsLock && !lock) throw new Error('read sem lock');
        registers[who] = counter;
        trace.push({ who, phase, counter });
      } else if (phase === 'add') {
        if (needsLock && !lock) throw new Error('add sem lock');
        registers[who] = (registers[who] ?? counter) + 1;
        trace.push({ who, phase, counter, temp: registers[who] });
      } else if (phase === 'write') {
        if (needsLock && !lock) throw new Error('write sem lock');
        counter = registers[who];
        registers[who] = null;
        trace.push({ who, phase, counter });
      } else if (phase === 'atomic') {
        if (mode !== 'atomic') continue;
        counter += 1;
        trace.push({ who, phase: 'atomic++', counter });
      }
    }
    return { counter, trace, correct: counter === 2, mode };
  }

  const RACE = ['A:read', 'B:read', 'A:add', 'B:add', 'A:write', 'B:write'];
  const MUTEX_A = ['A:lock', 'A:read', 'A:add', 'A:write', 'A:unlock', 'B:lock', 'B:read', 'B:add', 'B:write', 'B:unlock'];
  const ATOMIC = ['A:atomic', 'B:atomic'];

  const api = { runWithSync, RACE, MUTEX_A, ATOMIC };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MutexLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);