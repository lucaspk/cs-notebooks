#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readChapterMap } from './build-book-index.mjs';
const repo = fileURLToPath(new URL('../', import.meta.url));
const [book, slug, title, kind = 'calculation'] = process.argv.slice(2);
if (!/^[a-z][a-z0-9_]*$/.test(book || '') || !/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '') || !title || !['checklist', 'calculation', 'table', 'stepper'].includes(kind)) {
  throw new Error('Uso: scaffold-chapter.mjs <livro> <NN-slug> <título> [checklist|calculation|table|stepper]');
}
const root = path.join(repo, book);
const mapped = readChapterMap(root);
const index = mapped.findIndex(row => row.slug === slug);
if (index < 0) throw new Error('Registre o slug no MAPEAMENTO antes de gerar');
const dir = path.join(root, 'capitulos', slug);
if (fs.existsSync(dir)) throw new Error('Capítulo já existe; nada foi sobrescrito');
const escape = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const num = slug.slice(0, 2);
function navigation(position) {
  const link = (row, text) => row && fs.existsSync(path.join(root, 'capitulos', row.slug, 'index.html'))
    ? '<a href="../' + row.slug + '/index.html">' + text + '</a>' : '<a href="../../index.html">Sumário</a>';
  return '<nav class="' + position + '" aria-label="Navegação do capítulo">' + link(mapped[index - 1], '← Anterior') + '<span>' + num + ' · ' + escape(title) + '</span>' + link(mapped[index + 1], 'Próximo →') + '</nav>';
}
const task = (id, heading, prompt) => '<section class="practice" aria-labelledby="' + id + '-title"><h2 id="' + id + '-title">' + heading + '</h2><label>' + prompt + '<textarea class="practice-field" data-practice-field="' + id + '" rows="3"></textarea></label></section>';
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)} · Playground</title><link rel="stylesheet" href="../../styles.css">
<script src="../../../_shared/practice.js" defer></script>
<script src="../../../_shared/lab-kit.js" defer></script><script src="../../../_shared/lab-components.js" defer></script>
<script src="model.js" defer></script><script src="lab-configs.js" defer></script><script src="app.js" defer></script></head>
<body><main data-book-slug="${book}" data-chapter-id="${slug}" data-practice-mc="mc-ch${num}">
${navigation('chapter-navigation')}
<header class="intro"><p class="eyebrow">RASCUNHO · CAPÍTULO ${num}</p><h1>${escape(title)}</h1></header>
<p class="chapter-objective">PREENCHER: objetivo observável deste capítulo.</p>
${task('pretest', 'Pré-teste', 'PREENCHER: pergunta sobre uma situação concreta.')}
<section class="practice"><h2>Contexto e exemplo trabalhado</h2><p>PREENCHER: defina os termos e apresente uma entrada com resultado explicado antes da previsão.</p></section>
${task('predict', 'Previsão', 'PREENCHER: alteração de uma variável do exemplo apresentado.')}
<section class="lab" id="chapter-lab" aria-label="Laboratório do capítulo"></section>
${task('compare', 'Comparar', 'PREENCHER: evidência que confirma ou corrige sua previsão.')}
<section class="practice"><h2>Múltipla escolha</h2><p>PREENCHER: pergunta contextualizada.</p>
<div class="choice-list">${['a', 'b', 'c'].map(value => '<label><input type="radio" name="mc-ch' + num + '" value="' + value + '">PREENCHER: alternativa ' + value + '</label>').join('')}</div>
<label>Por que sua escolha explica o resultado?<textarea class="practice-field" data-practice-field="mc-why-yes" rows="3"></textarea></label>
<label>Por que outra alternativa plausível falha?<textarea class="practice-field" data-practice-field="mc-why-not" rows="3"></textarea></label></section>
${task('checkpoint-explain', 'Checkpoint: explicar', 'Explique o fenômeno citando uma evidência do laboratório.')}
${task('checkpoint-transfer', 'Checkpoint: transferir', 'PREENCHER: novo contexto para aplicar a mesma regra.')}
<details class="theory"><summary>Aprofundar</summary><p>PREENCHER: limites e condições do modelo.</p></details>
${navigation('chapter-bottom-navigation')}
</main></body></html>`;
fs.mkdirSync(dir);
fs.writeFileSync(path.join(dir, 'index.html'), html);
fs.writeFileSync(path.join(dir, 'chapter.json'), JSON.stringify({ status: 'draft', book, slug, title, labType: kind }, null, 2) + '\n');
for (const [from, to] of [['model.js', 'model.js'], ['model.test.cjs', 'model.test.cjs'], ['configs.js', 'lab-configs.js']]) {
  fs.copyFileSync(path.join(repo, '_template-livro/lab-examples', from), path.join(dir, to));
}
fs.writeFileSync(path.join(dir, 'app.js'), "'use strict';\nPlaygroundComponents.mount('#chapter-lab', referenceConfig(" + JSON.stringify(kind) + ", 'chapter-demo'));\n");
fs.writeFileSync(path.join(dir, 'GABARITO.md'), '# Gabarito — ' + title + '\n\n' + ['Pré-teste', 'Previsão', 'Comparar', 'Múltipla escolha e justificativa dupla', 'Checkpoint: explicar', 'Checkpoint: transferir'].map(x => '## ' + x + '\n\nPREENCHER: resposta esperada, evidência observável e critérios para respostas parciais.\n').join('\n'));
console.log('Rascunho criado: ' + dir + '. Adapte o domínio/modelo/testes, cure HTML e GABARITO e marque chapter.json como ready. Finalize só depois.');
