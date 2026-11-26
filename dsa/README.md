# Estruturas de dados e algoritmos — playground

Fase curricular **1 — Dados, custo e grafos**.

**Status: 59/59 capítulos publicados (01–59); quatro ondas e aceite curricular concluídos.** Os exemplos de autoria copiados do template não são capítulos do livro. A Fase 1 técnica do plan.md é uma entrega de infraestrutura diferente.

## Objetivo e pré-requisitos

Escolher estruturas e algoritmos a partir de operações, invariantes e restrições; explicar correção e custos de tempo/espaço; reconhecer padrões e transferi-los para problemas novos.

Recomendado: math_disc (lógica, conjuntos, relações, indução, contagem e vocabulário de grafos); vv_eng para hipóteses, casos extremos e testes. Leitura básica de funções, laços, arrays e objetos JavaScript é necessária; paradigms pode apoiar essa leitura. Cada capítulo deve introduzir seus termos antes de pedir previsões.

## Roteiro

O [MAPEAMENTO](capitulos/MAPEAMENTO.md) é a fonte canônica dos 59 capítulos, slugs, dependências e experimentos.

| Onda | Capítulos | Resultado |
| --- | --- | --- |
| 1 | 01–05 | Contar operações, comparar crescimento, manipular vetores e justificar buscas |
| 2 | 06–20 | Estruturas, amortização, recursão, correção, ordenação, árvores, heaps e Union-Find |
| 3 | 21–33 | Representações, travessias, componentes, ciclos, DAG, caminhos, MST e fluxo/corte |
| 4 | 34–59 | Coding patterns para interview prep, problemas mistos e condução de resolução |

A seção final cobre os 17 grupos aprovados em LIVROS.md, dividindo janelas, estruturas monotônicas, árvores e programação dinâmica em unidades menores. Greedy e backtracking apresentam suas bases antes das aplicações; problemas mistos não revelam o padrão. Matching permanece opcional e não integra o escopo obrigatório atual.

## Critérios de autoria e conclusão

- Um fenômeno por capítulo: contexto e conceitos, exemplo trabalhado, pré-teste, previsão, laboratório manipulável, comparação, MC com distratores plausíveis e justificativas, transferência e checkpoint.
- Modelo puro compartilhado em lib quando houver reutilização; app separado da lógica, scripts clássicos compatíveis com file:// e Pages e export Node protegido.
- Contar operações sob hipóteses explícitas; não apresentar medições de relógio como prova assintótica. Distinguir custo esperado, amortizado e pior caso, quando pertinente.
- Declarar pré-condições e limites: pesos negativos, ciclos, duplicatas, intervalos vazios, desconexão, precisão numérica e operadores de bits de JavaScript.
- Nos padrões: reconhecimento, solução direta, invariante, otimização, tempo/espaço, variações e contraexemplo de aplicação indevida.
- GABARITO.md completo por capítulo; publicação somente após curadoria, validação e testes Node. Sem testes reais de navegador, conforme preferência do usuário.
- Fechamento da fase exige 59 capítulos publicados e revisados; criar o roteiro não conclui a fase.

## Estado atual

Os 59 capítulos estão concluídos. A Fase 1 curricular está completa no escopo aprovado. Melhorias futuras podem ampliar variações, exercícios e matching opcional, sem pendência obrigatória no roteiro atual. O capítulo 01 é a referência inicial de autoria. Toda alteração deve passar por finalize-chapter, testes pertinentes, manutenção e atualização do WORKBOARD.

## Ligações com os próximos livros

arch_cpu usa o contraste entre custo abstrato e memória/cache; compilers reutiliza árvores, grafos e tabelas; comp_net usa caminhos; db_sys reutiliza árvores, hash e custo de acesso. th_cs aprofunda limites e complexidade, além da introdução operacional deste livro.

As seções de entrega abaixo registram o estado histórico de cada onda; o status atual é o indicado acima.

## Entrega da onda 1 — 2026-11-26

01–05 publicados com modelos puros, rastros de execução, previsão, MC e justificativas, transferência, limites e gabaritos completos. Capacidade disponível é hipótese do vetor; a validação O(n) de ordenação é separada das sondagens O(log n) da busca binária. Validação Node e análise estática; sem inspeção real de navegador.

## Estruturas básicas — entrega 2026-11-26

