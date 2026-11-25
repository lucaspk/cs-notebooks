'use strict';

const $ = (id) => document.getElementById(id);
let frame = EncapLab.buildFrame(256, 'udp');
let time = 0;
let playing = false;
let timer = null;

function rebuild() {
  frame = EncapLab.buildFrame(Number($('payload').value), $('transport').value);
  time = 0;
  stop();
  render();
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function renderStack(view) {
  const order = ['link', 'network', 'transport', 'app'];
  const active =
    view.mode === 'encap'
      ? view.step.phase === 'add'
        ? view.step.layer
        : 'app'
      : view.step.layer;
  const host = $('encap-stack');
  host.innerHTML = order
    .map((layer) => {
      const hdr = frame.headers[layer];
      if (!hdr) return '';
      const on = layer === active ? ' is-active' : '';
      const inner =
        layer === 'app'
          ? `<div class="encap-layer${on}">${hdr.label}<div class="encap-payload">${frame.payloadBytes} B</div></div>`
          : `<div class="encap-layer${on}">${hdr.label} · ${hdr.bytes} B</div>`;
      return inner;
    })
    .join('');
}

function render() {
  const view = EncapLab.snapshot(frame, time);
  $('time').textContent = String(view.time);
  $('total-steps').textContent = String(view.total);
  $('wire-bytes').textContent = String(view.onWire);
  $('step-caption').textContent = view.step.label;
  $('play-label').textContent = playing ? 'Pausar' : view.time >= view.total ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  renderStack(view);
  if (view.mode === 'router' && view.step.phase === 'route') {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'Roteador age na camada <strong>IP</strong> — não valida JSON/HTTP; Ethernet é trocada hop a hop.';
  } else if (view.time === 0) {
    $('observation-label').textContent = 'EXPERIMENTE';
    $('observation-text').textContent = 'Avance e veja cabeçalhos empilharem do app para o enlace.';
  } else {
    $('observation-label').textContent = 'SIGA';
    $('observation-text').textContent = view.step.label;
  }
}

function advance() {
  const view = EncapLab.snapshot(frame, time);
  if (view.time < view.total) time += 1;
  if (time >= view.total) stop();
  render();
}

function queueTick() {
  clearTimeout(timer);
  if (!playing) return;
  timer = setTimeout(() => {
    advance();
    queueTick();
  }, 500);
}

$('play').addEventListener('click', () => {
  const view = EncapLab.snapshot(frame, time);
  if (playing) stop();
  else {
    if (view.time >= view.total) {
      time = 0;
    }
    playing = true;
    queueTick();
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  advance();
});
$('reset').addEventListener('click', () => {
  time = 0;
  stop();
  render();
});
$('payload').addEventListener('input', () => {
  $('payload-preview').textContent = $('payload').value;
});
$('payload').addEventListener('change', rebuild);
$('transport').addEventListener('change', rebuild);

rebuild();