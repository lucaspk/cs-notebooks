(function (root) {
  'use strict';

  const ISOLATIONS = ['read-committed', 'snapshot'];

  function createScenario(isolation) {
    if (!ISOLATIONS.includes(isolation)) throw new RangeError('Isolamento inválido.');
    return {
      isolation,
      committed: { alice: 500, bob: 500 },
      snapshotAt: null,
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'READ', key: 'alice' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'WRITE', key: 'alice', value: 400 },
        { tx: 'T2', op: 'WRITE', key: 'bob', value: 600 },
        { tx: 'T2', op: 'COMMIT' },
        { tx: 'T1', op: 'READ', key: 'bob' },
        { tx: 'T1', op: 'COMMIT' },
      ],
    };
  }

  function readValue(scenario, committed, txs, reader, key) {
    const tx = txs[reader];
    if (tx && key in tx.writes) return tx.writes[key];
    if (scenario.isolation === 'snapshot' && reader === 'T1' && scenario.snapshotAt) {
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
    const snap = { snapshotAt: null };
    const reads = { alice: null, bob: null };

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, writes: {} };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'READ') {
        const value = readValue({ ...scenario, snapshotAt: snap.snapshotAt }, committed, txs, step.tx, step.key);
        if (step.tx === 'T1' && reads.alice === null && step.key === 'alice') {
          snap.snapshotAt = { ...committed };
        }
        if (step.tx === 'T1') reads[step.key] = value;
        log.push({ ...step, note: `leu ${step.key}=${value}` });
      } else if (step.op === 'WRITE') {
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `${step.key}=${step.value} (pendente)` });
      } else if (step.op === 'COMMIT') {
        Object.assign(committed, tx.writes);
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
      }
    }

    const sum = reads.alice !== null && reads.bob !== null ? reads.alice + reads.bob : null;
    const anomaly = sum !== null && sum !== 1000 && scenario.isolation === 'read-committed';

    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      reads,
      sum,
      anomaly,
    };
  }

  const api = { createScenario, snapshot, ISOLATIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ReadSkewLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);