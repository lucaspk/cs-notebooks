'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let isolation = 'read-committed';
let scenario = ReadSkewLab.createScenario(isolation);

function formatOp(entry) {
  const tag = entry.tx === 'T1' ? 'task-h' : 'task-m';
  return `<li class="op-line"><span class="task-letter ${tag}">${entry.tx}</span> ${entry.op}${entry.note ? ` — ${entry.note}` : ''}</li>`;
}

function render() {
  const view = ReadSkewLab.snapshot(scenario, time);
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('committed-alice').textContent = view.committed.alice;
  $('committed-bob').textContent = view.committed.bob;
  $('t1-reads').textContent = view.reads.alice != null && view.reads.bob != null ? `A=${view.reads.alice}, B=${view.reads.bob} (soma ${view.sum})` : '—';
  $('anomaly-flag').textContent = view.anomaly ? 'Sim — soma ≠ 1000' : view.done ? 'Não' : '—';
  $('op-log').innerHTML = view.log.map(formatOp).join('') || '<li class="op-line muted">Nenhum passo ainda.</li>';
  $('status').textContent = view.current ? `Passo ${view.elapsed}: ${view.current.tx} ${view.current.op}` : view.done ? 'Roteiro concluído.' : 'Pronto.';
}

function stop() { playing = false; clearTimeout(timer); timer = null; }
function advance() { if (time < scenario.steps.length) time++; if (ReadSkewLab.snapshot(scenario, time).done) stop(); render(); }
function queueTick() { clearTimeout(timer); if (!playing) return; timer = setTimeout(() => { advance(); queueTick(); }, Number($('speed').value)); }
function reset() { stop(); time = 0; isolation = $('isolation').value; scenario = ReadSkewLab.createScenario(isolation); render(); }

$('play').addEventListener('click', () => { if (playing) stop(); else { if (time >= scenario.steps.length) reset(); playing = true; queueTick(); } render(); });
$('step').addEventListener('click', () => { stop(); advance(); });
$('reset').addEventListener('click', reset);
$('isolation').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();