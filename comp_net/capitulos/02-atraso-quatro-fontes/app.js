'use strict';

const $ = (id) => document.getElementById(id);

function readControls() {
  return {
    distanceKm: Number($('distance').value),
    linkMbps: Number($('link-mbps').value),
    packetBytes: Number($('packet-bytes').value),
    queueMs: Number($('queue-ms').value),
    processMs: Number($('process-ms').value),
  };
}

function formatMs(n) {
  if (n < 0.1) return '<0,1';
  if (n < 10) return n.toFixed(2);
  if (n < 100) return n.toFixed(1);
  return String(Math.round(n));
}

const LABELS = {
  propagation: 'Propagação',
  transmission: 'Transmissão',
  queue: 'Fila',
  processing: 'Processamento',
};

function renderBars(parts) {
  const widths = DelayLab.barWidths(parts);
  const host = $('delay-bars');
  host.innerHTML = Object.keys(LABELS)
    .map((key) => {
      const dom = parts.dominant === key ? ' is-dominant' : '';
      return `<div class="delay-row"><span>${LABELS[key]}</span><div class="delay-bar${dom}"><span style="width:${widths[key]}%"></span></div><span>${formatMs(parts[key])} ms</span></div>`;
    })
    .join('');
}

function render() {
  const cfg = readControls();
  const parts = DelayLab.computeDelays(cfg);
  $('rtt-value').textContent = formatMs(parts.rtt);
  $('dominant-label').textContent = LABELS[parts.dominant] || parts.dominant;
  $('oneway-value').textContent = formatMs(parts.oneWay);
  renderBars(parts);
  $('distance-preview').textContent = String(cfg.distanceKm);
  $('link-preview').textContent = String(cfg.linkMbps);
  $('packet-preview').textContent = String(cfg.packetBytes);
  $('queue-preview').textContent = String(cfg.queueMs);
  const domPt = LABELS[parts.dominant];
  if (parts.dominant === 'queue' && cfg.queueMs > 20) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      `A <strong>fila</strong> responde à taxa de chegada vs saída — não confunda com “Wi‑Fi lento”.`;
  } else if (parts.dominant === 'transmission' && cfg.linkMbps < 5) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'Enlace estreito: <strong>transmissão</strong> (L/R) pesa mais que a distância curta.';
  } else if (parts.dominant === 'propagation' && cfg.distanceKm > 3000) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'Distância grande: <strong>propagação</strong> limitada pela velocidade do sinal — banda extra não some com isso.';
  } else {
    $('observation-label').textContent = 'COMPARE';
    $('observation-text').innerHTML =
      `Componente dominante (ida): <strong>${domPt}</strong>. Mude só um controle por vez e preveja o novo dominante.`;
  }
}

['distance', 'link-mbps', 'packet-bytes', 'queue-ms', 'process-ms'].forEach((id) => {
  $(id).addEventListener('input', render);
});

render();