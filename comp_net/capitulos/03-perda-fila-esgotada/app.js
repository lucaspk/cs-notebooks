'use strict';

const $ = (id) => document.getElementById(id);

function read() {
  return {
    arrivals: Number($('arrivals').value),
    queueCapacity: Number($('capacity').value),
    arrivalPerRound: Number($('arrival-burst').value),
    serviceSlotsPerRound: Number($('service-rate').value),
    linkBer: Number($('ber').value) / 100,
    seed: Number($('seed').value),
  };
}

function render() {
  const cfg = read();
  const r = LossLab.simulateLoss(cfg);
  const kind = LossLab.classifyPrimaryLoss(r, cfg.linkBer);
  $('delivered').textContent = String(r.delivered);
  $('drop-queue').textContent = String(r.droppedQueue);
  $('drop-link').textContent = String(r.droppedLink);
  $('rate').textContent = `${(r.deliveryRate * 100).toFixed(0)}%`;
  $('arrivals-preview').textContent = String(cfg.arrivals);
  $('capacity-preview').textContent = String(cfg.queueCapacity);
  $('burst-preview').textContent = String(cfg.arrivalPerRound);
  $('service-preview').textContent = String(cfg.serviceSlotsPerRound);
  $('ber-preview').textContent = String((cfg.linkBer * 100).toFixed(1));

  const labels = { queue: 'fila esgotada', link: 'enlace com erro', none: 'sem perda relevante' };
  $('loss-kind').textContent = labels[kind] || kind;

  if (kind === 'queue') {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'Chegada &gt; saída com buffer finito → <strong>descarte na fila</strong> (não é “só wireless”).';
  } else if (kind === 'link') {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'Fila ainda tinha espaço, mas o <strong>enlace</strong> corrompeu/descartou — sintoma parecido, causa diferente.';
  } else {
    $('observation-label').textContent = 'COMPARE';
    $('observation-text').textContent =
      'Aumente só a taxa de chegada ou só o BER e preveja qual contador sobe primeiro.';
  }
}

['arrivals', 'capacity', 'arrival-burst', 'service-rate', 'ber', 'seed'].forEach((id) => {
  $(id).addEventListener('input', render);
});
$('run').addEventListener('click', render);

render();