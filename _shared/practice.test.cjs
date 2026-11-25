const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(__dirname + '/practice.js', 'utf8');
function load(store, book = 'prog_conc', explicit = true) {
  const field = { dataset: { practiceField: 'answer' }, value: '', addEventListener(event, fn) { this[event] = fn; } };
  const radio = { value: 'b', checked: false, addEventListener(event, fn) { this[event] = fn; } };
  const main = { dataset: { chapterId: '01-concorrente-paralelo', practiceMc: 'mc-ch01', ...(explicit ? { bookSlug: book } : {}) } };
  vm.runInNewContext(source, {
    location: { pathname: '/repos/' + book + '/capitulos/01-concorrente-paralelo/index.html' },
    localStorage: { getItem: k => store[k] || null, setItem: (k,v) => store[k] = v, removeItem: k => delete store[k] },
    document: { querySelector: q => q.startsWith('main') ? main : radio, querySelectorAll: q => q === '[data-practice-field]' ? [field] : q.startsWith('input') ? [radio] : [] }
  });
  return { field, radio };
}
test('fields and MC survive reload, with explicit slug and path fallback', () => {
  for (const explicit of [true, false]) {
    const store = {};
    const first = load(store, 'vv_eng', explicit);
    first.field.value = 'evidence'; first.field.input();
    first.radio.checked = true; first.radio.change();
    const second = load(store, 'vv_eng', explicit);
    assert.equal(second.field.value, 'evidence');
    assert.equal(second.radio.checked, true);
  }
});
test('legacy migration preserves answers and renames MC choice', () => {
  const store = { prog_conc_ch01_practice: JSON.stringify({ answer: 'legacy', mcChoice: 'b' }) };
  const result = load(store);
  assert.equal(result.field.value, 'legacy');
  assert.equal(result.radio.checked, true);
  assert.equal(store.prog_conc_ch01_practice, undefined);
});
