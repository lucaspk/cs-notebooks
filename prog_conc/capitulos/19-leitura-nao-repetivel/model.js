(function (root) {
  'use strict';

  const ISOLATIONS = ['read-committed', 'repeatable-read'];

  function createScenario(isolation) {
    if (!ISOLATIONS.includes(isolation)) throw new RangeError('Isolamento inválido.');
    return {
      isolation,
      committed: { preco: 10 },
      snapshotAt: null,
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'READ', key: 'preco' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'WRITE', key: 'preco', value: 15 },
        { tx: 'T2', op: 'COMMIT' },
        { tx: 'T1', op: 'READ', key: 'preco' },
        { tx: 'T1', op: 'COMMIT' },
      ],
    };
  }

  function readValue(scenario, committed, txs, reader, key) {
    const tx = txs[reader];
    if (tx && key in tx.writes) return tx.writes[key];
    if (scenario.isolation === 'repeatable-read' && reader === 'T1' && scenario.snapshotAt) {
      return scenario.snapshotAt[key];
    }
    return committed[key];
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { ...scenario.committed };
    const txs = {};
    const log = [];
    const meta = { firstRead: null, secondRead: null };
    const snap = { ...scenario };

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, writes: {} };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'READ') {
        const value = readValue(snap, committed, txs, step.tx, step.key);
        tx.reads = tx.reads || {};
        tx.reads[step.key] = value;
        log.push({ ...step, note: `leu ${step.key}=${value}` });
        if (step.tx === 'T1' && step.key === 'preco') {
          if (meta.firstRead === null) {
            meta.firstRead = value;
            snap.snapshotAt = { ...committed };
          } else meta.secondRead = value;
        }
      } else if (step.op === 'WRITE') {
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `${step.key}=${step.value} (pendente)` });
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

    const repeatable = meta.firstRead !== null && meta.secondRead === meta.firstRead;
    const anomaly = meta.firstRead !== null && meta.secondRead !== null && meta.firstRead !== meta.secondRead;

    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      firstRead: meta.firstRead,
      secondRead: meta.secondRead,
      anomaly: scenario.isolation === 'read-committed' && anomaly,
      stableReads: repeatable,
    };
  }

  const api = { createScenario, snapshot, ISOLATIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NonRepeatableReadLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);