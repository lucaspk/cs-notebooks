'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let level = 'read-committed';
let anomaly = 'dirty-read';

function renderMatrix() {
  const rows = IsolationLab.matrix();
  $('matrix-body').innerHTML = rows
    .map((row) => {
      const cells = IsolationLab.LEVELS.map((lv) => `<td>${row.levels[lv] ? '✓' : '—'}</td>`).join('');
      return `<tr><th scope="row">${row.label}</th>${cells}</tr>`;
    })
    .join('');
}

function render() {
  const view = IsolationLab.snapshot(level, anomaly, time);
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('outcome').textContent = view.outcome || 'Avance o roteiro.';
  $('prevented-flag').textContent = view.prevented ? 'Bloqueada neste nível' : 'Pode ocorrer';
  $('demo-steps').innerHTML = view.schedule
    .map((text, i) => `<li class="op-line${i < view.elapsed ? ' done' : ''}">${i + 1}. ${text}</li>`)
    .join('');
  $('status').textContent = view.done ? `Fim — ${view.label}.` : `Demonstração: ${view.label}.`;
}

function stop() { playing = false; clearTimeout(timer); timer = null; }
function advance() {
  const schedule = IsolationLab.demoSchedule(anomaly);
  if (time < schedule.length) time++;
  if (IsolationLab.snapshot(level, anomaly, time).done) stop();
  render();
}
function queueTick() { clearTimeout(timer); if (!playing) return; timer = setTimeout(() => { advance(); queueTick(); }, Number($('speed').value)); }
function reset() {
  stop();
  time = 0;
  level = $('level').value;
  anomaly = $('anomaly').value;
  render();
  renderMatrix();
}

$('play').addEventListener('click', () => { if (playing) stop(); else { playing = true; queueTick(); } render(); });
$('step').addEventListener('click', () => { stop(); advance(); });
$('reset').addEventListener('click', reset);
$('level').addEventListener('change', reset);
$('anomaly').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
renderMatrix();
render();