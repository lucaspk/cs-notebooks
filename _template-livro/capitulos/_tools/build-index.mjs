#!/usr/bin/env node
/**
 * Edite o array `chapters` ao publicar capítulos.
 * Formato: [num, slug, eyebrow, title, blurb]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BOOK_TITLE = '{{TITLE}}';
const BOOK_BRAND = '{{BRAND}}';
const chapters = [
  ['01', '01-exemplo', 'EM BREVE', 'Primeiro capítulo', 'Substitua quando o cap. 01 existir.'],
];

const items = chapters.map(([num, slug, eyebrow, title, blurb]) => {
  const eye = eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : '';
  return `        <li><a class="chapter-link" href="capitulos/${slug}/index.html"><span class="chapter-number" aria-hidden="true">${num}</span><span class="chapter-description">${eye}<strong>${title}</strong><span>${blurb}</span></span><span class="chapter-arrow" aria-hidden="true">→</span></a></li>`;
}).join('\n');

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f5f0">
  <title>${BOOK_TITLE} · Livro interativo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="book-index">
    <header class="page-header">
      <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">p.</span> playground <span class="brand-divider">/</span> ${BOOK_BRAND}</a>
      <span class="lesson-tag">LIVRO INTERATIVO</span>
    </header>
    <section class="intro"><h1>MENOS LEITURA.<br><span>MAIS EXPERIMENTO.</span></h1></section>
    <section class="contents"><div class="contents-heading"><h2>Sumário</h2><span>${chapters.length} capítulo(s)</span></div>
      <ol class="chapter-list">
${items}
      </ol>
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`Wrote index.html (${chapters.length} chapters)`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });