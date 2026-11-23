(function (root) {
  'use strict';

  const MODES = ['sem-protecao', 'bloqueia-escrita-sujeja'];

  function createScenario(mode) {
    if (!MODES.includes(mode)) throw new RangeError('Modo inválido.');
    return {
      mode,
      committed: { nota: 'A' },
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'WRITE', key: 'nota', value: 'B' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'WRITE', key: 'nota', value: 'C' },
        { tx: 'T1', op: 'ROLLBACK' },
        { tx: 'T2', op: 'COMMIT' },
      ],
    };
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { ...scenario.committed };
    const txs = {};
    const log = [];
    let blocked = false;
    let dirtyWrite = false;

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, writes: {}, blocked: false };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'WRITE') {
        const conflict = Object.entries(txs).some(
          ([id, other]) => id !== step.tx && other.active && step.key in other.writes
        );
        if (conflict && scenario.mode === 'bloqueia-escrita-sujeja') {
          tx.blocked = true;
          blocked = true;
          log.push({ ...step, note: `bloqueada — T1 ainda tem ${step.key} pendente` });
          continue;
        }
        if (conflict && scenario.mode === 'sem-protecao') dirtyWrite = true;
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `${step.key}=${step.value} (pendente)` });
      } else if (step.op === 'ROLLBACK') {
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'desfeita' });
      } else if (step.op === 'COMMIT') {
        Object.assign(committed, tx.writes);
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
      }
    }

    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      blocked,
      dirtyWrite,
      anomaly: dirtyWrite || (scenario.mode === 'sem-protecao' && committed.nota === 'C'),
    };
  }

  const api = { createScenario, snapshot, MODES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DirtyWriteLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);