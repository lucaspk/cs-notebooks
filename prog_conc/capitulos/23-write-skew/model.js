(function (root) {
  'use strict';

  const MODES = ['sem-serializacao', 'serializavel'];

  function createScenario(mode) {
    if (!MODES.includes(mode)) throw new RangeError('Modo inválido.');
    return {
      mode,
      committed: { ana_plantao: true, bob_plantao: true },
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'READ_ON_CALL' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'READ_ON_CALL' },
        { tx: 'T1', op: 'WRITE', key: 'ana_plantao', value: false },
        { tx: 'T2', op: 'WRITE', key: 'bob_plantao', value: false },
        { tx: 'T1', op: 'COMMIT' },
        { tx: 'T2', op: 'COMMIT' },
      ],
    };
  }

  function onCallCount(committed, txs) {
    const merged = { ...committed };
    for (const tx of Object.values(txs)) {
      if (tx.active) Object.assign(merged, tx.writes);
    }
    return Number(merged.ana_plantao) + Number(merged.bob_plantao);
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { ...scenario.committed };
    const txs = {};
    const log = [];
    let violation = false;

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, writes: {}, sawOnCall: null };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'READ_ON_CALL') {
        const count = onCallCount(committed, txs);
        tx.sawOnCall = count;
        log.push({ ...step, note: `viu ${count} médico(s) de plantão` });
      } else if (step.op === 'WRITE') {
        const pending = { ...tx.writes, [step.key]: step.value };
        const preview = { ...txs, [step.tx]: { ...tx, writes: pending } };
        const remaining = onCallCount(committed, preview);
        if (scenario.mode === 'serializavel' && tx.sawOnCall >= 1 && remaining < 1) {
          tx.aborted = true;
          tx.active = false;
          log.push({ ...step, note: 'abortada — regra “≥1 de plantão” quebrada em conjunto' });
          continue;
        }
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `${step.key}=${step.value}` });
      } else if (step.op === 'COMMIT') {
        if (tx.aborted) {
          log.push({ ...step, note: 'não confirmada (abortada)' });
          continue;
        }
        Object.assign(committed, tx.writes);
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
      }
    }

    const finalOnCall = Number(committed.ana_plantao) + Number(committed.bob_plantao);
    if (scenario.mode === 'sem-serializacao' && elapsed >= steps.length) {
      violation = finalOnCall < 1;
    }

    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      onCall: finalOnCall,
      aborted: Boolean(txs.T2?.aborted),
      anomaly: violation,
    };
  }

  const api = { createScenario, snapshot, MODES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.WriteSkewLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);