'use strict';
const $ = (id) => document.getElementById(id);
function render() {
  const r = ConcModelLab.compare($('turns').value);
  $('shared').textContent = r.shared.trace.map((t) => t.counter).join(' → ');
  $('msg').textContent = r.messages.trace.map((t) => t.counter).join(' → ');
}
$('turns').addEventListener('input', render);
render();