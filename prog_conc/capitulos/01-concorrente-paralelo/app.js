'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['concurrent', 'parallel'];
let time = 0;
let playing = false;
let timer = null;
let work = Number($('work').value);
let schedules = ExecutionLab.createSchedules(work, Number($('quantum').value));

function buildScenario(mode) {
  const cores = mode === 'concurrent' ? 1 : 2;
  $(mode + '-processors').innerHTML = Array.from({ length: cores }, (_, core) => `
    <div class="processor"><span class="processor-label">Núcleo ${core + 1}</span><span class="processor-task" id="${mode}-core-${core}">Livre</span><span class="processor-light" aria-hidden="true"></span></div>
  `).join('');
  $(mode + '-tasks').innerHTML = ['A', 'B'].map(task => `
    <div class="task" id="${mode}-task-${task}"><div class="task-heading"><span class="task-name"><span class="task-letter task-${task.toLowerCase()}">${task}</span>Tarefa ${task}</span><span class="task-state" id="${mode}-state-${task}">Pronta</span></div><div class="task-progress"><div class="blocks" id="${mode}-blocks-${task}">${Array.from({ length: work }, () => '<span class="work-block"></span>').join('')}</div><span class="task-count" id="${mode}-count-${task}">0/${work}</span></div></div>
  `).join('');
  const rows = Array.from({ length: cores }, (_, core) => `
    <div class="timeline-row"><span class="timeline-label">N${core + 1}</span><div class="timeline-track">${Array.from({ length: schedules.duration }, (_, tick) => `<span class="time-cell" data-tick="${tick}">${schedules[mode][tick]?.[core] || ''}</span>`).join('')}</div></div>
  `).join('');
  $(mode + '-timeline').style.setProperty('--ticks', schedules.duration);
  $(mode + '-timeline').innerHTML = rows + `<div class="timeline-axis"><span>0</span><span>${schedules.duration / 2}</span><span>${schedules.duration}</span></div>`;
}

function renderScenario(mode) {
  const schedule = schedules[mode];
  const view = ExecutionLab.snapshot(schedule, time, work);
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  for (const task of ['A', 'B']) {
    const amount = view.progress[task];
    $(mode + '-state-' + task).textContent = view.state[task] === 'Executando' && !playing ? 'Avançou neste passo' : view.state[task];
    $(mode + '-count-' + task).textContent = `${amount}/${work}`;
    $(mode + '-task-' + task).classList.toggle('is-active', view.active.includes(task) && amount < work);
    [...$(mode + '-blocks-' + task).children].forEach((block, index) => {
      block.className = 'work-block' + (index < amount ? ' filled task-' + task.toLowerCase() : '');
    });
  }
  [...$(mode + '-processors').children].forEach((processor, core) => {
    const task = view.active[core];
    processor.className = 'processor' + (task ? ' running task-' + task.toLowerCase() : '');
    $(mode + '-core-' + core).textContent = task ? `Tarefa ${task}` : view.done ? 'Livre ✓' : 'Livre';
  });
  const traces = [];
  $(mode + '-timeline').querySelectorAll('.timeline-row').forEach((row, core) => {
    const completed = [];
    row.querySelectorAll('.time-cell').forEach((cell, tick) => {
      const task = schedule[tick]?.[core];
      const revealed = tick < time;
      cell.textContent = revealed && task ? task : '';
      cell.className = 'time-cell' + (revealed && task ? ' filled task-' + task.toLowerCase() : '') + (revealed && !task ? ' idle' : '') + (tick === time - 1 && task ? ' latest' : '');
      if (revealed && task) completed.push(task);
    });
    traces.push(`Núcleo ${core + 1}: ${completed.join(', ') || 'nenhum bloco executado'}`);
  });
  $(mode + '-timeline').setAttribute('aria-label', `Tempo ${time}. ${traces.join('. ')}.`);
  $(mode + '-finish').textContent = view.done ? `Terminou em t = ${schedule.length}` : '';
  $(mode + '-status').textContent = view.done ? 'Todo o trabalho foi concluído.' : time === 0 ? 'As duas tarefas estão prontas.' : mode === 'parallel' ? 'Neste passo, A e B avançaram juntas.' : `Neste passo, só ${schedule[time - 1][0]} avançou.`;
}

function render() {
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : time === schedules.duration ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= schedules.duration;
  $('work-value').textContent = `${work} blocos`;
  $('work').setAttribute('aria-valuetext', `${work} blocos por tarefa`);
  modes.forEach(renderScenario);
  if (time === 0) {
    $('observation-label').textContent = 'EXPERIMENTE';
    $('observation-text').innerHTML = 'Clique em <strong>Um passo</strong>. Quantas tarefas avançam em cada cenário?';
  } else if (time < work) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML = 'Com um núcleo, só <strong>uma tarefa</strong> avança por passo. Com dois, <strong>as duas</strong> avançam.';
  } else if (time < schedules.duration) {
    $('observation-label').textContent = 'O QUE MUDOU?';
    $('observation-text').innerHTML = `O paralelo terminou em <strong>${work} unidades</strong>. O cenário com um núcleo ainda tem trabalho para fazer.`;
  } else {
    $('observation-label').textContent = 'AGORA, BRINQUE';
    const quantum = Number($('quantum').value);
    $('observation-text').innerHTML = `Mesmo trabalho: <strong>${work * 2} blocos</strong>. Um núcleo levou <strong>${schedules.duration}</strong> unidades; dois levaram <strong>${work}</strong>. Compare com a <strong>previsão da alternância</strong> (item 2). Depois siga para <strong>Comparar cenários</strong>.`;
    if (quantum !== 1) {
      $('observation-text').innerHTML += ` Alternância atual: <strong>${quantum}</strong> blocos.`;
    }
  }
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  if (time < schedules.duration) time++;
  if (time >= schedules.duration) stop();
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

function announce() {
  const concurrent = ExecutionLab.snapshot(schedules.concurrent, time, work);
  const parallel = ExecutionLab.snapshot(schedules.parallel, time, work);
  $('announcement').textContent = `Tempo ${time}. Um núcleo: A ${concurrent.progress.A} de ${work}, B ${concurrent.progress.B} de ${work}. Dois núcleos: A ${parallel.progress.A} de ${work}, B ${parallel.progress.B} de ${work}.`;
}

function reset() {
  stop();
  time = 0;
  work = Number($('work').value);
  schedules = ExecutionLab.createSchedules(work, Number($('quantum').value));
  modes.forEach(buildScenario);
  render();
  announce();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time === schedules.duration) reset();
    playing = true;
    queueTick();
  }
  render();
  announce();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
  announce();
});
$('reset').addEventListener('click', reset);
$('work').addEventListener('input', reset);
$('quantum').addEventListener('change', reset);
$('speed').addEventListener('change', queueTick);
modes.forEach(buildScenario);
render();
