const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function environment() {
  const nodes = {};
  const node = id => nodes[id] ||= {
    value: id === 'dest-ip' ? 'local' : '', textContent: '', innerHTML: '',
    listeners: {}, addEventListener(e, f) { this.listeners[e] = f; },
    removeEventListener(e) { delete this.listeners[e]; },
    querySelector() { return node('out'); },
  };
  const context = vm.createContext({ document: { getElementById: node, querySelector: s => node(s.slice(1)), querySelectorAll: () => [] } });
  const run = file => vm.runInContext(fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8'), context);
  run('_shared/lab-kit.js');
  return { node, run, context };
}
test('ARP pilot steps, cache reuse, gateway switch and reset', () => {
  const { node, run } = environment();
  run('comp_net/capitulos/07-arp-primeiro-salto/model.js');
  run('comp_net/capitulos/07-arp-primeiro-salto/app.js');
  assert.equal(node('time').textContent, '0');
  for (let i = 0; i < 20; i++) node('step').listeners.click();
  assert.match(node('cache-body').innerHTML, /aa:11/);
  const doneTime = node('time').textContent;
  node('step').listeners.click();
  assert.equal(node('time').textContent, doneTime);
  node('dest-ip').listeners.change();
  assert.match(node('observation-text').textContent, /Cache evita/);
  node('dest-ip').value = 'remote'; node('dest-ip').listeners.change();
  assert.match(node('observation-text').innerHTML, /gateway/);
  node('reset').listeners.click();
  assert.equal(node('time').textContent, '0');
  assert.match(node('cache-body').innerHTML, /vazio/);
});
test('toggle pilot mounts and rerenders when controls change', () => {
  const { node, run, context } = environment();
  run('vv_eng/capitulos/01-falha-reproduzivel/model.js');
  run('vv_eng/capitulos/01-falha-reproduzivel/app.js');
  assert.equal(node('out').textContent, '0 de 5 informações presentes');
  vm.runInContext("document.querySelectorAll = () => [{ checked: true, dataset: { k: 'sintoma' } }]", context);
  node('lab-host').listeners.change();
  assert.equal(node('out').textContent, '1 de 5 informações presentes');
});
