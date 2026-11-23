'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['limited', 'unlimited'];
let time = 0;
let playing = false;
let timer = null;
let capacity = Number($('capacity').value);
let work = Number($('work').value);
let schedules = {
  limited: SemaphoreLab.createPoolSchedule(capacity, work, false),
  unlimited: SemaphoreLab.createPoolSchedule(capacity, work, true),
};

function renderWorkers(mode) {
  const view = SemaphoreLab.snapshot(schedules[mode], time, work);
  const wrap = $(mode + '-tasks');
  wrap.innerHTML = SemaphoreLab.WORKERS.map((w) => {
    const inside = view.inside.includes(w);
    const wait = view.waiting.includes(w);
    const st = view.progress[w] >= work ? 'Concluída' : inside ? 'No recurso' : wait ? 'Aguardando vaga' : 'Fora';
    const blocks = Array.from({ length: work }, (_, i) =>
      `<span class="work-block${i < view.progress[w] ? ' filled task-' + w.toLowerCase() : ''}"></span>`,
    ).join('');
    return `<div class="task" id="${mode}-task-${w}"><div class="task-heading"><span class="task-name"><span class="task-letter task-${w.toLowerCase()}">${w}</span>Tarefa ${w}</span><span class="task-state">${st}</span></div><div class="task-progress"><div class="blocks">${blocks}</div><span class="task-count">${view.progress[w]}/${work}</span></div></div>`;
  }).join('');
  $(mode + '-inside').textContent = `${view.inside.length}/${schedules[mode].capacity}`;
  $(mode + '-waiting').textContent = String(view.waiting.length);
  $(mode + '-peak').textContent = String(Math.max(view.peakInside, schedules[mode].ticks.slice(0, time).reduce((m, t) => Math.max(m, t.maxInside), 0)));
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.done
    ? `Pico dentro do recurso: ${schedules[mode].ticks.reduce((m, t) => Math.max(m, t.maxInside), 0)}`
    : view.inside.length
      ? `Dentro agora: ${view.inside.join(', ')}`
      : 'Ninguém no recurso neste passo.';
  $(mode + '-finish').textContent = view.done ? `Terminou em t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : time === schedules.limited.duration ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= schedules.limited.duration;
  $('work-value').textContent = `${work} blocos`;
  modes.forEach(renderWorkers);
  const lim = SemaphoreLab.snapshot(schedules.limited, time, work);
  if (time === 0) {
    $('observation-text').innerHTML = 'Com semáforo, observe quantas tarefas ficam <strong>dentro</strong> ao mesmo tempo.';
  } else if (!lim.done) {
    $('observation-text').innerHTML = `Limitado: ${lim.inside.length} dentro, ${lim.waiting.length} na fila.`;
  } else {
    $('observation-text').innerHTML = 'Compare o <strong>pico</strong> de ocupação nos dois painéis.';
  }
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  if (time < schedules.limited.duration) time++;
  if (time >= schedules.limited.duration) stop();
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
  capacity = Number($('capacity').value);
  work = Number($('work').value);
  schedules = {
    limited: SemaphoreLab.createPoolSchedule(capacity, work, false),
    unlimited: SemaphoreLab.createPoolSchedule(capacity, work, true),
  };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time === schedules.limited.duration) reset();
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
$('work').addEventListener('input', reset);
$('capacity').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();