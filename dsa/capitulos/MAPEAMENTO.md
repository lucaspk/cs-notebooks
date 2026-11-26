# Mapeamento — Estruturas de dados e algoritmos

Fase curricular **1**. **01–59 publicados e concluídos; aceite curricular realizado em 2026-11-26.** A ordem é canônica. Os números são identificadores para autoria e reivindicações.

| NN | Slug | Título | Onda | Pré-requisitos internos | Experimento / resultado esperado |
| --- | --- | --- | --- | --- | --- |
| 01 | `01-contagem-operacoes` | Contagem de operações | 1 — Custo, vetores e buscas | Fase 0: math_disc; leitura básica de JavaScript | Comparar contadores de duas soluções para a mesma entrada. |
| 02 | `02-crescimento-assintotico` | Crescimento assintótico | 1 — Custo, vetores e buscas | 01 (sequência cumulativa) | Dobrar n e comparar custos linear, logarítmico e quadrático. |
| 03 | `03-vetores-acesso-insercao` | Vetores: acesso e inserção | 1 — Custo, vetores e buscas | 02 (sequência cumulativa) | Rastrear deslocamentos e distinguir índice de valor. |
| 04 | `04-busca-linear` | Busca linear | 1 — Custo, vetores e buscas | 03 (sequência cumulativa) | Encontrar ou rejeitar um alvo e contar comparações. |
| 05 | `05-busca-binaria` | Busca binária | 1 — Custo, vetores e buscas | 04 (sequência cumulativa) | Manter o intervalo candidato em uma sequência ordenada. |
| 06 | `06-vetor-dinamico-amortizacao` | Vetor dinâmico e amortização | 2 — Estruturas e ordenação | 05 (sequência cumulativa) | Comparar custo por operação com custo acumulado de expansão. |
| 07 | `07-listas-encadeadas` | Listas encadeadas | 2 — Estruturas e ordenação | 06 (sequência cumulativa) | Inserir e remover nós sem perder ligações. |
| 08 | `08-pilhas` | Pilhas | 2 — Estruturas e ordenação | 07 (sequência cumulativa) | Rastrear LIFO e verificar delimitadores. |
| 09 | `09-filas-circulares` | Filas circulares | 2 — Estruturas e ordenação | 08 (sequência cumulativa) | Rastrear FIFO, índices e capacidade. |
| 10 | `10-hash-colisoes` | Hash e colisões | 2 — Estruturas e ordenação | 09 (sequência cumulativa) | Comparar colisões e carga, sem prometer custo constante no pior caso. |
| 11 | `11-recursao-pilha` | Recursão e pilha de chamadas | 2 — Estruturas e ordenação | 10 (sequência cumulativa) | Relacionar caso-base, avanço e uso de memória. |
| 12 | `12-invariantes-correcao` | Invariantes e correção | 2 — Estruturas e ordenação | 11 (sequência cumulativa) | Verificar inicialização, preservação e término em um laço. |
| 13 | `13-insertion-sort-estabilidade` | Insertion sort e estabilidade | 2 — Estruturas e ordenação | 12 (sequência cumulativa) | Ordenar registros com chaves repetidas e medir deslocamentos. |
| 14 | `14-merge-sort` | Merge sort | 2 — Estruturas e ordenação | 13 (sequência cumulativa) | Combinar sequências ordenadas e contabilizar memória auxiliar. |
| 15 | `15-quicksort-particao` | Quicksort e partição | 2 — Estruturas e ordenação | 14 (sequência cumulativa) | Comparar pivôs e expor o pior caso. |
| 16 | `16-limite-ordenacao-comparacao` | Limite da ordenação por comparação | 2 — Estruturas e ordenação | 15 (sequência cumulativa) | Relacionar decisões, permutações e hipótese do modelo. |
| 17 | `17-arvores-binarias-busca` | Árvores binárias de busca | 2 — Estruturas e ordenação | 16 (sequência cumulativa) | Rastrear busca, inserção e remoção. |
| 18 | `18-balanceamento-rotacoes` | Balanceamento e rotações | 2 — Estruturas e ordenação | 17 (sequência cumulativa) | Preservar a ordem de busca ao reduzir altura. |
| 19 | `19-heap-prioridade` | Heap e fila de prioridade | 2 — Estruturas e ordenação | 18 (sequência cumulativa) | Rastrear subida, descida e extração. |
| 20 | `20-union-find` | Union-Find | 2 — Estruturas e ordenação | 19 (sequência cumulativa) | Unir componentes, comprimir caminhos e comparar raízes. |
| 21 | `21-grafos-representacoes` | Representações de grafos | 3 — Grafos aplicados | 20 (sequência cumulativa) | Comparar matriz e lista, direção, pesos e custos. |
| 22 | `22-bfs` | BFS | 3 — Grafos aplicados | 21 (sequência cumulativa) | Construir camadas e caminhos mínimos em número de arestas. |
| 23 | `23-dfs` | DFS | 3 — Grafos aplicados | 22 (sequência cumulativa) | Rastrear descoberta, término e pilha. |
| 24 | `24-componentes-conectividade` | Componentes e conectividade | 3 — Grafos aplicados | 23 (sequência cumulativa) | Separar componentes não dirigidos de conectividade dirigida. |
| 25 | `25-ciclos-dirigidos-nao-dirigidos` | Ciclos dirigidos e não dirigidos | 3 — Grafos aplicados | 24 (sequência cumulativa) | Distinguir pai na DFS de estado ativo em grafo dirigido. |
| 26 | `26-biparticao` | Bipartição | 3 — Grafos aplicados | 25 (sequência cumulativa) | Colorir componentes e produzir conflito de ciclo ímpar. |
| 27 | `27-dag-ordenacao-topologica` | DAG e ordenação topológica | 3 — Grafos aplicados | 26 (sequência cumulativa) | Liberar dependências e detectar a impossibilidade causada por ciclo. |
| 28 | `28-caminhos-dag` | Caminhos mínimos em DAG | 3 — Grafos aplicados | 27 (sequência cumulativa) | Relaxar arestas em ordem topológica, inclusive pesos negativos. |
| 29 | `29-dijkstra` | Dijkstra | 3 — Grafos aplicados | 28 (sequência cumulativa) | Fixar distâncias com pesos não negativos. |
| 30 | `30-bellman-ford` | Bellman-Ford | 3 — Grafos aplicados | 29 (sequência cumulativa) | Relaxar por rodadas e detectar ciclo negativo alcançável. |
| 31 | `31-kruskal` | Kruskal | 3 — Grafos aplicados | 30 (sequência cumulativa) | Usar Union-Find para construir uma floresta geradora mínima. |
| 32 | `32-prim` | Prim e comparação com caminhos mínimos | 3 — Grafos aplicados | 31 (sequência cumulativa) | Expandir uma árvore e distinguir custo total de distância à origem. |
| 33 | `33-fluxo-maximo-corte-minimo` | Fluxo máximo e corte mínimo | 3 — Grafos aplicados | 32 (sequência cumulativa) | Aumentar fluxo na rede residual e verificar um corte certificado. |
| 34 | `34-pattern-hash-complementos` | Hash: frequências e complementos | 4 — Coding patterns para interview prep | 33 (sequência cumulativa) | Reconhecer consultas repetidas e preservar índices distintos. |
| 35 | `35-pattern-dois-ponteiros` | Dois ponteiros | 4 — Coding patterns para interview prep | 34 (sequência cumulativa) | Justificar o descarte de candidatos em uma sequência ordenada. |
| 36 | `36-pattern-janela-fixa` | Janela deslizante fixa | 4 — Coding patterns para interview prep | 35 (sequência cumulativa) | Atualizar um agregado sem recalcular cada intervalo. |
| 37 | `37-pattern-janela-variavel` | Janela deslizante variável | 4 — Coding patterns para interview prep | 36 (sequência cumulativa) | Manter a restrição e mostrar quando negativos invalidam a estratégia. |
| 38 | `38-pattern-prefixos-hash` | Somas prefixadas e hash | 4 — Coding patterns para interview prep | 37 (sequência cumulativa) | Contar intervalos por diferenças de prefixos. |
| 39 | `39-pattern-intervalos` | Ordenação e intervalos | 4 — Coding patterns para interview prep | 38 (sequência cumulativa) | Mesclar intervalos com uma convenção explícita de extremos. |
| 40 | `40-pattern-busca-resposta` | Busca binária na resposta | 4 — Coding patterns para interview prep | 39 (sequência cumulativa) | Definir limites e provar monotonicidade da viabilidade. |
| 41 | `41-pattern-rapido-lento` | Ponteiros rápido e lento | 4 — Coding patterns para interview prep | 40 (sequência cumulativa) | Detectar ciclos e localizar o ponto médio. |
| 42 | `42-pattern-reversao-lista` | Reversão de listas | 4 — Coding patterns para interview prep | 41 (sequência cumulativa) | Preservar o restante da lista ao inverter um segmento. |
| 43 | `43-pattern-pilha-monotonica` | Pilha monotônica | 4 — Coding patterns para interview prep | 42 (sequência cumulativa) | Resolver próximo maior e justificar custo amortizado. |
| 44 | `44-pattern-fila-monotonica` | Fila monotônica | 4 — Coding patterns para interview prep | 43 (sequência cumulativa) | Manter candidatos ao máximo de uma janela. |
| 45 | `45-pattern-top-k` | Top K com heap | 4 — Coding patterns para interview prep | 44 (sequência cumulativa) | Manter apenas os melhores candidatos de um fluxo. |
| 46 | `46-pattern-dois-heaps` | Dois heaps e mediana | 4 — Coding patterns para interview prep | 45 (sequência cumulativa) | Manter partição e balanceamento entre duas metades. |
| 47 | `47-pattern-arvores-caminhos` | Árvores: estado no caminho | 4 — Coding patterns para interview prep | 46 (sequência cumulativa) | Transportar e restaurar estado durante uma travessia. |
| 48 | `48-pattern-arvores-subproblemas` | Árvores: resultados das subárvores | 4 — Coding patterns para interview prep | 47 (sequência cumulativa) | Combinar respostas em pós-ordem. |
| 49 | `49-pattern-backtracking` | Backtracking e poda | 4 — Coding patterns para interview prep | 48 (sequência cumulativa) | Enumerar escolhas, restaurar estado e justificar podas. |
| 50 | `50-pattern-grades-multiorigem` | Grades e BFS multiorigem | 4 — Coding patterns para interview prep | 49 (sequência cumulativa) | Modelar vizinhança e iniciar várias fontes na mesma busca. |
| 51 | `51-pattern-dependencias-componentes` | Dependências e componentes | 4 — Coding patterns para interview prep | 50 (sequência cumulativa) | Escolher entre topológica e Union-Find conforme a pergunta. |
| 52 | `52-pattern-greedy` | Greedy e argumento de troca | 4 — Coding patterns para interview prep | 51 (sequência cumulativa) | Sustentar a escolha local e refutar uma heurística concorrente. |
| 53 | `53-pattern-dp-linear` | Programação dinâmica linear | 4 — Coding patterns para interview prep | 52 (sequência cumulativa) | Definir estado, base e transição; comparar memoização e tabulação. |
| 54 | `54-pattern-dp-mochila` | Programação dinâmica de mochila e subconjuntos | 4 — Coding patterns para interview prep | 53 (sequência cumulativa) | Distinguir uso único de reutilização pela ordem de atualização. |
| 55 | `55-pattern-dp-duas-sequencias` | Programação dinâmica com duas sequências | 4 — Coding patterns para interview prep | 54 (sequência cumulativa) | Construir a tabela de subproblemas de prefixos. |
| 56 | `56-pattern-trie` | Trie e prefixos | 4 — Coding patterns para interview prep | 55 (sequência cumulativa) | Compartilhar prefixos e comparar com busca por palavra inteira. |
| 57 | `57-pattern-bits` | Bits, máscaras e XOR | 4 — Coding patterns para interview prep | 56 (sequência cumulativa) | Representar conjuntos pequenos respeitando os limites de bits do JavaScript. |
| 58 | `58-problemas-mistos` | Problemas mistos sem rótulo | 4 — Coding patterns para interview prep | 57 (sequência cumulativa) | Escolher e justificar uma estratégia a partir das restrições. |
| 59 | `59-resolucao-entrevista` | Condução de uma resolução de entrevista | 4 — Coding patterns para interview prep | 58 (sequência cumulativa) | Esclarecer, propor, implementar e verificar casos extremos. |

## Dependências e divisão editorial

A sequência cumulativa permite estudar o livro do início ao fim. Recapitulações da seção final devem apontar para os capítulos do núcleo, sem duplicar sua exposição inteira. Não há pré-requisito implícito de conhecimento de outro capítulo ainda não apresentado.

- Onda 1: 01–05.
- Onda 2: 06–20.
- Onda 3: 21–33.
- Onda 4: 34–59; os 17 grupos aprovados são desdobrados para manter um fenômeno por capítulo.
- Matching é extensão opcional futura, fora da contagem e do aceite atual.

Navegação entre capítulos só deve apontar para páginas publicadas. O índice mantém os demais itens como EM BREVE.
