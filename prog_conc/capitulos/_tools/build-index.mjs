#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from '../../../_tools/index-items.mjs';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = [
  ['01', '01-concorrente-paralelo', 'COMECE AQUI', 'Concorrente e paralelo', 'Um núcleo alternando. Dois núcleos juntos.'],
  ['02', '02-execucao-sequencial', '', 'Execução sequencial', 'Fila estrita: A termina, então B.'],
  ['03', '03-threads-nucleos', '', 'Threads, núcleos e escalonamento', 'Fila de prontas e capacidade física.'],
  ['04', '04-espera-io', '', 'Espera por I/O', 'Bloqueada em I/O; outra tarefa na CPU.'],
  ['05', '05-interleavings', '', 'Interleavings e invariantes', 'Ordem dos passos e invariantes.'],
  ['06', '06-contador-perdido', '', 'Contador e atualização perdida', 'Ler, somar, escrever — separados.'],
  ['07', '07-toctou', '', 'TOCTOU', 'Verificar a vaga, depois usar.'],
  ['08', '08-mutex-atomicidade', '', 'Mutex e atomicidade', 'Seção crítica e incremento atômico.'],
  ['09', '09-semaforos', '', 'Semáforos', 'Limitar acesso simultâneo.'],
  ['10', '10-produtor-consumidor', '', 'Produtor e consumidor', 'Fila limitada e coordenação.'],
  ['11', '11-deadlock', '', 'Deadlock', 'Ordem oposta de locks.'],
  ['12', '12-livelock', '', 'Livelock', 'Reação sem trabalho útil.'],
  ['13', '13-starvation', '', 'Starvation', 'Inanição sob escalonamento injusto.'],
  ['14', '14-inversao-prioridade', '', 'Inversão de prioridade', 'Alta espera baixa no mutex.'],
  ['15', '15-visibilidade-memoria', '', 'Visibilidade e memória', 'Publicar e observar com segurança.'],
  ['16', '16-ciclo-vida-tarefas', '', 'Ciclo de vida das tarefas', 'Pool, fila, timeout, cancelamento.'],
  ['17', '17-dirty-read', '', 'Dirty read', 'Ler alteração não confirmada.'],
  ['18', '18-dirty-write', '', 'Dirty write', 'Sobrescrever escrita pendente.'],
  ['19', '19-leitura-nao-repetivel', '', 'Leitura não repetível', 'Reler e encontrar valor novo.'],
  ['20', '20-leitura-fantasma', '', 'Leitura fantasma', 'Conjunto de linhas muda entre leituras.'],
  ['21', '21-lost-update-transacao', '', 'Lost update (transação)', 'Escrita baseada em valor antigo.'],
  ['22', '22-read-skew', '', 'Read skew', 'Dados relacionados fora de fase.'],
  ['23', '23-write-skew', '', 'Write skew', 'Condição compartilhada quebrada em conjunto.'],
  ['24', '24-isolamento-niveis', '', 'Níveis de isolamento', 'Comparar garantias simuladas.'],
  ['25', '25-contencao-desempenho', '', 'Contenção e desempenho', 'Lock único, muitas threads.'],
  ['26', '26-amdahl-false-sharing', '', 'Amdahl e false sharing', 'Parte sequencial e cache.'],
  ['27', '27-cas-lock-free', '', 'CAS e lock-free', 'Compare-and-swap na prática.'],
  ['28', '28-aba-linearizabilidade', '', 'ABA e linearizabilidade', 'Marcação e histórico.'],
  ['29', '29-servicos-mensagens', '', 'Mensagens entre serviços', 'Duplicatas, ordem, idempotência.'],
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
  <title>Programação concorrente · Livro interativo</title>
  <link rel="stylesheet" href="styles.css">
  <script src="../local-links.js" defer></script>
</head>
<body>
  <main class="book-index">
    <header class="page-header">
      <a class="brand" href="../index.html" aria-label="Playground, sumário geral"><span class="brand-mark" aria-hidden="true">p.</span> playground <span class="brand-divider">/</span> programação concorrente</a>
      <span class="lesson-tag">LIVRO INTERATIVO · ${publishedCount}/${chapters.length} CAPÍTULOS</span>
    </header>
    <section class="intro" aria-labelledby="page-title">
      <h1 id="page-title">MENOS LEITURA.<br><span>MAIS EXPERIMENTO.</span></h1>
    </section>
    <section class="contents" aria-labelledby="contents-title">
      <div class="contents-heading"><h2 id="contents-title">Sumário</h2><span>${publishedCount} publicados · ${chapters.length} no roteiro</span></div>
      <ol class="chapter-list">
${items}
      </ol>
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`Wrote index.html with ${chapters.length} chapters`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });