'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let config = readConfig();
let sched = ThreadSchedulerLab.createThreadScheduler(config);

function readConfig() {
  const cores = Number($('cores').value);
  const quantum = Number($('quantum').value);
  const threadWorks = $('thread-count').value === '2' ? [3, 3] : [2, 2, 2, 2];
  return { cores, threadWorks, quantum };
}

function buildScenario() {
  $('processors').innerHTML = Array.from({ length: config.cores }, (_, i) => `
    <div class="processor"><span class="processor-label">Núcleo ${i + 1}</span><span class="processor-task" id="core-${i}">Livre</span><span class="processor-light" aria-hidden="true"></span></div>`).join('');
  $('tasks').innerHTML = sched.threads.map((t) => `
    <div class="task" id="task-${t.id}"><div class="task-heading"><span class="task-name"><span class="task-letter">${t.id}</span>Thread ${t.id}</span><span class="task-state" id="state-${t.id}">Pronta</span></div><div class="task-progress"><div class="blocks" id="blocks-${t.id}">${Array.from({ length: t.work }, () => '<span class="work-block"></span>').join('')}</div><span class="task-count" id="count-${t.id}">0/${t.work}</span></div></div>`).join('');
  $('timeline').style.setProperty('--ticks', sched.duration);
  $('timeline').innerHTML = Array.from({ length: config.cores }, (_, core) => `
    <div class="timeline-row"><span class="timeline-label">N${core + 1}</span><div class="timeline-track">${Array.from({ length: sched.duration }, () => '<span class="time-cell"></span>').join('')}</div></div>`).join('') + `<div class="timeline-axis"><span>0</span><span>${Math.ceil(sched.duration / 2)}</span><span>${sched.duration}</span></div>`;
}

function render() {
  const view = ThreadSchedulerLab.snapshot(sched.schedule, time, config.threadWorks);
  $('time').textContent = time;
  $('badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  for (const t of sched.threads) {
    const amount = view.progress[t.id];
    $('state-' + t.id).textContent = view.state[t.id];
    $('count-' + t.id).textContent = `${amount}/${t.work}`;
    $('task-' + t.id).classList.toggle('is-active', view.active.some((s) => s && s.id === t.id));
    [...$('blocks-' + t.id).children].forEach((block, index) => {
      block.className = 'work-block' + (index < amount ? ' filled' : '');
    });
  }
  for (let core = 0; core < config.cores; core++) {
    const slot = view.active[core];
    const id = slot && slot.id;
    $('core-' + core).textContent = id || (view.done ? 'Livre ✓' : 'Livre');
    $('processors').children[core].className = 'processor' + (id ? ' running' : '');
  }
  $('timeline').querySelectorAll('.timeline-row').forEach((row, core) => {
    row.querySelectorAll('.time-cell').forEach((cell, tick) => {
      const slot = sched.schedule[tick]?.[core];
      const id = slot && slot.id;
      const revealed = tick < time;
      cell.textContent = revealed && id ? id : '';
      cell.className = 'time-cell' + (revealed && id ? ' filled' : '') + (tick === time - 1 && id ? ' latest' : '');
    });
  });
  $('status').textContent = view.done
    ? `${config.cores} núcleo(s), ${sched.threads.length} threads — escalonamento completo.`
  : `Fila de prontas: threads com blocos restantes competem pelos ${config.cores} núcleo(s).`;
  $('step').disabled = time >= sched.duration;
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  if (time < sched.duration) time++;
  if (time >= sched.duration) stop();
  render();
}

function reset() {
  stop();
  time = 0;
  config = readConfig();
  sched = ThreadSchedulerLab.createThreadScheduler(config);
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
      if (playing) timer = setTimeout(tick, Number($('speed').value));
    }, Number($('speed').value));
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', reset);
['cores', 'quantum', 'thread-count'].forEach((id) => $(id).addEventListener('change', reset));
buildScenario();
render();