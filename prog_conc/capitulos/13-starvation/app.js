'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['unfair', 'fair'];
let time = 0;
let playing = false;
let timer = null;
let schedules = {
  unfair: StarvationLab.createStarvationSchedule(false),
  fair: StarvationLab.createStarvationSchedule(true),
};

function renderMode(mode) {
  const view = StarvationLab.snapshot(schedules[mode], time);
  const goal = schedules[mode].workPerTask;
  $(mode + '-tasks').innerHTML = StarvationLab.TASKS.map((t) => {
    const p = view.progress[t];
    const blocks = Array.from({ length: goal }, (_, i) => `<span class="work-block${i < p ? ' filled task-' + t.toLowerCase() : ''}"></span>`).join('');
    const st = p >= goal ? 'Concluída' : view.ran === t ? 'Executou agora' : p === 0 && view.starved ? 'Inanição' : 'Pronta / esperando';
    return `<div class="task"><div class="task-heading"><span class="task-name"><span class="task-letter task-${t.toLowerCase()}">${t}</span>Prioridade ${t}</span><span class="task-state">${st}</span></div><div class="task-progress"><div class="blocks">${blocks}</div><span class="task-count">${p}/${goal}</span></div></div>`;
  }).join('');
  $(mode + '-last').textContent = view.ran || '—';
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? (view.starved ? 'L inanição' : 'Concluído ✓') : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.done
    ? view.starved
      ? 'L não atingiu a meta de blocos.'
      : 'Todas completaram trabalho justo.'
    : view.ran
      ? `Executou: ${view.ran}`
      : 'Sem CPU neste passo.';
  $(mode + '-finish').textContent = view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  const end = Math.max(schedules.unfair.duration, schedules.fair.duration);
  $('play-label').textContent = playing ? 'Pausar' : time === end ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= end;
  modes.forEach(renderMode);
  $('observation-text').innerHTML = 'Quem ganha o núcleo quando <strong>H</strong> e <strong>M</strong> voltam a ficar prontos?';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  const end = Math.max(schedules.unfair.duration, schedules.fair.duration);
  if (time < end) time++;
  if (time >= end) stop();
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
  schedules = { unfair: StarvationLab.createStarvationSchedule(false), fair: StarvationLab.createStarvationSchedule(true) };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= Math.max(schedules.unfair.duration, schedules.fair.duration)) reset();
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
$('speed').addEventListener('change', queueTick);
render();