#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from '../../../_tools/index-items.mjs';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = [
  ['01', '01-falha-reproduzivel', 'COMECE AQUI', 'Falha reproduzível', 'Evidência mínima.'],
  ['02', '02-piramide-testes', '', 'Pirâmide de testes', 'Unitário na base.'],
  ['03', '03-unitario-aaa', '', 'Unitário AAA', 'Arrange, act, assert.'],
  ['04', '04-isolamento-doubles', '', 'Isolamento', 'Mock vs real.'],
  ['05', '05-tdd-ciclo', '', 'TDD leve', 'Vermelho → verde.'],
  ['06', '06-propriedade-invariante', '', 'Propriedades', 'Invariante.'],
  ['07', '07-revisao-eficaz', '', 'Revisão', 'Checklist.'],
];

const items = chapters.map((row) => renderChapterListItem(root, row)).join('\n');
const publishedCount = chapters.filter(([, slug]) => chapterPublished(root, slug)).length;
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base href="./"><title>V&V · Livro</title><link rel="stylesheet" href="styles.css"><script src="../local-links.js" defer></script></head>
<body><main class="book-index"><header class="page-header"><a class="brand" href="../index.html">playground / V&V</a><span class="lesson-tag">${publishedCount}/${chapters.length}</span></header>
<section class="intro"><h1>EVIDÊNCIA<br><span>NÃO SÓ INTUIÇÃO.</span></h1></section>
<ol class="chapter-list">\n${items}\n</ol></main></body></html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`vv_eng ${publishedCount}/${chapters.length}`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });