'use strict';

const $ = (id) => document.getElementById(id);
let time = 0;
let playing = false;
let timer = null;
let plan = EndpointsLab.createDeliveryPlan($('message').value);

function interpretKey() {
  return $('interpret').value;
}

function rebuildPlan() {
  try {
    plan = EndpointsLab.createDeliveryPlan($('message').value);
    $('message-error').hidden = true;
  } catch {
    $('message-error').hidden = false;
    return false;
  }
  return true;
}

function renderTopology(view) {
  const onWire = view.time >= 3 && view.time < view.total;
  $('host-a').classList.toggle('is-active', view.active?.host === 'A');
  $('host-b').classList.toggle('is-active', view.active?.host === 'B');
  $('host-link').classList.toggle('is-active', view.active?.host === 'link');
  $('link-payload').hidden = !onWire;
  if (onWire) $('link-payload').textContent = `${plan.bytes} bytes (opaco)`;
  $('topology-caption').textContent =
    view.time === 0
      ? 'Dois pontos extremos; a rede no meio não interpreta o conteúdo.'
      : view.done
        ? 'Mesmos bytes chegaram; só a aplicação em B atribui significado.'
        : `Passo ${view.time} de ${view.total}`;
}

function renderSteps(view) {
  const list = $('step-list');
  list.innerHTML = view.steps
    .map((step) => {
      const tag = step.layer === 'net' ? 'Rede' : 'App';
      const ok = step.ok === false ? ' is-warn' : step.ok === true ? ' is-ok' : '';
      return `<li class="net-step${ok}"><span class="net-step-tag">${tag} · ${step.host}</span><strong>${step.title}</strong><span>${step.body}</span></li>`;
    })
    .join('');
  if (view.active && !view.done) {
    const tag = view.active.layer === 'net' ? 'Rede' : 'App';
    list.innerHTML += `<li class="net-step is-active"><span class="net-step-tag">${tag} · ${view.active.host}</span><strong>${view.active.title}</strong><span>Em andamento…</span></li>`;
  }
}

function render() {
  const view = EndpointsLab.snapshot(plan, time, interpretKey());
  $('time').textContent = String(view.time);
  $('play-label').textContent = playing ? 'Pausar' : view.done ? 'Repetir' : time > 0 ? 'Continuar' : 'Executar';
  $('play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('step').disabled = view.done;
  $('byte-count').textContent = String(plan.bytes);
  $('interpret-label').textContent = view.mode;
  renderTopology(view);
  renderSteps(view);
  if (time === 0) {
    $('observation-label').textContent = 'EXPERIMENTE';
    $('observation-text').innerHTML =
      'Clique em <strong>Um passo</strong>. Em qual etapa os bytes viram “opacos” para a rede?';
  } else if (view.active?.id === 'transit') {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'No enlace só contam <strong>bytes</strong>. O texto “faz sentido” só nas aplicações.';
  } else if (view.done) {
    $('observation-label').textContent = 'COMPARE';
    $('observation-text').innerHTML =
      'Mude <strong>como B interpreta</strong> (sem reenviar): os bytes na rede seriam os mesmos. Rode de novo com <strong>JSON</strong> ou <strong>HTTP</strong>.';
  } else {
    $('observation-label').textContent = 'SIGA';
    $('observation-text').textContent = view.active?.body || 'Avance mais um passo.';
  }
}

function stop() {
  playing = false;
  clearTimeout(timer);
  timer = null;
}

function advance() {
  const view = EndpointsLab.snapshot(plan, time, interpretKey());
  if (view.time < view.total) time += 1;
  if (time >= plan.steps.length) stop();
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
  if (!rebuildPlan()) return;
  render();
}

$('play').addEventListener('click', () => {
  if (!rebuildPlan()) return;
  const view = EndpointsLab.snapshot(plan, time, interpretKey());
  if (playing) {
    stop();
  } else {
    if (view.done) reset();
    playing = true;
    queueTick();
  }
  render();
});
$('step').addEventListener('click', () => {
  stop();
  if (!rebuildPlan()) return;
  advance();
});
$('reset').addEventListener('click', reset);
$('message').addEventListener('input', () => {
  $('message-preview').textContent = $('message').value;
});
$('message').addEventListener('change', reset);
$('interpret').addEventListener('change', () => {
  document.getElementById('prediction-interpret-hint').hidden = false;
  render();
});
$('speed').addEventListener('change', queueTick);

reset();