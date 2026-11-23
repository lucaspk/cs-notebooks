'use strict';

const $ = (id) => document.getElementById(id);

const MODES = {
  none: { label: 'Sem proteção', sequence: MutexLab.RACE, mode: 'none' },
  mutex: { label: 'Mutex', sequence: MutexLab.MUTEX_A, mode: 'mutex' },
  atomic: { label: 'Incremento atômico', sequence: MutexLab.ATOMIC, mode: 'atomic' },
};

function render() {
  const cfg = MODES[$('mode').value];
  const result = MutexLab.runWithSync(cfg.sequence, cfg.mode);
  $('counter').textContent = result.counter;
  $('verdict').textContent = result.correct
    ? 'Contador correto (2). Seção crítica respeitada.'
    : 'Contador incorreto — operação composta foi dividida.';
  $('trace').innerHTML = result.trace.map((row) => `
    <tr><td>${row.who ?? '—'}</td><td>${row.phase}</td><td>${row.counter}</td><td>${row.lock === undefined ? '' : row.lock ? 'travado' : 'livre'}</td></tr>`).join('');
}

$('mode').addEventListener('change', render);
render();