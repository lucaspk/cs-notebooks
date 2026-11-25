'use strict';

function reproScore(steps) {
  const list = ['sintoma', 'passos', 'esperado', 'observado', 'ambiente'];
  return list.filter((k) => steps[k]).length;
}

function pyramidAdvice(unit, integration, e2e) {
  const u = Number(unit) || 0;
  const i = Number(integration) || 0;
  const e = Number(e2e) || 0;
  const total = u + i + e || 1;
  const skew = e / total > 0.5 ? 'muitos e2e — lento e frágil' : u / total < 0.4 ? 'poucos unitários' : 'equilíbrio saudável';
  return { unitPct: u / total, integrationPct: i / total, e2ePct: e / total, skew };
}

function parseAAA(name) {
  const parts = String(name).split('_');
  return { arrange: parts[0] || '?', act: parts[1] || '?', assert: parts[2] || '?' };
}

function isolationBenefit(useRealDb, useMock) {
  return { isolated: !useRealDb && useMock, flakyRisk: useRealDb ? 'alto' : 'baixo' };
}

function tddState(testRed, codeGreen) {
  if (testRed && !codeGreen) return 'red';
  if (testRed && codeGreen) return 'green';
  return 'refactor';
}

function sortInvariant(arr) {
  const copy = [...arr].sort((a, b) => a - b);
  return copy.every((v, i) => i === 0 || copy[i - 1] <= v);
}

function reviewChecklist(items) {
  const required = ['comportamento', 'teste', 'risco', 'legibilidade'];
  return required.filter((k) => items[k]).length;
}

module.exports = {
  reproScore,
  pyramidAdvice,
  parseAAA,
  isolationBenefit,
  tddState,
  sortInvariant,
  reviewChecklist,
};