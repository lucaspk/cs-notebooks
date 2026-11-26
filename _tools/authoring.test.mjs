import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateChapter } from './validate-chapter.mjs';
import { buildBookIndex } from './build-book-index.mjs';
import { chapterPublished } from './index-items.mjs';
import components from '../_shared/lab-components.js';

const repo = fileURLToPath(new URL('../', import.meta.url));
test('static validation rejects duplicate IDs, unlabeled fields, missing assets, radio mismatch and drafts', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chapter-validation-'));
  try {
    fs.writeFileSync(path.join(dir, 'index.html'), '<main data-chapter-id="01-test" data-practice-mc="mc"><input id="x"><input id="x"><img src="missing.png"><input type="radio" name="wrong"><a href="missing.html">Next</a>PREENCHER</main>');
    fs.writeFileSync(path.join(dir, 'chapter.json'), '{"status":"draft"}');
    fs.writeFileSync(path.join(dir, 'GABARITO.md'), 'PREENCHER');
    const issues = validateChapter(dir).join('\n');
    for (const message of ['ID duplicado', 'Campo sem rótulo', 'inexistente', 'Radio diverge', 'Placeholder', 'Gabarito com placeholder', 'status ready']) assert.ok(issues.includes(message), message);
    fs.writeFileSync(path.join(dir, 'index.html'), '<main data-chapter-id="01-test" data-practice-mc="mc"><label for="x">Value</label><input id="x"><label><input type="radio" name="mc">Answer</label></main>');
    fs.writeFileSync(path.join(dir, 'chapter.json'), '{"status":"ready"}');
    fs.writeFileSync(path.join(dir, 'GABARITO.md'), 'Critérios curados');
    assert.deepEqual(validateChapter(dir), []);
  } finally { fs.rmSync(dir, { recursive: true }); }
});
test('components escape labels and tables and reject invalid configuration', () => {
  assert.match(components.field({ id: 'x', label: '<script>', type: 'select', options: [{ value: '"', label: '<b>' }] }), /&lt;script&gt;/);
  assert.ok(!components.table(['<x>'], [['<script>']]).includes('<script>'));
  assert.throws(() => components.field({ id: 'bad"]', label: 'Bad' }));
  assert.throws(() => components.field({ id: 'x', label: 'X', type: 'password' }));
});
test('scaffold generates all four complete drafts, refuses overwrite, blocks publication', () => {
  const book = 'infra_fixture_' + process.pid;
  const root = path.join(repo, book);
  fs.mkdirSync(path.join(root, 'capitulos'), { recursive: true });
  try {
    fs.writeFileSync(path.join(root, 'styles.css'), '');
    fs.writeFileSync(path.join(root, 'index.html'), '');
    fs.writeFileSync(path.join(root, 'capitulos/MAPEAMENTO.md'), ['checklist', 'calculation', 'table', 'stepper'].map((kind, i) => '| 0' + (i + 1) + ' | `0' + (i + 1) + '-' + kind + '` | ' + kind + ' |').join('\n'));
    for (const [i, kind] of ['checklist', 'calculation', 'table', 'stepper'].entries()) {
      const slug = '0' + (i + 1) + '-' + kind;
      const args = [path.join(repo, '_tools/scaffold-chapter.mjs'), book, slug, 'Título de exemplo', kind];
      execFileSync(process.execPath, args);
      const dir = path.join(root, 'capitulos', slug);
      for (const file of ['index.html', 'chapter.json', 'GABARITO.md', 'model.js', 'model.test.cjs', 'app.js', 'lab-configs.js']) assert.ok(fs.existsSync(path.join(dir, file)));
      const issues = validateChapter(dir);
      assert.ok(issues.some(x => x.includes('Placeholder')));
      assert.ok(issues.every(x => /Placeholder|placeholder|status ready/.test(x)), issues.join('\n'));
      assert.equal(chapterPublished(root, slug), false);
      assert.throws(() => execFileSync(process.execPath, args, { stdio: 'pipe' }));
      const childEnv = { ...process.env }; delete childEnv.NODE_TEST_CONTEXT;
      execFileSync(process.execPath, ['--test', path.join(dir, 'model.test.cjs')], { env: childEnv });
    }
    fs.writeFileSync(path.join(root, 'capitulos/index-metadata.json'), JSON.stringify([['99', '01-checklist', '', '', '']]));
    fs.writeFileSync(path.join(root, 'capitulos/index-template.html'), '{{items}}');
    assert.throws(() => buildBookIndex(root), /divergem/);
    fs.writeFileSync(path.join(root, 'capitulos/index-metadata.json'), JSON.stringify([['01', '01-checklist', '', '', ''], ['01', '01-checklist', '', '', '']]));
    assert.throws(() => buildBookIndex(root), /duplicados/);
  } finally { fs.rmSync(root, { recursive: true }); }
});
test('component input changes recompute output and destroy removes listeners', () => {
  const output = { textContent: '' };
  const input = { value: '3' };
  const listeners = {};
  const host = {
    classList: { add() {} }, innerHTML: '',
    querySelector: selector => selector === '[data-result]' ? output : input,
    addEventListener: (event, fn) => listeners[event] = fn,
    removeEventListener: event => delete listeners[event],
  };
  const mounted = components.mount(host, {
    id: 'example', title: 'Dobro', fields: [{ id: 'quantity', label: 'Quantidade', value: 3 }],
    evaluate: state => state.quantity * 2,
  });
  assert.equal(output.textContent, '6');
  input.value = '5'; listeners.input();
  assert.equal(output.textContent, '10');
  input.value = ''; listeners.input();
  assert.equal(output.textContent, 'Preencha as entradas numéricas.');
  mounted.destroy();
  assert.deepEqual(listeners, {});
});
