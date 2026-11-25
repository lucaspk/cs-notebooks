'use strict';

const $ = (id) => document.getElementById(id);

function readLinks() {
  return [Number($('link-a').value), Number($('link-b').value), Number($('link-c').value)];
}

function formatSec(ms) {
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)} s`;
  const m = Math.floor(s / 60);
  const rem = (s % 60).toFixed(1);
  return `${m} min ${rem} s`;
}

function render() {
  const links = readLinks();
  const fileBytes = Number($('file-mb').value) * 1024 * 1024;
  const b = ThroughputLab.bottleneckMbps(links);
  const labels = ['A→B', 'B→C', 'C→dest'];
  $('bottleneck-mbps').textContent = String(b.mbps);
  $('bottleneck-id').textContent = labels[b.index] || String(b.index);
  $('eta').textContent = formatSec(ThroughputLab.transferTimeMs(fileBytes, links));

  $('pipe-segments').innerHTML = links
    .map((mbps, i) => {
      const bot = i === b.index ? ' is-bottleneck' : '';
      return `<div class="pipe-segment${bot}">${labels[i]}<br>${mbps} Mbps</div>`;
    })
    .join('');

  $('file-preview').textContent = String($('file-mb').value);
  if (b.mbps < 20) {
    $('observation-label').textContent = 'OBSERVE';
    $('observation-text').innerHTML =
      'O elo <strong>mais lento</strong> define o tempo total — os outros podem ficar ociosos.';
  } else {
    $('observation-label').textContent = 'COMPARE';
    $('observation-text').textContent =
      'Dobre só o elo do meio: o tempo cai? Dobre só o elo rápido da ponta — muda?';
  }
}

['link-a', 'link-b', 'link-c', 'file-mb'].forEach((id) => {
  $(id).addEventListener('input', render);
});

render();