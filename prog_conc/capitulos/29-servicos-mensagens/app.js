'use strict';

const $ = (id) => document.getElementById(id);
let step = 0;
let run = null;

function recompute() {
  run = MessagingLab.buildDeliveryPlan($('mode').value);
  step = 0;
  render();
}

function render() {
  const view = MessagingLab.snapshot(run, step);
  $('mode-label').textContent = run.mode;
  const rows = run.effects
    .slice(0, step)
    .map((e) => `<tr><th scope="row">${e.id}</th><td>${e.payload}</td><td>${e.applied ? 'sim' : 'não'}</td><td>${e.note}</td></tr>`)
    .join('');
  $('effects-table').innerHTML = rows
    ? `<table class="tradeoff-table"><thead><tr><th scope="col">Id</th><th scope="col">Payload</th><th scope="col">Aplicou</th><th scope="col">Nota</th></tr></thead><tbody>${rows}</tbody></table>`
  : '<p class="practice-lead">Clique em avançar para entregar mensagens.</p>';
  $('final-state').textContent = view.done ? JSON.stringify(run.finalState) : '—';
}

$('step').addEventListener('click', () => {
  if (step < run.effects.length) step++;
  render();
});
$('reset').addEventListener('click', recompute);
$('mode').addEventListener('change', recompute);
recompute();