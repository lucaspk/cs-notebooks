'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let isolation = 'read-uncommitted';
let scenario = DirtyReadLab.createScenario(isolation);

function formatOp(entry) {
  const tag = entry.tx === 'T1' ? 'task-h' : 'task-m';
  return `<li class="op-line"><span class="task-letter ${tag}">${entry.tx}</span> ${entry.op}${entry.note ? ` — ${entry.note}` : ''}</li>`;
}

function render() {
  const view = DirtyReadLab.snapshot(scenario, time);
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('committed-saldo').textContent = view.committed.saldo;
  $('badge-t1').textContent = view.txs.T1?.active ? 'Aberta' : view.elapsed > 2 ? 'Desfeita' : '—';
  $('badge-t2').textContent = view.txs.T2?.active ? 'Aberta' : view.done ? 'Confirmada' : '—';
  $('t2-read').textContent = view.t2Read ?? '—';
  $('anomaly-flag').textContent = view.anomaly ? 'Sim — leitura suja' : view.elapsed >= 4 ? 'Não' : '—';
  $('anomaly-flag').className = 'lab-metric' + (view.anomaly ? ' is-warn' : '');
  $('op-log').innerHTML = view.log.map(formatOp).join('') || '<li class="op-line muted">Nenhum passo ainda.</li>';
  if (view.current) {
    $('status').textContent = `Passo ${view.elapsed}: ${view.current.tx} ${view.current.op}`;
  } else $('status').textContent = view.done ? 'Roteiro concluído.' : 'Pronto para o primeiro passo.';
  if (time === 4) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML = view.anomaly
      ? 'T2 leu <strong>200</strong> que nunca existiu de forma confirmada — isso é <strong>dirty read</strong>.'
      : 'Com isolamento mais forte, T2 só vê o valor <strong>confirmado</strong>.';
  }
}

function stop() { playing = false; clearTimeout(timer); timer = null; }
function advance() { const m = DirtyReadLab.snapshot(scenario, time + 1); if (time < scenario.steps.length) time++; if (m.done) stop(); render(); }
function queueTick() { clearTimeout(timer); if (!playing) return; timer = setTimeout(() => { advance(); queueTick(); }, Number($('speed').value)); }
function reset() {
  stop();
  time = 0;
  isolation = $('isolation').value;
  scenario = DirtyReadLab.createScenario(isolation);
  render();
}

$('play').addEventListener('click', () => { if (playing) stop(); else { if (time >= scenario.steps.length) reset(); playing = true; queueTick(); } render(); });
$('step').addEventListener('click', () => { stop(); advance(); });
$('reset').addEventListener('click', reset);
$('isolation').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();