'use strict';

const $ = (id) => document.getElementById(id);
let tab = 'amdahl';

function renderAmdahl() {
  const frac = Number($('parallel-frac').value) / 100;
  const timeline = PerformanceLimitsLab.amdahlTimeline(frac, 8);
  $('parallel-frac-label').textContent = `${(frac * 100).toFixed(0)}%`;
  $('amdahl-seq').textContent = (timeline.sequentialFraction * 100).toFixed(0);
  const rows = timeline.points
    .map((p) => `<tr><th scope="row">${p.workers}</th><td>${p.speedup.toFixed(2)}×</td><td>${(p.efficiency * 100).toFixed(0)}%</td></tr>`)
    .join('');
  $('amdahl-table').innerHTML = `<table class="tradeoff-table"><thead><tr><th scope="col">Workers</th><th scope="col">Speedup</th><th scope="col">Eficiência</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderFalseSharing() {
  const cores = Number($('fs-cores').value);
  const updates = Number($('fs-updates').value);
  const cmp = PerformanceLimitsLab.compareFalseSharing(cores, updates);
  $('fs-summary').textContent = `Mesma linha de cache: tráfego ${cmp.shared.traffic}; campos isolados: ${cmp.padded.traffic} (razão ${cmp.ratio.toFixed(1)}×).`;
}

function render() {
  $('panel-amdahl').hidden = tab !== 'amdahl';
  $('panel-fs').hidden = tab !== 'fs';
  if (tab === 'amdahl') renderAmdahl();
  else renderFalseSharing();
}

document.querySelectorAll('[data-tab]').forEach((btn) => {
  btn.addEventListener('click', () => {
    tab = btn.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('primary', b.dataset.tab === tab));
    render();
  });
});
['parallel-frac', 'fs-cores', 'fs-updates'].forEach((id) => $(id).addEventListener('input', render));
render();