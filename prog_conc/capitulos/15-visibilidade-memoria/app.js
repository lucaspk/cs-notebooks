'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['unsafe', 'safe'];
let time = 0;
let playing = false;
let timer = null;
let schedules = {
  unsafe: VisibilityLab.createVisibilitySchedule(false),
  safe: VisibilityLab.createVisibilitySchedule(true),
};

function renderMode(mode) {
  const view = VisibilityLab.snapshot(schedules[mode], time);
  $(mode + '-mem-data').textContent = String(view.memory.data);
  $(mode + '-mem-ready').textContent = String(view.memory.ready);
  $(mode + '-read-data').textContent = view.reader.data === null ? '—' : String(view.reader.data);
  $(mode + '-read-ready').textContent = String(view.reader.ready);
  $(mode + '-note').textContent = view.note;
  $(mode + '-bug').textContent = view.bug ? 'leitura inconsistente' : 'ok';
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? (view.bug ? 'Bug visível' : 'Concluído ✓') : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.bug
    ? 'Leitor acordou com ready=1 antes de data visível.'
    : view.done
      ? 'Par publicado de forma consistente.'
      : view.note;
  $(mode + '-finish').textContent = view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  const end = Math.max(schedules.unsafe.duration, schedules.safe.duration);
  $('play-label').textContent = playing ? 'Pausar' : time === end ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= end;
  modes.forEach(renderMode);
  const u = VisibilityLab.snapshot(schedules.unsafe, time);
  $('observation-text').innerHTML = u.bug
    ? 'O modelo de memória permite <strong>data=0</strong> com <strong>ready=1</strong>.'
    : 'Compare a ordem vista pelo leitor nos dois painéis.';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  const end = Math.max(schedules.unsafe.duration, schedules.safe.duration);
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
  schedules = { unsafe: VisibilityLab.createVisibilitySchedule(false), safe: VisibilityLab.createVisibilitySchedule(true) };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= Math.max(schedules.unsafe.duration, schedules.safe.duration)) reset();
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