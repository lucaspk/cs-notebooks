#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from '../../../_tools/index-items.mjs';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = [
  ['01', '01-proposicoes-conectivos', 'COMECE AQUI', 'Proposições e conectivos', 'AND, OR, IMP.'],
  ['02', '02-tabela-verdade-equivalencia', '', 'Tabela-verdade', 'Implicação.'],
  ['03', '03-quantificadores', '', 'Quantificadores', '∀ e ∃.'],
  ['04', '04-conjuntos', '', 'Conjuntos', 'União e interseção.'],
  ['05', '05-relacoes-funcoes', '', 'Relações e funções', 'É função?'],
  ['06', '06-inducao-simples', '', 'Indução simples', 'Soma 1..n.'],
  ['07', '07-inducao-forte', '', 'Indução forte', 'Passo indutivo.'],
  ['08', '08-grafos-definicoes', '', 'Grafos (definições)', 'Caminho; algoritmos em dsa.'],
  ['09', '09-contagem-combinatoria', '', 'Contagem', 'Regra do produto.'],
];

const items = chapters.map((row) => renderChapterListItem(root, row)).join('\n');
const publishedCount = chapters.filter(([, slug]) => chapterPublished(root, slug)).length;
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f6f5f0"><base href="./"><title>Matemática discreta · Livro</title><link rel="stylesheet" href="styles.css"><script src="../local-links.js" defer></script></head>
<body><main class="book-index"><header class="page-header"><a class="brand" href="../index.html">playground / discreta</a><span class="lesson-tag">${publishedCount}/${chapters.length}</span></header>
<section class="intro"><h1>ARGUMENTOS<br><span>ANTES DE ALGORITMO.</span></h1></section>
<section class="contents"><h2>Sumário</h2><ol class="chapter-list">\n${items}\n</ol></section></main></body></html>`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`math_disc ${publishedCount}/${chapters.length}`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });