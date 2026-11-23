'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['raw', 'mitigated'];
let time = 0;
let playing = false;
let timer = null;
let schedules = {
  raw: PriorityInversionLab.createInversionSchedule(false),
  mitigated: PriorityInversionLab.createInversionSchedule(true),
};

function renderMode(mode) {
  const view = PriorityInversionLab.snapshot(schedules[mode], time);
  const pills = [
    ['H', view.hWaiting ? 'bloqueada' : 'livre'],
    ['M', view.mRunning ? 'executando' : 'parada'],
    ['L', view.mutexHolder === 'L' ? 'segura mutex' : 'liberou'],
  ];
  $(mode + '-pills').innerHTML = pills
    .map(([id, st]) => `<span class="state-pill${st.includes('execut') || st.includes('segura') ? ' is-active' : ''}">${id}: ${st}</span>`)
    .join('');
  $(mode + '-l-progress').textContent = `${view.lProgress ?? 0}/${schedules[mode].lGoal}`;
  $(mode + '-note').textContent = view.note || '—';
  $(mode + '-inverted').textContent = view.inverted ? 'sim' : 'não';
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? 'Concluído ✓' : view.inverted ? 'Inversão ativa' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.inverted
    ? 'H espera L, mas M ainda usa o núcleo — inversão de prioridade.'
    : view.done
      ? 'Cadeia de bloqueios resolvida.'
      : view.note || '';
  $(mode + '-finish').textContent = view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  const end = Math.max(schedules.raw.duration, schedules.mitigated.duration);
  $('play-label').textContent = playing ? 'Pausar' : time === end ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= end;
  modes.forEach(renderMode);
  $('observation-text').innerHTML = 'Quem está <strong>executando</strong> enquanto H bloqueia no mutex?';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  const end = Math.max(schedules.raw.duration, schedules.mitigated.duration);
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
  schedules = { raw: PriorityInversionLab.createInversionSchedule(false), mitigated: PriorityInversionLab.createInversionSchedule(true) };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= Math.max(schedules.raw.duration, schedules.mitigated.duration)) reset();
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