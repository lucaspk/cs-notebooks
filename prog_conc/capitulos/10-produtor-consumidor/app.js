'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['sync', 'unsafe'];
let time = 0;
let playing = false;
let timer = null;
let bufferSize = Number($('buffer').value);
let totalItems = Number($('items').value);
let schedules = {
  sync: ProducerConsumerLab.createBufferSchedule(bufferSize, totalItems, true),
  unsafe: ProducerConsumerLab.createBufferSchedule(bufferSize, totalItems, false),
};

function bufferHtml(n, size, over) {
  return Array.from({ length: size }, (_, i) =>
    `<span class="buffer-slot${i < n ? (over ? ' filled' : ' filled') : ''}" style="${over && i >= size ? 'background:#f5c4c4;border-color:#d99' : ''}">${i < n ? '•' : ''}</span>`,
  ).join('');
}

function renderMode(mode) {
  const view = ProducerConsumerLab.snapshot(schedules[mode], time);
  const cap = schedules[mode].bufferSize;
  const shown = Math.min(view.buffer, cap);
  const over = !schedules[mode].sync && view.buffer > cap;
  $(mode + '-buffer').innerHTML = bufferHtml(shown, cap, over);
  $(mode + '-metrics-prod').textContent = String(view.produced);
  $(mode + '-metrics-cons').textContent = String(view.consumed);
  $(mode + '-producer-state').textContent = view.producerAction;
  $(mode + '-consumer-state').textContent = view.consumerAction;
  $(mode + '-overflow').textContent = schedules[mode].sync ? '—' : String(view.overflows);
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.done
    ? `Concluído em t = ${schedules[mode].duration}` + (over ? ' (houve excesso no buffer).' : '')
    : `Buffer: ${view.buffer}${over ? ' (acima do limite!)' : ` / ${cap}`}`;
  $(mode + '-finish').textContent = view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : time === schedules.sync.duration ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= schedules.sync.duration;
  $('buffer-value').textContent = `${bufferSize} slots`;
  modes.forEach(renderMode);
  const v = ProducerConsumerLab.snapshot(schedules.sync, time);
  $('observation-text').innerHTML = v.producerAction === 'blocked'
    ? 'Produtor <strong>bloqueado</strong>: fila cheia.'
    : v.consumerAction === 'blocked'
      ? 'Consumidor <strong>bloqueado</strong>: fila vazia.'
      : 'Um passo: quem produz, quem consome, quem espera?';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  if (time < schedules.sync.duration) time++;
  if (time >= schedules.sync.duration) stop();
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
  bufferSize = Number($('buffer').value);
  totalItems = Number($('items').value);
  schedules = {
    sync: ProducerConsumerLab.createBufferSchedule(bufferSize, totalItems, true),
    unsafe: ProducerConsumerLab.createBufferSchedule(bufferSize, totalItems, false),
  };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time === schedules.sync.duration) reset();
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
$('buffer').addEventListener('change', reset);
$('items').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
render();