06–10 publicados: duplicação versus incremento unitário com custos acumulados; lista com nós, next e identidades preservadas; pilha para delimitadores; fila circular com rejeição em cheio/vazio; hash com encadeamento, duplicatas e busca. Cinco labs manipuláveis e gabaritos completos. Não confundir esta entrega com o fim da onda curricular 2, que abrange 06–20.

Limites explícitos: expansão só para append e sem medir alocação real; nós simulados; delimitadores sem parser de strings; fila sequencial sem threads; hash didático sem redimensionamento ou segurança. Testes Node e análise estática, sem navegador real.

## Recursão, correção e ordenação — entrega 2026-11-26

11–15 publicados com rastros de chamadas/retornos, invariante nas fronteiras de laço (incluindo duas falhas deliberadas), insertion sort com contraste de empates, merge sort com buffer reutilizado e Lomuto com dois pivôs. Identidades dos registros tornam estabilidade observável. Cinco labs e gabaritos completos.

Contadores têm contratos explícitos; snapshots e cópia de entrada são instrumentação. Quicksort determinístico não promete custo esperado e degenera com duplicatas; soma usa floats, e a recursão não supõe otimização de cauda. Testes Node e análise estática, sem navegador real. A onda curricular 2 só termina em 20.

## Fechamento de estruturas e ordenação — 2026-11-26

16–20 publicados: limite de decisões com fatorial exato; BST com inserção, busca e remoção (incluindo sucessor); rotações locais com subárvore intermediária; min-heap por inserções e retiradas; Union-Find por tamanho com compressão opcional. Todos com labs manipuláveis, exemplos, exercícios e gabaritos. Onda curricular 2 (06–20) concluída; Fase 1 inteira ainda exige grafos e coding patterns.

Limites declarados: chaves distintas no limite de comparação, conjunto sem duplicatas na BST, rotação sem política AVL, heap sem atualizações arbitrárias e Union-Find sem deleções. Rastros e construção não substituem a análise da operação isolada. Testes Node e análise estática, sem navegador real.

## Grafos: representações e travessias — 2026-11-26

21–25 publicados com listas e matriz ponderadas, BFS com pais/camadas/caminho, DFS com descoberta/término/pilha, alcance e componentes fortes, detecção de ciclos com testemunha nos dois modos. Cinco laboratórios, exercícios e gabaritos completos. A onda curricular 3 segue em andamento até 33.

Grafos pequenos sem multiarestas, laços aceitos; travessias exigem peso 1. Componentes fortes usam alcance a partir de cada origem, método didático O(V(V+E)), sem alegar algoritmo linear. Rastros, ordenação de vizinhos e preparação são separados da análise abstrata. Validação Node e estática, sem navegador real.

## Dependências e caminhos mínimos — 2026-11-26

26–30 publicados: bipartição com testemunha de ciclo ímpar; Kahn com graus restantes e bloqueados; DAG com pesos negativos; Dijkstra por varredura; Bellman-Ford síncrono com alcance da influência de ciclos negativos. Todos têm laboratórios, exercícios e gabaritos completos. Ainda faltam 31–33 para concluir a onda curricular 3.

Pesos de caminhos são inteiros entre −1000000 e 1000000; Dijkstra exige não negatividade e custa O(V²+E) nesta implementação. Bellman-Ford separa ∅, finito e −∞, sem sugerir caminho mínimo nos afetados. Referências independentes verificam caminhos e bipartição; sem navegador real.

## Fechamento de grafos — 2026-11-26

31–33 publicados com Kruskal/Union-Find, Prim por varredura e Edmonds–Karp com certificado de corte. Três laboratórios, exemplos de objetivos distintos, previsões, exercícios e gabaritos completos. Onda curricular 3 (21–33) concluída; a Fase 1 ainda exige coding patterns 34–59.

MST admite negativos e devolve floresta quando desconectado; Prim não calcula distâncias. Fluxo exige capacidades inteiras não negativas, sem laços, e separa reversas residuais de originais opostas. Casos testados incluem cancelamento real de fluxo, conservação e comparação com cortes enumerados. Sem navegador real.

## Coding patterns — primeira entrega, 2026-11-26

34–38 publicados: complemento com índices distintos; dois ponteiros com descarte pela ordem; soma de janela fixa; menor janela com limiar positivo e dados não negativos; contagem de intervalos por prefixos e frequências. Cinco labs, força bruta de referência, invariantes, contraexemplos, transferência e gabaritos. Onda 4 ainda em andamento: 39–59 pendentes.

