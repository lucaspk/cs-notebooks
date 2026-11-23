(function (root) {
  'use strict';

  function validateWorkers(workers) {
    if (!Number.isInteger(workers) || workers < 1 || workers > 16) {
      throw new RangeError('workers deve ser inteiro entre 1 e 16.');
    }
  }

  function clampFraction(p) {
    const x = Number(p);
    if (!Number.isFinite(x) || x < 0 || x > 1) throw new RangeError('parallelFraction deve estar entre 0 e 1.');
    return x;
  }

  /** Lei de Amdahl: speedup = 1 / (s + p/N), s = parte sequencial */
  function amdahlSpeedup(parallelFraction, workers) {
    validateWorkers(workers);
    const p = clampFraction(parallelFraction);
    const s = 1 - p;
    if (workers === 1) return 1;
    return 1 / (s + p / workers);
  }

  function amdahlTimeline(parallelFraction, maxWorkers = 8) {
    const p = clampFraction(parallelFraction);
    const points = [];
    for (let w = 1; w <= maxWorkers; w++) {
      points.push({ workers: w, speedup: amdahlSpeedup(p, w), efficiency: amdahlSpeedup(p, w) / w });
    }
    return { parallelFraction: p, sequentialFraction: 1 - p, points };
  }

  /** Modelo simplificado de tráfego de coerência: mesma linha de cache vs campos isolados */
  function falseSharingModel({ cores, updates, sameCacheLine }) {
    if (!Number.isInteger(cores) || cores < 2 || cores > 8) throw new RangeError('cores inválido.');
    if (!Number.isInteger(updates) || updates < 1) throw new RangeError('updates inválido.');
    const localCost = updates;
    const invalidationsPerUpdate = sameCacheLine ? cores - 1 : 0;
    const traffic = localCost + updates * invalidationsPerUpdate;
    const relativeSlowdown = sameCacheLine ? 1 + invalidationsPerUpdate / 2 : 1;
    return { localCost, traffic, relativeSlowdown, sameCacheLine, cores, updates };
  }

  function compareFalseSharing(cores, updates) {
    const shared = falseSharingModel({ cores, updates, sameCacheLine: true });
    const padded = falseSharingModel({ cores, updates, sameCacheLine: false });
    return { shared, padded, ratio: shared.traffic / padded.traffic };
  }

  const api = { amdahlSpeedup, amdahlTimeline, falseSharingModel, compareFalseSharing };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PerformanceLimitsLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);