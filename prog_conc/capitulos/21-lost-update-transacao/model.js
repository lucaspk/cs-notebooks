(function (root) {
  'use strict';

  const MODES = ['sem-controle', 'bloqueio-otimista'];

  function createScenario(mode) {
    if (!MODES.includes(mode)) throw new RangeError('Modo inválido.');
    return {
      mode,
      committed: { saldo: 100 },
      versions: { saldo: 1 },
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'READ', key: 'saldo' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'READ', key: 'saldo' },
        { tx: 'T1', op: 'WRITE', key: 'saldo', value: 150, basedOn: 100 },
        { tx: 'T1', op: 'COMMIT' },
        { tx: 'T2', op: 'WRITE', key: 'saldo', value: 120, basedOn: 100 },
        { tx: 'T2', op: 'COMMIT' },
      ],
    };
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { ...scenario.committed };
    const versions = { ...scenario.versions };
    const txs = {};
    const log = [];
    let aborted = false;
    let lostUpdate = false;

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, reads: {}, writes: {} };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'READ') {
        tx.reads[step.key] = committed[step.key];
        tx.readVersion = versions[step.key];
        log.push({ ...step, note: `leu ${step.key}=${committed[step.key]}` });
      } else if (step.op === 'WRITE') {
        if (scenario.mode === 'bloqueio-otimista' && step.basedOn !== committed[step.key]) {
          aborted = true;
          tx.active = false;
          log.push({ ...step, note: 'abortada — versão mudou desde a leitura' });
          continue;
        }
        tx.writes[step.key] = step.value;
        log.push({ ...step, note: `escreve ${step.key}=${step.value}` });
      } else if (step.op === 'COMMIT') {
        if (aborted && step.tx === 'T2') {
          log.push({ ...step, note: 'não confirmada (abortada)' });
          continue;
        }
        Object.assign(committed, tx.writes);
        if (Object.keys(tx.writes).length) versions.saldo++;
        tx.writes = {};
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
        if (step.tx === 'T2' && committed.saldo === 120 && scenario.mode === 'sem-controle') lostUpdate = true;
      }
    }

    return {
      committed: { ...committed },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      aborted,
      anomaly: lostUpdate,
      expectedIfFair: 170,
    };
  }

  const api = { createScenario, snapshot, MODES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LostUpdateTxLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);