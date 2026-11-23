'use strict';

const $ = (id) => document.getElementById(id);

function show(key) {
  const sequence = LostCounterLab.EXPLAIN[key];
  const result = LostCounterLab.runRmw(sequence);
  $('mode-label').textContent = key === 'serialized' ? 'Serializado' : 'Entrelaceado';
  $('counter').textContent = result.counter;
  $('verdict').textContent = result.lost
    ? 'Atualização perdida: contador = 1 em vez de 2.'
    : 'Sem perda: contador = 2.';
  $('trace').innerHTML = result.trace.map((row) => `
    <tr><td>${row.who}</td><td>${row.phase}</td><td>${row.counter}</td><td>${JSON.stringify(row.registers)}</td></tr>`).join('');
}

$('scenario').addEventListener('change', () => show($('scenario').value));
show('interleaved');