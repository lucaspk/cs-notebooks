'use strict';

const $ = (id) => document.getElementById(id);
let preset = 'safe';
let stepIdx = 0;
let sequence = InterleaveLab.PRESETS.safe.slice();

function loadPreset(name) {
  preset = name;
  sequence = InterleaveLab.PRESETS[name].slice();
  stepIdx = 0;
  $('sequence').textContent = sequence.join(' → ');
  render();
}

function render() {
  const partial = sequence.slice(0, stepIdx);
  const result = partial.length ? InterleaveLab.runSequence(partial) : { counter: 0, log: [], done: false, invariantOk: null };
  $('counter').textContent = result.counter;
  $('log').innerHTML = result.log.map((line) => `<li>${line}</li>`).join('') || '<li class="practice-hint">Nenhum passo ainda.</li>';
  const full = stepIdx === sequence.length ? InterleaveLab.runSequence(sequence) : null;
  $('invariant').textContent = full
    ? full.invariantOk ? 'Invariante x = 2: OK ✓' : 'Invariante x = 2: violada ✗'
    : 'Execute os 6 passos para checar o invariante.';
  $('step').disabled = stepIdx >= sequence.length;
  $('done').textContent = stepIdx >= sequence.length ? 'Sequência completa.' : `Passo ${stepIdx} de ${sequence.length}`;
}

$('preset').addEventListener('change', () => loadPreset($('preset').value));
$('step').addEventListener('click', () => {
  if (stepIdx < sequence.length) stepIdx++;
  render();
});
$('reset').addEventListener('click', () => loadPreset(preset));
loadPreset('safe');