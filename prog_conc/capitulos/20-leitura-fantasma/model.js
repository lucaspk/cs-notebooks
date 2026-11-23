(function (root) {
  'use strict';

  const ISOLATIONS = ['read-committed', 'repeatable-read'];

  function createScenario(isolation) {
    if (!ISOLATIONS.includes(isolation)) throw new RangeError('Isolamento inválido.');
    return {
      isolation,
      committed: { rows: [{ id: 1, nome: 'Ana', idade: 40 }] },
      phantomSnapshot: null,
      steps: [
        { tx: 'T1', op: 'BEGIN' },
        { tx: 'T1', op: 'QUERY', filter: 'idade>=30' },
        { tx: 'T2', op: 'BEGIN' },
        { tx: 'T2', op: 'INSERT', row: { id: 2, nome: 'Bruno', idade: 35 } },
        { tx: 'T2', op: 'COMMIT' },
        { tx: 'T1', op: 'QUERY', filter: 'idade>=30' },
        { tx: 'T1', op: 'COMMIT' },
      ],
    };
  }

  function matchingRows(rows) {
    return rows.filter((r) => r.idade >= 30);
  }

  function snapshot(scenario, stepIndex) {
    const steps = scenario.steps;
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), steps.length));
    const committed = { rows: scenario.committed.rows.map((r) => ({ ...r })) };
    const txs = {};
    const log = [];
    const counts = { first: null, second: null };
    const snap = { phantomSnapshot: null };

    for (let i = 0; i < elapsed; i++) {
      const step = steps[i];
      if (!txs[step.tx]) txs[step.tx] = { active: false, inserts: [] };
      const tx = txs[step.tx];
      if (step.op === 'BEGIN') {
        tx.active = true;
        log.push({ ...step, note: 'transação aberta' });
      } else if (step.op === 'QUERY') {
        const base =
          scenario.isolation === 'repeatable-read' && step.tx === 'T1' && snap.phantomSnapshot
            ? snap.phantomSnapshot
            : committed.rows;
        const pending = tx.inserts || [];
        const rows = [...base, ...pending];
        const hits = matchingRows(rows);
        log.push({ ...step, note: `consulta ${step.filter} → ${hits.length} linha(s)` });
        if (step.tx === 'T1') {
          if (counts.first === null) {
            counts.first = hits.length;
            snap.phantomSnapshot = [...committed.rows];
          } else counts.second = hits.length;
        }
      } else if (step.op === 'INSERT') {
        tx.inserts = tx.inserts || [];
        tx.inserts.push(step.row);
        log.push({ ...step, note: `inseriu ${step.row.nome}` });
      } else if (step.op === 'COMMIT') {
        if (tx.inserts?.length) committed.rows.push(...tx.inserts);
        tx.inserts = [];
        tx.active = false;
        log.push({ ...step, note: 'confirmada' });
      }
    }

    const anomaly =
      counts.first !== null && counts.second !== null && counts.first !== counts.second &&
      scenario.isolation === 'read-committed';

    return {
      committed: { rows: [...committed.rows] },
      txs: JSON.parse(JSON.stringify(txs)),
      log,
      elapsed,
      done: elapsed >= steps.length,
      current: elapsed > 0 ? steps[elapsed - 1] : null,
      firstCount: counts.first,
      secondCount: counts.second,
      anomaly,
    };
  }

  const api = { createScenario, snapshot, ISOLATIONS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PhantomReadLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);