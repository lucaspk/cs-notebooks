'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let workA = Number($('work-a').value);
let workB = Number($('work-b').value);
let schedule = SequentialLab.createSequentialSchedule(workA, workB);

function buildScenario() {
  $('processors').innerHTML = `
    <div class="processor"><span class="processor-label">Núcleo 1</span><span class="processor-task" id="core-0">Livre</span><span class="processor-light" aria-hidden="true"></span></div>`;
  $('tasks').innerHTML = ['A', 'B'].map((task) => {
    const work = task === 'A' ? workA : workB;
    return `<div class="task" id="task-${task}"><div class="task-heading"><span class="task-name"><span class="task-letter task-${task.toLowerCase()}">${task}</span>Tarefa ${task}</span><span class="task-state" id="state-${task}">Pronta</span></div><div class="task-progress"><div class="blocks" id="blocks-${task}">${Array.from({ length: work }, () => '<span class="work-block"></span>').join('')}</div><span class="task-count" id="count-${task}">0/${work}</span></div></div>`;
  }).join('');
  $('timeline').style.setProperty('--ticks', schedule.duration);
  $('timeline').innerHTML = `
    <div class="timeline-row"><span class="timeline-label">N1</span><div class="timeline-track">${Array.from({ length: schedule.duration }, (_, tick) => `<span class="time-cell" data-tick="${tick}"></span>`).join('')}</div></div>
    <div class="timeline-axis"><span>0</span><span>${Math.ceil(schedule.duration / 2)}</span><span>${schedule.duration}</span></div>`;
}

function render() {
  const view = SequentialLab.snapshot(schedule.schedule, time, workA, workB);
  $('time').textContent = time;
  $('panel').classList.toggle('is-done', view.done);
  $('badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  for (const task of ['A', 'B']) {
    const total = task === 'A' ? workA : workB;
    const amount = view.progress[task];
    $('state-' + task).textContent = view.state[task];
    $('count-' + task).textContent = `${amount}/${total}`;
    $('task-' + task).classList.toggle('is-active', view.active.includes(task) && amount < total);
    [...$('blocks-' + task).children].forEach((block, index) => {
      block.className = 'work-block' + (index < amount ? ' filled task-' + task.toLowerCase() : '');
    });
  }
  const active = view.active[0];
  $('core-0').textContent = active ? `Tarefa ${active}` : view.done ? 'Livre ✓' : 'Livre';
  $('processors').firstElementChild.className = 'processor' + (active ? ' running task-' + active.toLowerCase() : '');
  $('timeline').querySelectorAll('.time-cell').forEach((cell, tick) => {
    const task = schedule.schedule[tick]?.[0];
    const revealed = tick < time;
    cell.textContent = revealed && task ? task : '';
    cell.className = 'time-cell' + (revealed && task ? ' filled task-' + task.toLowerCase() : '') + (tick === time - 1 && task ? ' latest' : '');
  });
  $('finish').textContent = view.done ? `Terminou em t = ${schedule.duration}` : '';
  $('finish-a').textContent = view.progress.A >= workA ? `A em t = ${schedule.finishA}` : '';
  $('finish-b').textContent = view.progress.B >= workB ? `B em t = ${schedule.finishB}` : '';
  $('status').textContent = view.done
    ? 'B só começou depois que A terminou por completo.'
    : time === 0
      ? 'Fila: A primeiro, depois B — sem alternância.'
      : view.active[0]
        ? `Só ${view.active[0]} avança; ${view.active[0] === 'A' ? 'B espera na fila' : 'A já concluiu'}.`
        : '';
  $('play-label').textContent = playing ? 'Pausar' : time === schedule.duration ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= schedule.duration;
  $('work-a-value').textContent = `${workA} blocos`;
  $('work-b-value').textContent = `${workB} blocos`;
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
  workA = Number($('work-a').value);
  workB = Number($('work-b').value);
  schedule = SequentialLab.createSequentialSchedule(workA, workB);
  buildScenario();
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time === schedule.duration) reset();
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
$('work-a').addEventListener('input', reset);
$('work-b').addEventListener('input', reset);
$('speed').addEventListener('change', queueTick);
buildScenario();
render();