(function (root) {
  'use strict';

  const LEVELS = ['read-uncommitted', 'read-committed', 'repeatable-read', 'serializable'];
  const ANOMALIES = [
    'dirty-read',
    'dirty-write',
    'non-repeatable-read',
    'phantom-read',
    'lost-update',
    'read-skew',
    'write-skew',
  ];

  const PREVENTS = {
    'read-uncommitted': new Set(['dirty-write']),
    'read-committed': new Set(['dirty-read', 'dirty-write']),
    'repeatable-read': new Set(['dirty-read', 'dirty-write', 'non-repeatable-read', 'phantom-read']),
    serializable: new Set(ANOMALIES),
  };

  const LABELS = {
    'dirty-read': 'Dirty read',
    'dirty-write': 'Dirty write',
    'non-repeatable-read': 'Leitura não repetível',
    'phantom-read': 'Leitura fantasma',
    'lost-update': 'Lost update',
    'read-skew': 'Read skew',
    'write-skew': 'Write skew',
  };

  function prevents(level, anomaly) {
    if (!LEVELS.includes(level) || !ANOMALIES.includes(anomaly)) throw new RangeError('Par inválido.');
    return PREVENTS[level].has(anomaly);
  }

  function matrix() {
    return ANOMALIES.map((anomaly) => ({
      anomaly,
      label: LABELS[anomaly],
      levels: Object.fromEntries(LEVELS.map((level) => [level, prevents(level, anomaly)])),
    }));
  }

  function demoSchedule(anomaly) {
    const demos = {
      'dirty-read': ['T1 altera', 'T2 lê antes do commit', 'T1 desfaz'],
      'dirty-write': ['T1 altera', 'T2 sobrescreve pendente', 'T1 desfaz'],
      'non-repeatable-read': ['T1 lê', 'T2 confirma mudança', 'T1 relê valor diferente'],
      'phantom-read': ['T1 consulta', 'T2 insere linha', 'T1 consulta de novo'],
      'lost-update': ['T1 e T2 leem', 'ambas somam', 'última confirmação vence'],
      'read-skew': ['T1 lê A', 'T2 transfere A→B', 'T1 lê B desalinhado'],
      'write-skew': ['T1 e T2 veem regra OK', 'cada uma altera outra linha', 'regra quebra junto'],
    };
    return demos[anomaly] || [];
  }

  function snapshot(level, anomaly, stepIndex) {
    const schedule = demoSchedule(anomaly);
    const elapsed = Math.max(0, Math.min(Math.floor(stepIndex), schedule.length));
    const blocked = prevents(level, anomaly);
    return {
      level,
      anomaly,
      label: LABELS[anomaly],
      schedule,
      elapsed,
      done: elapsed >= schedule.length,
      prevented: blocked,
      outcome: blocked
        ? 'Nesta simulação pedagógica, o nível escolhido bloqueia ou aborta antes da anomalia aparecer.'
        : elapsed >= schedule.length
          ? 'A ordem dos passos produz a anomalia — nenhuma garantia deste nível a impede.'
          : null,
    };
  }

  const api = { LEVELS, ANOMALIES, LABELS, prevents, matrix, demoSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.IsolationLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);