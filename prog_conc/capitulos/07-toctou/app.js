'use strict';

const $ = (id) => document.getElementById(id);
let step = 0;
let key = 'toctou';
let sequence = ToctouLab.SCENARIOS.toctou.slice();

function load(name) {
  key = name;
  sequence = ToctouLab.SCENARIOS[name].slice();
  step = 0;
  render();
}

function render() {
  const partial = sequence.slice(0, step);
  const result = partial.length ? ToctouLab.runToctou(partial) : { free: 1, trace: [], bothAssigned: false };
  $('free').textContent = result.free;
  $('trace').innerHTML = result.trace.map((row) => `
    <tr><td>${row.who}</td><td>${row.phase}</td><td>${row.free}</td><td>${row.ok ?? ''}</td><td>${row.assigned ? 'ocupou' : row.violation ? 'falhou' : ''}</td></tr>`).join('') || '<tr><td colspan="5">Nenhum passo.</td></tr>';
  if (step >= sequence.length) {
    const full = ToctouLab.runToctou(sequence);
    $('verdict').textContent = full.bothAssigned
      ? 'TOCTOU: as duas passaram na verificação; a invariante de 1 vaga foi violada.'
      : 'Apenas uma tarefa ocupou a vaga — invariante respeitada.';
  } else {
    $('verdict').textContent = `Passo ${step} de ${sequence.length}.`;
  }
  $('step').disabled = step >= sequence.length;
}

$('scenario').addEventListener('change', () => load($('scenario').value));
$('step').addEventListener('click', () => {
  step++;
  render();
});
$('reset').addEventListener('click', () => load(key));
load('toctou');