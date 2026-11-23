(function (root) {
  'use strict';

  const DEFAULT_MESSAGES = [
    { id: 'req-1', payload: 'pedido v1', seq: 2, at: 3 },
    { id: 'req-1', payload: 'pedido v1', seq: 2, at: 4 },
    { id: 'req-2', payload: 'pedido v2', seq: 1, at: 2 },
    { id: 'req-2', payload: 'cancelar v2', seq: 3, at: 5 },
  ];

  /**
   * mode: naive | ordered | idempotent | lww
   */
  function applyMailbox(messages, mode) {
    const inbox = [...messages].sort((a, b) => a.at - b.at);
    const effects = [];
    const seen = new Set();
    const state = new Map();
    let duplicateApplied = 0;
    let outOfOrder = false;

    for (const msg of inbox) {
      let applied = false;
      let note = '';

      if (mode === 'naive') {
        applied = true;
        state.set(msg.id, msg.payload);
        note = 'aplica na chegada';
        if (msg.id === 'req-1' && effects.some((e) => e.id === 'req-1')) duplicateApplied += 1;
      } else if (mode === 'ordered') {
        const prev = state.get(msg.id);
        const prevSeq = prev?.seq ?? 0;
        if (msg.seq < prevSeq) {
          outOfOrder = true;
          note = 'ignorada (seq antiga)';
        } else {
          applied = true;
          state.set(msg.id, { payload: msg.payload, seq: msg.seq });
          note = 'aplica em ordem de seq';
        }
      } else if (mode === 'idempotent') {
        const key = `${msg.id}:${msg.payload}`;
        if (seen.has(key)) {
          note = 'dup ignorado';
          duplicateApplied += 1;
        } else {
          seen.add(key);
          applied = true;
          state.set(msg.id, msg.payload);
          note = 'efeito uma vez';
        }
      } else if (mode === 'lww') {
        applied = true;
        const cur = state.get(msg.id);
        if (!cur || msg.at >= cur.at) state.set(msg.id, { payload: msg.payload, at: msg.at, seq: msg.seq });
        else note = 'resposta antiga descartada';
        note = applied ? 'last write wins' : note;
      }

      effects.push({ ...msg, applied, note, snapshot: Object.fromEntries(state) });
    }

    const finalState = Object.fromEntries(
      [...state.entries()].map(([k, v]) => [k, typeof v === 'object' ? v.payload ?? v : v]),
    );

    return { mode, effects, finalState, duplicateApplied, outOfOrder };
  }

  function buildDeliveryPlan(mode) {
    return applyMailbox(DEFAULT_MESSAGES, mode);
  }

  function snapshot(run, step) {
    const elapsed = Math.max(0, Math.min(Math.floor(step), run.effects.length));
    const done = elapsed >= run.effects.length;
    const frame = run.effects[Math.min(elapsed, run.effects.length - 1)] || null;
    return { frame, step: elapsed, done, finalState: run.finalState, mode: run.mode };
  }

  const api = { DEFAULT_MESSAGES, applyMailbox, buildDeliveryPlan, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MessagingLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);