#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from '../../../_tools/index-items.mjs';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = [
  ['01', '01-quatro-leituras-mesmo-problema', 'COMECE AQUI', 'Quatro leituras', 'Mesmo problema, estilos diferentes.'],
  ['02', '02-mutacao-vs-valor', '', 'Mutação vs valor', 'Aliasing e cópia.'],
  ['03', '03-funcoes-primeira-classe', '', 'Funções de primeira classe', 'map / pipeline.'],
  ['04', '04-encapsulamento-mensagem', '', 'Encapsulamento', 'Mensagens e invariantes.'],
  ['05', '05-composicao-heranca', '', 'Composição vs herança', 'Delegar vs estender.'],
  ['06', '06-tipos-estatico-dinamico', '', 'Tipos estático/dinâmico', 'Checagem cedo vs tarde.'],
  ['07', '07-concorrencia-mensagem-estado', '', 'Concorrência', 'Mensagem vs memória compartilhada.'],
  ['08', '08-escolher-paradigma', '', 'Escolher paradigma', 'Trade-offs por contexto.'],
];

const items = chapters.map((row) => renderChapterListItem(root, row)).join('\n');
const publishedCount = chapters.filter(([, slug]) => chapterPublished(root, slug)).length;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f5f0">
  <base href="./">
  <title>Paradigmas de linguagens · Livro interativo</title>
  <link rel="stylesheet" href="styles.css">
  <script src="../local-links.js" defer></script>
</head>
<body>
  <main class="book-index">
    <header class="page-header">
      <a class="brand" href="../index.html"><span class="brand-mark" aria-hidden="true">p.</span> playground <span class="brand-divider">/</span> paradigmas</a>
      <span class="lesson-tag">LIVRO · ${publishedCount}/${chapters.length}</span>
    </header>
    <section class="intro"><h1>MENOS SINTAXE.<br><span>MAIS ESTILO.</span></h1></section>
    <section class="contents"><motion-div class="contents-heading"><h2>Sumário</h2><span>${publishedCount} publicados</span></motion-div>
      <ol class="chapter-list">
${items}
      </ol>
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'index.html'), html.replaceAll('motion-div', 'div'));
console.log(`Wrote paradigms index ${publishedCount}/${chapters.length}`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });