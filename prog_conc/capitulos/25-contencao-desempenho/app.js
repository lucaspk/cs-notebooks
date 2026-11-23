'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let run = null;

function params() {
  return {
    workers: Number($('workers').value),
    cores: Number($('cores').value),
    localTicks: Number($('local').value),
    criticalTicks: Number($('critical').value),
    sharded: $('sharded').checked,
  };
}

function recompute() {
  run = ContentionLab.simulateContention(params());
  time = 0;
  render();
}

function workerLabels(frame) {
  const set = new Set([...(frame?.running || []), ...(frame?.onCritical || []), ...(frame?.waiting || [])]);
  return run.workers.map((w) => {
    let status = 'livre';
    if (w.phase === 'done') status = 'concluída';
    else if (frame?.onCritical.includes(w.id)) status = 'crítico';
    else if (frame?.waiting.includes(w.id)) status = 'esperando lock';
    else if (frame?.running.includes(w.id)) status = 'local';
    else if (w.phase === 'queue') status = 'fila';
    const tag = String.fromCharCode(65 + w.id);
    return `<div class="task" id="w-${w.id}"><div class="task-heading"><span class="task-name"><span class="task-letter task-${tag.toLowerCase()}">${tag}</span>Worker ${w.id + 1}</span><span class="task-state" id="w-state-${w.id}">${status}</span></div><div class="task-progress"><span class="task-count">útil ${w.useful} · espera acum. ${w.waiting}</span></div></div>`;
  }).join('');
}

function render() {
  const view = ContentionLab.snapshot(run, time);
  const frame = view.frame;
  $('time').textContent = view.time;
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('worker-grid').innerHTML = workerLabels(frame);
  $('status').textContent = view.done
    ? `Concluído em t=${view.duration}. Eficiência útil/(útil+espera): ${(view.aggregate.efficiency * 100).toFixed(0)}%.`
    : frame
      ? `t=${view.time}: executando local [${frame.running.join(', ') || '—'}]; crítico [${frame.onCritical.join(', ') || '—'}]; espera [${frame.waiting.join(', ') || '—'}].`
      : 'Pronto.';
  $('metric-wait').textContent = view.aggregate.waiting;
  $('metric-useful').textContent = view.aggregate.useful;
  $('metric-duration').textContent = view.duration;
  const sharded = $('sharded').checked;
  $('mode-label').textContent = sharded ? 'Locks fragmentados (1 por núcleo)' : 'Lock único compartilhado';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  if (time < run.duration) time++;
  if (time >= run.duration) stop();
  render();
}

function queueTick() {
  clearTimeout(timer);
  if (!playing) return;
  timer = setTimeout(() => {
    advance();
    queueTick();
  }, Number($('speed').value));
}

function reset(soft) {
  stop();
  if (!soft) recompute();
  else time = 0;
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= run.duration) time = 0;
    playing = true;
    queueTick();
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', () => reset(true));
['workers', 'cores', 'local', 'critical', 'sharded'].forEach((id) => {
  $(id).addEventListener('change', () => reset(false));
  if ($(id).type === 'range' || $(id).type === 'checkbox') $(id).addEventListener('input', () => reset(false));
});
$('speed').addEventListener('change', queueTick);

recompute();