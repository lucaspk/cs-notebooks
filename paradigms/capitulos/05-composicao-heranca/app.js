'use strict';
const $ = (id) => document.getElementById(id);
function render() {
  const r = ComposeLab.compare($('msg').value);
  $('inh').textContent = r.inheritance;
  $('comp').textContent = r.composition;
}
$('msg').addEventListener('input', render);
render();