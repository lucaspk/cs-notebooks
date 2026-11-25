'use strict';

const $ = (id) => document.getElementById(id);
let run = null;
let playing = null;
let tick = 0;

const STYLE_LABEL = {
  imperative: { title: 'Imperativo', detail: 'Loop + acumulador' },
  fold: { title: 'Dobragem', detail: 'Regra explícita' },
  reduce: { title: 'Reduce', detail: 'Método combinador' },
  pipeline: { title: 'Pipeline', detail: 'Sequência de valores' },
};

function readNums() {
  return $('nums-input').value;
}

function renderStyleCards() {
  if (!run) return;
  $('sum-result').textContent = String(run.results.imperative.value);
  $('same-badge').textContent = run.sameResult ? 'Mesmo resultado nos 4 estilos' : 'Resultados divergem (erro)';
  const host = $('style-cards');
  host.innerHTML = Object.entries(run.results)
    .map(([key, res]) => {
      const label = STYLE_LABEL[key];
      return `<article class="sum-style-card"><div><strong>${label.title}</strong><span>${label.detail}</span></div><div class="sum-style-result"><strong>${res.value}</strong><span>${res.trace.length} passos</span></div></article>`;
    })
    .join('');
}

function renderTrace() {
  const key = $('style-select').value;
  const snap = ParadigmSumLab.snapshot(run, key, tick);
  const tbody = $('trace-body');
  tbody.innerHTML = snap.steps
    .map((s, i) => {
      const cells =
        s.kind === 'init'
          ? `<td>início</td><td>—</td><td>${s.acc}</td>`
          : `<td>+ ${s.n}</td><td>${s.n}</td><td>${s.acc}</td>`;
      return `<tr class="${i === snap.time - 1 && !snap.done ? 'is-active' : ''}">${cells}</tr>`;
    })
    .join('');
  $('tick-label').textContent = `${snap.time} / ${snap.total}`;
  $('play-status').textContent = snap.done ? 'Fim do trace' : `Executando: ${snap.style}`;
}

function fullRender() {
  try {
    run = ParadigmSumLab.runAll(readNums());
    tick = 0;
    renderStyleCards();
    renderTrace();
    $('lab-error').hidden = true;
  } catch (err) {
    $('lab-error').hidden = false;
    $('lab-error').textContent = err.message;
  }
}

function stopPlay() {
  if (playing) {
    clearInterval(playing);
    playing = null;
  }
}

$('nums-input').addEventListener('change', fullRender);
$('style-select').addEventListener('change', () => {
  tick = 0;
  renderTrace();
});
$('btn-play').addEventListener('click', () => {
  if (!run) return;
  stopPlay();
  playing = setInterval(() => {
    const key = $('style-select').value;
    const snap = ParadigmSumLab.snapshot(run, key, tick);
    if (snap.done) {
      stopPlay();
      return;
    }
    tick += 1;
    renderTrace();
  }, 450);
});
$('btn-step').addEventListener('click', () => {
  if (!run) return;
  const key = $('style-select').value;
  const snap = ParadigmSumLab.snapshot(run, key, tick);
  if (!snap.done) tick += 1;
  renderTrace();
});
$('btn-reset').addEventListener('click', () => {
  stopPlay();
  tick = 0;
  renderTrace();
});

fullRender();