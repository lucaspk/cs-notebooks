'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let run = null;

function mode() {
  return $('mode').value;
}

function recompute() {
  run = CasLab.buildIncrementPlan(mode());
  time = 0;
  render();
}

function render() {
  const view = CasLab.snapshot(run, time);
  $('time').textContent = view.time;
  $('step').disabled = view.done;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : 'Executar';
  const f = view.frame;
  $('log').textContent = f
    ? `Passo ${view.time}: thread ${f.thread} ${f.op || 'inc'} — ${f.event}. Contador: ${f.valueAfter} (esperado ${view.expected}).`
    : 'Pronto.';
  $('metric-final').textContent = view.done ? view.final : '—';
  $('mode-chip').textContent = view.mode;
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  if (time < run.timeline.length) time++;
  if (time >= run.timeline.length) stop();
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= run.timeline.length) time = 0;
    playing = true;
    timer = setInterval(() => {
      advance();
      if (time >= run.timeline.length) stop();
    }, 700);
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', () => {
  stop();
  time = 0;
  render();
});
$('mode').addEventListener('change', recompute);
recompute();