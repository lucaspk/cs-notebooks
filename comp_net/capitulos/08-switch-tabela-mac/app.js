'use strict';

const $ = (id) => document.getElementById(id);
const HOSTS = [
  { port: 1, id: 'A', mac: 'aa:11:00:00:00:01', label: 'A' },
  { port: 2, id: 'B', mac: 'aa:11:00:00:00:02', label: 'B' },
  { port: 3, id: 'C', mac: 'aa:11:00:00:00:03', label: 'C' },
];

let state = SwitchLab.createSwitch(HOSTS);
let frameIdx = 0;
const presetFrames = [
  { ingressPort: 1, srcMac: HOSTS[0].mac, destMac: HOSTS[1].mac, label: '1º A→B' },
  { ingressPort: 2, srcMac: HOSTS[1].mac, destMac: HOSTS[0].mac, label: 'B→A (aprende B)' },
  { ingressPort: 1, srcMac: HOSTS[0].mac, destMac: HOSTS[1].mac, label: '2º A→B' },
];

function renderTable() {
  const rows = Object.entries(state.table);
  $('switch-table-body').innerHTML = rows.length
    ? rows.map(([mac, port]) => `<tr><td>${mac}</td><td>${port}</td></tr>`).join('')
    : '<tr><td colspan="2">vazia — ainda não aprendeu</td></tr>';
}

function renderPorts(activePorts) {
  ['p1', 'p2', 'p3'].forEach((id, i) => {
    const port = i + 1;
    $(id).classList.toggle('is-active', activePorts?.includes(port));
  });
}

function reset() {
  state = SwitchLab.createSwitch(HOSTS);
  frameIdx = 0;
  $('log-list').innerHTML = '';
  renderTable();
  renderPorts([]);
  $('observation-text').textContent = 'Preveja flood vs unicast antes de “Enviar quadro”.';
}

function sendNext() {
  if (frameIdx >= presetFrames.length) {
    $('observation-text').textContent = 'Compare 1º e 3º envio de A→B.';
    return;
  }
  const frame = presetFrames[frameIdx];
  const res = SwitchLab.forwardFrame(state, frame);
  state = res.state;
  frameIdx += 1;
  const li = `<li class="net-step ${res.mode === 'unicast' ? 'is-ok' : ''}"><strong>${res.step.title}</strong><span>${res.step.body}</span></li>`;
  $('log-list').innerHTML += li;
  renderTable();
  renderPorts(res.egressPorts);
  if (res.mode === 'flood') {
    $('observation-text').innerHTML =
      'Flood — ainda não sabe onde está o MAC destino (como ARP request passando pelo switch).';
  } else {
    $('observation-text').innerHTML =
      'Unicast na tabela — escopo L2 mais eficiente; broadcast/flood continua possível.';
  }
}

$('send').addEventListener('click', sendNext);
$('reset').addEventListener('click', reset);

reset();