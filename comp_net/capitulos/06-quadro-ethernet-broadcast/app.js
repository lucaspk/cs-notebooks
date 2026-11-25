'use strict';

const $ = (id) => document.getElementById(id);
const LAN = EthernetLab.createLan([
  { id: 'A', mac: 'aa:11:11:11:11:01', label: 'Host A' },
  { id: 'B', mac: 'aa:11:11:11:11:02', label: 'Host B' },
  { id: 'C', mac: 'aa:11:11:11:11:03', label: 'Host C' },
]);

let plan = EthernetLab.buildSendPlan(LAN, 'A', LAN.hosts[1].mac);
let time = 0;
let playing = false;
let timer = null;

function destMac() {
  return $('dest').value === 'broadcast'
    ? EthernetLab.BROADCAST_MAC
    : LAN.hosts.find((h) => h.id === $('dest').value).mac;
}

function rebuild() {
  plan = EthernetLab.buildSendPlan(LAN, $('src').value, destMac());
  time = 0;
  stop();
  render();
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function highlightHosts(view) {
  const activeId = view.active?.host || (view.active?.id === 'wire' ? 'link' : view.active?.id === 'compose' ? $('src').value : null);
  $('host-a').classList.toggle('is-active', activeId === 'A');
  $('host-b').classList.toggle('is-active', activeId === 'B');
  $('host-c').classList.toggle('is-active', activeId === 'C');
  $('host-link').classList.toggle('is-active', activeId === 'link' || view.active?.id === 'wire');
}

function renderSteps(view) {
  $('step-list').innerHTML = view.steps
    .map((s) => `<li class="net-step"><strong>${s.title}</strong><span>${s.body}</span></li>`)
    .join('');
  if (view.active && !view.done) {
    $('step-list').innerHTML += `<li class="net-step is-active"><strong>${view.active.title}</strong><span>${view.active.body}</span></li>`;
  }
}

function render() {
  const view = EthernetLab.snapshot(plan, time);
  $('time').textContent = String(view.time);
  $('recv-count').textContent = String(plan.recipients.length);
  $('mode-label').textContent = plan.isBroadcast ? 'Broadcast' : 'Unicast';
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : 'Executar';
  highlightHosts(view);
  renderSteps(view);
  if (view.time === 0) {
    $('observation-text').textContent = 'Preveja quantos hosts recebem antes de executar.';
  } else if (plan.isBroadcast) {
    $('observation-text').innerHTML =
      'Broadcast = domínio L2: <strong>todos</strong> na LAN processam (CPU pode ignorar depois).';
  } else {
    $('observation-text').textContent = 'Unicast: só o MAC de destino deve acender como receptor.';
  }
}

function advance() {
  if (time < plan.steps.length) time += 1;
  if (time >= plan.steps.length) stop();
  render();
}

function queueTick() {
  clearTimeout(timer);
  if (!playing) return;
  timer = setTimeout(() => {
    advance();
    queueTick();
  }, 650);
}

$('play').addEventListener('click', () => {
  if (playing) stop();
  else {
    if (time >= plan.steps.length) time = 0;
    playing = true;
    queueTick();
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', rebuild);
$('src').addEventListener('change', rebuild);
$('dest').addEventListener('change', rebuild);

rebuild();