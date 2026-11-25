import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBookIndex, readChapterMap } from './build-book-index.mjs';
import { parsePlannedSlugs } from './workboard-lib.mjs';
const repo = fileURLToPath(new URL('../', import.meta.url));
test('all book indexes rebuild without changes and workboard uses the map', () => {
  for (const slug of ['comp_net', 'prog_conc', 'math_disc', 'vv_eng', 'paradigms']) {
    const root = path.join(repo, slug);
    const index = path.join(root, 'index.html');
    const before = fs.readFileSync(index, 'utf8');
    buildBookIndex(root);
    assert.equal(fs.readFileSync(index, 'utf8'), before, slug);
    assert.equal(parsePlannedSlugs(slug).length, readChapterMap(root).length);
  }
});
test('shared imports and pilot resource paths resolve on disk', () => {
  for (const file of [
    'index.html', '_template-livro/capitulos/TEMPLATE.html',
    'vv_eng/capitulos/01-falha-reproduzivel/index.html',
    'comp_net/capitulos/07-arp-primeiro-salto/index.html',
  ]) {
    const html = fs.readFileSync(path.join(repo, file), 'utf8');
    for (const [, resource] of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)) {
      assert.ok(fs.existsSync(path.resolve(repo, path.dirname(file), ...(file.includes('TEMPLATE.html') ? ['NN-slug'] : []), resource)), file + ': ' + resource);
    }
  }
  for (const slug of ['comp_net', 'prog_conc', 'math_disc', 'vv_eng', 'paradigms']) {
    const css = fs.readFileSync(path.join(repo, slug, 'styles.css'), 'utf8');
    assert.match(css, /^@import url\("\.\.\/_shared\/playground.css"\);/);
  }
});
