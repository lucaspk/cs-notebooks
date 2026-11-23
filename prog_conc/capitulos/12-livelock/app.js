'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['polite', 'pragmatic'];
let time = 0;
let playing = false;
let timer = null;
let schedules = {
  polite: LivelockLab.createLivelockSchedule(false),
  pragmatic: LivelockLab.createLivelockSchedule(true),
};

function renderMode(mode) {
  const view = LivelockLab.snapshot(schedules[mode], time);
  $(mode + '-tasks').innerHTML = LivelockLab.TASKS.map((t) => {
    const pos = t === 'A' ? view.aPos : view.bPos;
    const goal = schedules[mode].goal;
    const blocks = Array.from({ length: goal }, (_, i) => `<span class="work-block${i < pos ? ' filled task-' + t.toLowerCase() : ''}"></span>`).join('');
    const st = pos >= goal ? 'Concluída' : view.collision ? 'Cedendo passagem' : 'Avançando';
    return `<div class="task"><div class="task-heading"><span class="task-name"><span class="task-letter task-${t.toLowerCase()}">${t}</span>Tarefa ${t}</span><span class="task-state">${st}</span></div><div class="task-progress"><div class="blocks">${blocks}</div><span class="task-count">${pos}/${goal}</span></div></div>`;
  }).join('');
  $(mode + '-yields').textContent = String(view.yields);
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.done
    ? `Utilidade concluída em t = ${schedules[mode].duration}`
    : view.collision
      ? 'Colisão: ambas reagem, mas ninguém termina o trabalho útil.'
      : `Cedências acumuladas: ${view.yields}`;
  $(mode + '-finish').textContent = view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  const end = Math.max(schedules.polite.duration, schedules.pragmatic.duration);
  $('play-label').textContent = playing ? 'Pausar' : time === end ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= end;
  modes.forEach(renderMode);
  const p = LivelockLab.snapshot(schedules.polite, time);
  $('observation-text').innerHTML = p.collision
    ? 'Há atividade, mas o progresso <strong>útil</strong> estagnou — livelock.'
    : 'Compare cedências eternas com uma regra que permite avançar.';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  const end = Math.max(schedules.polite.duration, schedules.pragmatic.duration);
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
  schedules = { polite: LivelockLab.createLivelockSchedule(false), pragmatic: LivelockLab.createLivelockSchedule(true) };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= Math.max(schedules.polite.duration, schedules.pragmatic.duration)) reset();
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