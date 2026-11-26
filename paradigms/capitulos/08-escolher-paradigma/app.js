'use strict';
const $ = (id) => document.getElementById(id);
function render() {
  for(const id of ['mudanca','equipe','conc','express']) $(id+'-value').textContent=$(id).value;
  const r = PickParadigmLab.scoreChoice({
    mudanca: $('mudanca').value,
    equipe: $('equipe').value,
    conc: $('conc').value,
    express: $('express').value,
  });
  $('top').textContent = `${r.top.style} (score ${r.top.score})`;
  $('list').innerHTML = r.picks.map((p) => `<li>${p.style}: ${p.score}</li>`).join('');
}
['mudanca', 'equipe', 'conc', 'express'].forEach((id) => $(id).addEventListener('input', render));
render();