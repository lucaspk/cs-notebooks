'use strict';

const $ = PlaygroundLab.$;
const HOSTS = ArpLab.createSubnet([
  { id: 'A', hostOctet: 1, mac: 'aa:11:00:00:00:01', label: 'Host A' },
  { id: 'B', hostOctet: 2, mac: 'aa:11:00:00:00:02', label: 'Host B' },
  { id: 'G', hostOctet: 254, mac: 'aa:11:00:00:00:fe', label: 'Gateway' },
]);

let cache = {};
let plan = ArpLab.buildArpPlan(HOSTS, 'A', '10.0.0.2', cache);
let stepper;

function destIp() {
  const v = $('dest-ip').value;
  if (v === 'gateway') return '10.0.0.254';
  if (v === 'remote') return '192.0.2.50';
  return '10.0.0.2';
}

function renderCache() {
  const rows = Object.entries(cache);
  $('cache-body').innerHTML = rows.length
    ? rows.map(([k, mac]) => `<tr><td>${k}</td><td>${mac}</td></tr>`).join('')
    : '<tr><td colspan="2">vazio</td></tr>';
}

function rebuild(resetCache) {
  if (resetCache) cache = {};
  plan = ArpLab.buildArpPlan(HOSTS, 'A', destIp(), cache);
  stepper.reset(false);
}

function paint(view) {
  $('step-list').innerHTML = view.steps
    .map((s) => {
      const tag = s.broadcast ? ' · broadcast' : '';
      return `<li class="net-step"><strong>${s.title}</strong><span>${s.body}${tag}</span></li>`;
    })
    .join('');
  if (view.active) {
    $('step-list').innerHTML += `<li class="net-step is-active"><strong>${view.active.title}</strong><span>${view.active.body}</span></li>`;
  }
  if (view.done && plan.cacheKey && !plan.cacheHit) {
    cache = ArpLab.applyCache(plan, cache);
  }
  renderCache();
  if (plan.viaGateway) {
    $('observation-text').innerHTML = 'IP fora da LAN → ARP do <strong>gateway</strong>, não do destino final.';
  } else if (plan.cacheHit) {
    $('observation-text').textContent = 'Cache evita novo broadcast — TTL real expira depois.';
  } else if (view.active?.id === 'request') {
    $('observation-text').innerHTML = 'ARP usa o broadcast Ethernet do cap. <strong>06</strong>.';
  } else {
    $('observation-text').textContent = 'IP é destino lógico; primeiro quadro precisa MAC.';
  }
}

stepper = PlaygroundLab.mountStepper({
  stepId: 'step', resetId: 'reset', clockId: 'time',
  getPlan: () => plan, snapshot: ArpLab.snapshot, paint,
  onReset: () => {
    cache = {};
    plan = ArpLab.buildArpPlan(HOSTS, 'A', destIp(), cache);
  },
});
$('dest-ip').addEventListener('change', () => rebuild(false));
$('clear-cache').addEventListener('click', () => rebuild(true));
