'use strict';
const $ = (id) => document.getElementById(id);
function render() {
  const kind = document.querySelector('input[name="kind"]:checked').value;
  const r = TypesLab.scenario(kind, $('sched').value, $('as-number').checked ? ($('hours').value.trim() === '' ? NaN : Number($('hours').value)) : $('hours').value);
  $('out').textContent = r.ok ? r.result : `ERRO: ${r.error}`;
}
document.querySelectorAll('input').forEach((el) => el.addEventListener('input', render));
document.querySelectorAll('input[name="kind"]').forEach((el) => el.addEventListener('change', render));
render();