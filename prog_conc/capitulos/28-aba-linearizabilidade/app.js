'use strict';

const $ = (id) => document.getElementById(id);
let step = 0;
let run = null;

function recompute() {
  run = AbaLab.buildAbaDemo($('stamp').checked);
  step = 0;
  render();
}

function render() {
  const view = AbaLab.snapshot(run, step);
  const f = view.frame;
  $('stamp-label').textContent = view.useStamp ? 'CAS com versão' : 'CAS só valor';
  $('log').textContent = f ? `${f.detail}` : '—';
  $('step-num').textContent = step;
  $('aba-flag').textContent = view.done ? (view.abaTrap ? 'Armadilha ABA' : view.linearizable ? 'Linearizável' : 'Ver histórico') : 'em andamento';
  $('history').innerHTML = run.history
    .slice(0, step)
    .map((h, i) => `<li class="${i + 1 === step ? 'latest' : ''}">${h.step}. ${h.detail}</li>`)
    .join('');
}

$('step').addEventListener('click', () => {
  if (step < run.history.length) step++;
  render();
});
$('reset').addEventListener('click', recompute);
$('stamp').addEventListener('change', recompute);
recompute();