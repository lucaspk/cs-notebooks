'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let mode = 'sem-protecao';
let scenario = DirtyWriteLab.createScenario(mode);

function formatOp(entry) {
  const tag = entry.tx === 'T1' ? 'task-h' : 'task-m';
  return `<li class="op-line"><span class="task-letter ${tag}">${entry.tx}</span> ${entry.op}${entry.note ? ` — ${entry.note}` : ''}</li>`;
}

function render() {
  const view = DirtyWriteLab.snapshot(scenario, time);
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('committed-nota').textContent = view.committed.nota;
  $('anomaly-flag').textContent = view.anomaly ? 'Sim — escrita suja' : view.done ? 'Não' : '—';
  $('op-log').innerHTML = view.log.map(formatOp).join('') || '<li class="op-line muted">Nenhum passo ainda.</li>';
  $('status').textContent = view.current ? `Passo ${view.elapsed}: ${view.current.tx} ${view.current.op}` : view.done ? 'Roteiro concluído.' : 'Pronto.';
  if (time === 4 && view.blocked) {
    $('observation-text').innerHTML = 'T2 <strong>não pôde</strong> sobrescrever a alteração pendente de T1.';
  }
}

function stop() { playing = false; clearTimeout(timer); timer = null; }
function advance() { if (time < scenario.steps.length) time++; if (DirtyWriteLab.snapshot(scenario, time).done) stop(); render(); }
function queueTick() { clearTimeout(timer); if (!playing) return; timer = setTimeout(() => { advance(); queueTick(); }, Number($('speed').value)); }
function reset() { stop(); time = 0; mode = $('mode').value; scenario = DirtyWriteLab.createScenario(mode); render(); }

$('play').addEventListener('click', () => { if (playing) stop(); else { if (time >= scenario.steps.length) reset(); playing = true; queueTick(); } render(); });
$('step').addEventListener('click', () => { stop(); advance(); });
$('reset').addEventListener('click', reset);
$('mode').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();