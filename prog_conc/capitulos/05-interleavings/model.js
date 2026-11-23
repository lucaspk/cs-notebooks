(function (root) {
  'use strict';

  const STEPS = ['read', 'add', 'write'];

  function initialState() {
    return { counter: 0, step: { A: 0, B: 0 }, hold: { A: 0, B: 0 }, log: [] };
  }

  function isFinished(state, who) {
    return state.step[who] >= STEPS.length;
  }

  function applyStep(state, who) {
    const idx = state.step[who];
    if (idx >= STEPS.length) throw new RangeError('Tarefa já concluída.');
    const next = {
      counter: state.counter,
      step: { ...state.step },
      hold: { ...state.hold },
      log: state.log.concat([`${who}:${STEPS[idx]}`]),
    };
    if (idx === 0) next.hold[who] = next.counter;
    else if (idx === 1) next.hold[who] = next.hold[who] + 1;
    else if (idx === 2) next.counter = next.hold[who];
    next.step[who] = idx + 1;
    return next;
  }

  function runSequence(sequence) {
    let state = initialState();
    for (const who of sequence) {
      if (!['A', 'B'].includes(who)) throw new RangeError('Passo inválido.');
      state = applyStep(state, who);
    }
    const done = isFinished(state, 'A') && isFinished(state, 'B');
    return {
      counter: state.counter,
      log: state.log,
      done,
      invariantOk: done ? state.counter === 2 : null,
    };
  }

  const PRESETS = {
    safe: ['A', 'A', 'A', 'B', 'B', 'B'],
    lost: ['A', 'B', 'A', 'B', 'A', 'B'],
    classic: ['A', 'A', 'B', 'B', 'A', 'B'],
  };

  const api = { STEPS, runSequence, PRESETS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.InterleaveLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);