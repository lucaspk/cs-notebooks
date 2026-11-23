'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let schedule = LifecycleLab.createLifecycleSchedule(Number($('pool').value));

function render() {
  const view = LifecycleLab.snapshot(schedule, time);
  $('time').textContent = view.time ?? 0;
  $('pool-live').textContent = String(view.running?.length ?? 0);
  $('queue-live').textContent = String(view.queue?.length ?? 0);
  $('tasks').innerHTML = (view.tasks || []).map((t) => {
    const cls = ['sucesso', 'falha', 'timeout'].includes(t.state) ? ' is-active' : '';
    return `<div class="task"><div class="task-heading"><span class="task-name"><span class="task-letter task-${t.id.toLowerCase().replace('t', 'e')}">${t.id}</span>${t.id}</span><span class="task-state state-pill${cls}">${t.state}</span></div><span class="task-count">${t.progress} blocos</span></div>`;
  }).join('');
  $('badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $('panel').classList.toggle('is-done', view.done);
  $('status').textContent = view.done
    ? 'Note: timeout em T4 não cancelou T2; falha e join são estados distintos.'
    : `Em execução: ${(view.running || []).join(', ') || 'nenhuma'}`;
  $('finish').textContent = view.done ? `t = ${schedule.duration}` : '';
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('observation-text').innerHTML = 'T2 pode falhar enquanto T4 atinge <strong>timeout</strong> esperando — são eventos diferentes.';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  if (time < schedule.duration) time++;
  if (time >= schedule.duration) stop();
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
function reset() {
  stop();
  time = 0;
  schedule = LifecycleLab.createLifecycleSchedule(Number($('pool').value));
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= schedule.duration) reset();
    playing = true;
    queueTick();
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', reset);
$('pool').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();