Modelos aceitam até 64 inteiros limitados. Janela variável rejeita negativos com contraexemplo explicado; prefixos aceitam negativos e zeros. Hash tem custo esperado, não garantia de pior caso. Testes Node contra enumeração independente, sem navegador real.

## Coding patterns — segunda entrega, 2026-11-26

39–43 publicados: mesclagem com extremos fechados/semiabertos; busca da capacidade mínima com predicado monotônico; Floyd com entrada de ciclo e meio direito; reversão de segmento por links; próximo estritamente maior com pilha. Cinco laboratórios e gabaritos completos. Onda 4 ainda em andamento, 44–59 pendentes.

Testes independentes usam cobertura de intervalos, partições contíguas enumeradas, Set de visitas, identidade/links de cada segmento e busca quadrática de próximo maior. Listas são cadeias didáticas, não grafos gerais; rastros ficam fora dos custos abstratos. Sem navegador real.

## Coding patterns — terceira entrega, 2026-11-26

44–48 publicados: máximo de janela com deque circular, Top K com min-heap limitado, mediana online com dois heaps, caminhos raiz→folha com restauração e diâmetro por pós-ordem. Cinco laboratórios, exercícios e gabaritos completos. Onda 4 ainda em andamento: 49–59 pendentes.

Testes comparam sequências pequenas com varreduras e ordenação, verificam invariantes de heaps em cada prefixo e enumeram topologias de árvores pequenas contra caminhos e distâncias independentes. Árvores usam posições fixas 2i+1/2i+2, até 63 posições; null não é valor zero. Rastros e cópias de apresentação são separados dos custos abstratos. Sem navegador real.

## Coding patterns — quarta entrega, 2026-11-26

49–53 publicados: subconjuntos por índice com poda opcional; distâncias em grade por BFS multiorigem; escolha entre precedência dirigida e conexão não dirigida; escalonamento por menor término com troca e contraexemplo de menor duração; DP linear com memoização/tabulação e reconstrução. Cinco labs, exercícios e gabaritos completos. Onda 4 continua: 54–59 pendentes.

Validação independente por subconjuntos, Floyd–Warshall, permutações topológicas, fecho de conexão e agendas enumeradas. Backtracking limita a 12 positivos para preservar as podas e viabilidade da interface; BFS só unitária; greedy só cardinalidade; DP permite seleção vazia e não considera circularidade. Sem navegador real.

## Fechamento da onda 4 — 2026-11-26

54–59 publicados com seis labs, exercícios e gabaritos: soma exata por uso único/ilimitado, LCS de prefixos com testemunha, trie, máscaras/XOR, contagem mista e revisão de solução por propriedades. Contratos explicitam limites numéricos, Unicode, custo esperado, custo do rastro e do verificador. Onda 4 concluída.

## Aceite curricular — 2026-11-26

| Critério | Evidência |
| --- | --- |
| Cobertura e dependências | 59 slugs do MAPEAMENTO publicados, quatro ondas concluídas; fundamentos antes da seção de padrões; ligações com próximos livros documentadas. |
| Núcleo | Custo, vetores/buscas, estruturas, ordenação, árvores, Union-Find e grafos até fluxo/corte nos capítulos 01–33. |
| Coding patterns | 17 grupos distribuídos em 34–57; síntese sem padrão no título em 58 e condução de resolução em 59. Variações são discutidas sem prometer labs para todas. |
| Pedagogia | 59 páginas com contrato, exemplo antes da previsão, lab, comparação, MC e justificativas, transferência, checkpoint, limites e GABARITO.md. Validação estática e revisão dos seis novos capítulos. |
| Publicação | Índice e catálogo atualizados; links locais e sequência anterior/próximo conferidos; um gabarito fechado por capítulo após limites e antes da navegação final. |
| Modelos | 328 testes Node verdes no repositório, com referências independentes para modelos e bibliotecas; apps novos carregados em VM como scripts clássicos sem require no browser. |
| Manutenção | Finalize 54–59, maintain-all e refresh-workboard; gabaritos sincronizados e diff sem erros de whitespace. |

Fase 1 curricular concluída no escopo aprovado. Testes reais de navegador foram excluídos pelo usuário: a validação não inclui inspeção visual, execução real file:// ou deployment em Pages. Compatibilidade estática/VM não equivale a esses testes. Matching permanece extensão opcional fora dos 59 capítulos.
