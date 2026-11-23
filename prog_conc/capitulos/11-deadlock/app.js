'use strict';

const $ = (id) => document.getElementById(id);
const modes = ['risky', 'safe'];
let time = 0;
let playing = false;
let timer = null;
let schedules = {
  risky: DeadlockLab.createDeadlockSchedule(false),
  safe: DeadlockLab.createDeadlockSchedule(true),
};

function resourceChips(free, state) {
  return ['R1', 'R2']
    .map((r) => {
      const holder = DeadlockLab.TASKS.find((t) => state[t].holds.includes(r));
      const waiting = DeadlockLab.TASKS.find((t) => state[t].waiting === r);
      const cls = holder ? 'held' : waiting ? 'waiting' : '';
      const label = holder ? `R${r.slice(1)} ← ${holder}` : waiting ? `R${r.slice(1)}? ${waiting}` : `R${r.slice(1)} livre`;
      return `<span class="resource-chip ${cls}">${label}</span>`;
    })
    .join('');
}

function renderMode(mode) {
  const view = DeadlockLab.snapshot(schedules[mode], time);
  $(mode + '-resources').innerHTML = resourceChips(view.free, view.state);
  $(mode + '-tasks').innerHTML = DeadlockLab.TASKS.map((t) => {
    const s = view.state[t];
    const st = view.deadlock ? 'Deadlock' : s.work >= schedules[mode].workGoal ? 'Concluída' : s.waiting ? `Esperando ${s.waiting}` : s.holds.length ? `Segura ${s.holds.join('+')}` : 'Ativa';
    return `<div class="task"><div class="task-heading"><span class="task-name"><span class="task-letter task-${t.toLowerCase()}">${t}</span>Tarefa ${t}</span><span class="task-state">${st}</span></div><span class="task-count">${s.work}/${schedules[mode].workGoal} blocos</span></div>`;
  }).join('');
  $(mode + '-panel').classList.toggle('is-done', view.done);
  $(mode + '-badge').textContent = view.deadlock ? 'Deadlock' : view.done ? 'Concluído ✓' : time === 0 ? 'Pronto' : playing ? 'Em execução' : 'Pausado';
  $(mode + '-status').textContent = view.deadlock
    ? 'Ninguém avança: cada uma segura um recurso e espera o outro.'
    : view.done
      ? 'Trabalho concluído sem ciclo de espera.'
      : 'Observe a ordem de aquisição de R1 e R2.';
  $(mode + '-finish').textContent = view.deadlock ? 'Parado em deadlock' : view.done ? `t = ${schedules[mode].duration}` : '';
}

function render() {
  $('time').textContent = time;
  $('play-label').textContent = playing ? 'Pausar' : time === schedules.safe.duration ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = time >= schedules.safe.duration;
  modes.forEach(renderMode);
  const r = DeadlockLab.snapshot(schedules.risky, time);
  $('observation-text').innerHTML = r.deadlock
    ? '<strong>Deadlock</strong>: passeio pelos recursos segurados e pedidos.'
    : 'Execute até o painel de ordem oposta travar.';
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}
function advance() {
  const maxT = Math.max(schedules.risky.duration, schedules.safe.duration);
  if (time < maxT) time++;
  if (time >= schedules.safe.duration && DeadlockLab.snapshot(schedules.risky, Math.min(time, schedules.risky.duration)).deadlock) stop();
  if (time >= schedules.safe.duration) stop();
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
  schedules = { risky: DeadlockLab.createDeadlockSchedule(false), safe: DeadlockLab.createDeadlockSchedule(true) };
  render();
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= schedules.safe.duration) reset();
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