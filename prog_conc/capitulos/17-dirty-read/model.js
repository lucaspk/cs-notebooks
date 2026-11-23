(function (root) {
  'use strict';

  const ISOLATIONS = ['read-uncommitted', 'read-committed'];

  function createScenario(isolation) {
    if (!ISOLATIONS.includes(isolation)) throw new RangeError('Isolamento inválido para este experimento.');
    return {
      isolation,
      committed: { saldo: 100 },
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'WRITE', key: 'saldo', value: 200 },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'READ', key: 'saldo' },
        { tx: 'T1', op: 'ROLLBACK' },
        { tx: 'T2', op: 'COMMIT' },
      ],
    };
  }

  function visibleValue(committed, txs, reader, key, isolation) {
    const self = txs[reader];
    if (self && key in self.writes) return self.writes[key];
    if (isolation === 'read-uncommitted') {
      for (const [id, tx] of Object.entries(txs)) {
        if (id !== reader && tx.active && key in tx.writes) return tx.writes[key];
      }
    }
    return committed[key];
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { ...scenario.committed };
    const txs = {};
    const log = [];
    let t2Read = null;
    let dirtyRead = false;

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, writes: {}, reads: {} };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'WRITE') {
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `${step.key}=${step.value} (pendente)` });
      } else if (step.op === 'READ') {
        const value = visibleValue(committed, txs, step.tx, step.key, scenario.isolation);
        tx.reads[step.key] = value;
        log.push({ ...step, note: `leu ${step.key}=${value}` });
        if (step.tx === 'T2' && step.key === 'saldo') {
          t2Read = value;
          if (value === 200 && committed.saldo === 100) dirtyRead = true;
        }
      } else if (step.op === 'COMMIT') {
        Object.assign(committed, tx.writes);
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
      } else if (step.op === 'ROLLBACK') {
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'desfeita' });
      }
    }

    const current = elapsed > 0 && elapsed <= steps.length ? steps[elapsed - 1] : null;
    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current,
      t2Read,
      dirtyRead,
      anomaly: dirtyRead,
    };
  }

  const api = { createScenario, snapshot, ISOLATIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DirtyReadLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);