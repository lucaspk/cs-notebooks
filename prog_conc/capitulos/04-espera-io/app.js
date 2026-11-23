'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let params = { cpuBefore: 2, ioTicks: 3, cpuAfter: 1, cpuB: 4 };
let sched = IoWaitLab.createIoSchedule(params);

function readParams() {
  return {
    cpuBefore: Number($('cpu-before').value),
    ioTicks: Number($('io-wait').value),
    cpuAfter: Number($('cpu-after').value),
    cpuB: Number($('cpu-b').value),
  };
}

function buildScenario() {
  $('timeline').style.setProperty('--ticks', sched.duration);
  $('timeline').innerHTML = `
    <div class="timeline-row"><span class="timeline-label">N1</span><div class="timeline-track">${Array.from({ length: sched.duration }, () => '<span class="time-cell"></span>').join('')}</div></div>
    <div class="timeline-axis"><span>0</span><span>${sched.duration}</span></div>`;
}

function render() {
  const view = IoWaitLab.snapshot(sched.schedule, time);
  $('time').textContent = time;
  const active = view.active;
  $('state-a').textContent = active?.a === 'io' ? 'Bloqueada (I/O)' : active?.a === 'cpu' ? 'Executando CPU' : view.done ? 'Concluída' : 'Pronta';
  $('state-b').textContent = active?.b === 'cpu' ? 'Executando CPU' : view.done ? 'Concluída' : active?.a === 'io' ? 'Usa o núcleo' : 'Aguardando';
  $('core-0').textContent = active?.core ? `Tarefa ${active.core}` : 'Livre';
  $('counts').textContent = `A: ${view.progress.aCpu} CPU + ${view.progress.aIo} I/O · B: ${view.progress.bCpu} CPU`;
  $('timeline').querySelectorAll('.time-cell').forEach((cell, tick) => {
    const t = sched.schedule[tick];
    const revealed = tick < time;
    const label = t.core ? t.core : t.a === 'io' ? 'I/O' : '';
    cell.textContent = revealed ? label : '';
    cell.className = 'time-cell' + (revealed && t.a === 'io' ? ' idle' : revealed && t.core ? ' filled' : '') + (tick === time - 1 ? ' latest' : '');
  });
  $('hint').textContent = active?.a === 'io' && active?.b === 'cpu'
    ? 'A espera rede; B avança — concorrência útil com 1 núcleo.'
    : active?.a === 'cpu' ? 'A na CPU; B só corre quando A bloqueia em I/O.' : '';
  $('step').disabled = time >= sched.duration;
}

function stop() {
  playing = false;
  clearTimeout(timer);
}

function advance() {
  if (time < sched.duration) time++;
  else stop();
  render();
}

function reset() {
  stop();
  time = 0;
  params = readParams();
  sched = IoWaitLab.createIoSchedule(params);
  buildScenario();
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time === sched.duration) reset();
    playing = true;
    timer = setTimeout(function tick() {
      advance();
      if (playing && time < sched.duration) timer = setTimeout(tick, Number($('speed').value));
      else playing = false;
    }, Number($('speed').value));
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', reset);
['cpu-before', 'io-wait', 'cpu-after', 'cpu-b'].forEach((id) => $(id).addEventListener('change', reset));
buildScenario();
render();