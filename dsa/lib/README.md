# Modelos de DSA

`foundations.js`: funções puras da onda 01–05. IIFE com global `DsaFoundations` no browser e `module.exports` protegido no Node. Os adaptadores model.js publicam `DsaLab`; scripts são clássicos, sem dependência de build ou rede.

- `numbers(text)`: entrada vazia vira []; até 64 números finitos separados por vírgula; tokens vazios são inválidos.
- `sum(values)`: resultado, leituras, adições e acumulador por posição; recusa overflow.
- `growth(n)`: 1, floor(log₂ n), n e n², n inteiro entre 1 e 1048576.
- `vector(values, operation, index, value)`: read/insert/remove, cópia do resultado e rastro; capacidade disponível e cópia da entrada fora da contagem estudada.
- `linear(values, target)`: primeira ocorrência e contador de igualdades.
- `binary(values, target)`: alguma ocorrência e contador de sondagens; valida ordem em O(n) fora desse contador. A chamada completa não é O(log n).

Verificação: `node --test dsa/lib/*.test.js dsa/capitulos/*/model.test.js`. Sem benchmarks ou testes reais de navegador. Ponto flutuante e igualdade são os do JavaScript.

## Estruturas — capítulos 06–10

`structures.js` fornece global `DsaStructures` e export Node protegido, sem dependências no browser.

- `dynamic(count, policy)`: append começando vazio/capacidade 1; duplicação ou incremento unitário, rastros de capacidade/cópias/escritas e custo amortizado observado.
- `linked(values, operation, index, value)`: nós com identidade e next, inserção/remoção por índice, tabelas antes/depois e avanços de localização.
- `delimiters(text)`: pilha LIFO de (), [] e {}; para na primeira falha, ignora outros caracteres e verifica aberturas pendentes. Não é parser de linguagem.
- `queue(capacity, commands)`: buffer circular fixo com head/size, comandos +valor e -, rejeição em cheio/vazio sem mutação; devolve ordem lógica e rastros físicos.
- `hash(keys, buckets, target)`: conjunto de inteiros seguros com encadeamento, resto normalizado, duplicatas ignoradas; carga por chaves distintas, colisões de inserção e comparações da consulta.

As tabelas/snapshots são instrumentação, fora do custo abstrato apresentado. Os testes comparam fila com referência FIFO, exercitam todas as posições de lista, limites amortizados, tipos de delimitadores e distribuições adversas de hash.

## Recursão e ordenação — capítulos 11–15

`ordering.js`: IIFE global `DsaOrdering`, export Node protegido. Até 32 números finitos, entrada preservada.

- `recursive(values)`: soma de sufixos, eventos entrada/base/retorno, n+1 chamadas e profundidade n+1. Rejeita overflow; não supõe otimização de cauda.
- `invariant(values, mode)`: soma de prefixos nas fronteiras; modos correct, bad-init e skip (omite último). Rastros de acumulador, prefixo esperado, medida e validade. Recalcular prefixos é instrumentação quadrática.
- `insertion(values, ties)`: registros com key e id original; stable desloca >, reverse desloca ≥. Comparações entre chaves e deslocamentos, sem contar a escrita final.
- `merge(values)`: merge estável com ≤, buffer único de n posições, escritas de ida e volta e profundidade incluindo bases. Intervalos semiabertos.
- `quick(values, policy)`: Lomuto com ≤, pivô last ou middle (índice central), intervalos inclusivos, comparações, trocas entre índices distintos e profundidade não vazia. Não é estável; duplicatas expõem pior caso em ambos os modos.
- `label(records)`: exibe chave#identidade sem inserir HTML.

Testes cobrem permutação, estabilidade, entradas variadas, contagens de extremos, partições e violações do invariante. Buffers/snapshots para exibição não devem ser confundidos com espaço auxiliar do algoritmo sem instrumentação.

## Limites, árvores e conjuntos — capítulos 16–20

`trees.js`: global `DsaTrees`, export Node protegido, sem dependências externas.

- `bound(n)`: n de 0 a 100; fatorial BigInt e menor potência de dois suficiente. Retorna inteiros grandes como texto. Limite inferior, não algoritmo ótimo.
- `bst(values, target, operation)`: até 32 números, conjunto sem duplicatas; search/insert/remove, tabelas antes/depois, rastro e altura em nós. Remoção com dois filhos usa sucessor. Comparações excluem caminhada adicional do sucessor e construção inicial.
- `rotate(values, pivot, direction)`: left/right em pivô existente com filho necessário; preserva percurso em ordem e religa pai externo/raiz. Sem política de balanceamento.
- `heap(values, extract)`: min-heap por inserções repetidas, até 32 retiradas; comparações de chaves na construção e nas retiradas, incluindo duplicatas. Rejeita vazio sem produzir valor.
- `unionFind(n, commands, compress)`: até 16 IDs e 64 comandos u a b / q a b / f a. União por tamanho, empate preserva raiz de a; tamanho só é válido nas raízes. Compressão opcional e passos acumulados por arestas de pais.

Cópias, tabelas e recálculo de alturas são instrumentação. Testes validam limites exatos, invariantes globais de BST após remoções/rotações, heap contra ordenação de referência e conectividade contra partição independente.

## Grafos — capítulos 21–25

`graphs.js`: IIFE global `DsaGraphs`, export Node protegido. IDs 0..n−1, n entre 1 e 12; até 64 arestas u v ou u v peso por vírgula. Pesos finitos, inclusive zero/negativos na representação. Arestas duplicadas rejeitadas, laços permitidos; listas ordenadas por ID para desempate.

- `graph(n, text, directed)`: parsing e listas novas a cada chamada; laço não dirigido ocupa uma entrada.
- `representation(...)`: matriz com null para ausência, listas ponderadas, células e entradas lógicas.
- `bfs(n,text,directed,source,target)`: exige peso 1, marca ao enfileirar, distâncias null para inalcançáveis, pais, caminho e rastro FIFO. scans conta entradas examinadas nos alcançados.
- `dfs(...)`: floresta completa por IDs, tempos de descoberta/término, pais e pilha no rastro. scans conta entradas examinadas.
- `components(...)`: V buscas para matriz de alcance e grupos de alcance mútuo; grupos fortes no dirigido, componentes no não dirigido. O(V(V+E)), espaço O(V²), sem alegar Tarjan/Kosaraju.
- `cycles(...)`: três cores, ignora pai apenas no não dirigido, encerra na primeira testemunha fechada. Cores finais podem continuar cinzas porque para cedo.

Travessias exigem peso 1. Preparação, ordenação e snapshots não integram os custos dos algoritmos com listas prontas. Testes incluem comparação exaustiva de grafos pequenos contra fechamento de caminhos e partições independentes; sem navegador real.

## Bipartição, dependências e caminhos — capítulos 26–30

`routes.js`: global `DsaRoutes` e export Node protegido; depende de `graphs.js`, carregado antes no browser. Mantém os limites de 12 vértices e 64 arestas, sem multiarestas.

- `bipartite(n,text)`: grafo não dirigido com peso 1; BFS em todos os componentes, coloração ou testemunha de ciclo ímpar pelo ancestral comum. Para no conflito; cores podem estar incompletas.
- `topological(n,text)`: dirigido, pesos ignorados; Kahn FIFO, graus iniciais/restantes, ordem ou prefixo e bloqueados. Bloqueados podem incluir descendentes de ciclos. Não é ordem lexicográfica mínima.
- `dag(n,text,source)`: topológica no grafo inteiro, rejeita ciclos mesmo desconectados; relaxa alcançáveis, retorna pais/distâncias e ordem. O(V+E) sem instrumentação.
- `dijkstra(n,text,source)`: rejeita qualquer peso negativo; mínimo por varredura, empate por ID, O(V²+E). selections conta IDs inspecionados; sem heap.
- `bellmanFord(n,text,source)`: rodadas síncronas até V−1 com parada estável, cada tabela limita número de arestas. Melhoria extra identifica influência negativa alcançável e propaga a descendentes. distance usa null para inacessível e −Infinity para custo sem limite; parent dos afetados vira null. provisional e rounds são valores didáticos intermediários.

Nos três algoritmos de caminhos, pesos inteiros limitados a ±1000000 evitam ambiguidade de ponto flutuante dentro dos limites. Empates preservam pai anterior. Históricos e preparação não integram os custos abstratos. Testes verificam bipartição contra todas as colorações pequenas e caminhos contra Floyd–Warshall, incluindo ciclos negativos desconectados e influência seletiva. Sem navegador real.

## Florestas geradoras e fluxo — capítulos 31–33

`networks.js`: global `DsaNetworks`, export Node protegido, depende de `graphs.js` carregado antes. Até 12 IDs e 64 arestas, pesos inteiros limitados a ±1000000. Sem multiarestas.

- `kruskal(n,text)`: não dirigido; ordena por peso e extremos normalizados, Union-Find local por tamanho/compressão, devolve selected, total, components e rastro de aceitações/rejeições. Laços nunca selecionados. O(V + E log(E+1) + E α(V)) amortizado, sem rastro.
- `prim(n,text,start)`: não dirigido; chave de menor aresta da fronteira, seleção por varredura com empate por ID, pai anterior em igualdade. Reinicia no menor ID restante ao esgotar um componente. Devolve raízes, pais, chaves e floresta; selections=V², tempo O(V²+E), espaço auxiliar O(V).
- `maxFlow(n,text,source,sink)`: dirigido, capacidades 0..1000000, sem laços, s≠t. Edmonds–Karp com pares residuais por referência, distinguindo originais antiparalelas. BFS usa Map/Set e fila com cabeça, desempate por destino/índice de entrada. Devolve fluxos originais, aumentos (incluindo reverse), lados do corte, arestas S→T e cutCapacity=value. Capacidade zero permitida; sem custos ou limites inferiores. Limite usual O(VE²+V), espaço O(V+E), excluindo rastro.

Testes de MSF comparam com enumeração de subconjuntos independentes. Fluxos são verificados por conservação, limites por aresta e mínimo sobre todos os cortes de pequenas redes; caso específico exige cancelar uma aresta via residual reversa. Snapshots e formatação não integram custos abstratos; sem navegador real.

## Coding patterns — capítulos 34–38

`patterns.js`, global `DsaPatterns` e export Node protegido, sem dependências. Entrada textual de até 64 inteiros ±1000000, alvos ±1000000; parsing e rastros separados dos custos abstratos. Somas e contagens são exatas nessa faixa.

- `hashPair(text,target)`: um par de índices distintos ou null, Map de primeiros índices; consulta antes de inserir. O(n) esperado, O(n) espaço.
- `twoPointers(text,target)`: exige ordem crescente, um par ou null; O(n) inclusive validação, estado O(1), sem rastro/cópia da entrada.
- `fixedWindow(text,k)`: soma máxima de exatamente k, 1≤k≤n; best/start/end, empate pelo primeiro início, negativos aceitos. O(n), estado O(1). Fluxo sem acesso ao vetor exigiria buffer O(k).
- `variableWindow(text,target)`: menor intervalo de soma≥T, T>0 e valores não negativos; best null ou start/end/length, O(n) e estado O(1). Negativos rejeitados.
- `prefixHash(text,target)`: quantidade de intervalos não vazios com soma exata, negativos/zeros aceitos; frequência inicial 0→1, consulta antes de incrementar. O(n) esperado, O(n) espaço.

Testes enumeram todas as sequências de comprimento 0..5 sobre {−1,0,1}, pares e intervalos por força bruta; janelas variáveis usam {0,1,2}. Incluem empates, duplicatas, vazios, erros e limites numéricos. Modelos e apps também carregam em VM com scripts clássicos sem require.

## Coding patterns — capítulos 39–43

`patterns2.js`: global `DsaPatterns2`, export Node protegido; depende de `patterns.js` para parsing. Até 64 valores/intervalos inteiros limitados. Sem mutar entrada externa; rastros separados dos custos.

- `mergeIntervals(text,mode='closed')`: pares início fim separados por vírgulas. Modo closed une toque; half-open exige sobreposição estrita e rejeita vazios. Ordenação O(n log n), varredura O(n), saída/cópia O(n). Não mescla adjacentes semiabertos por política explícita.
- `shipping(text,days)`: pesos positivos em ordem, 1..64 dias; capacidade mínima para no máximo D blocos. Limites max/soma, teste greedy linear. O(n log(R+1)), R=soma−max+1, predicado O(1) auxiliar; plano exibido O(n).
- `floyd(text,entry=-1)`: constrói IDs em cadeia, cauda aponta para entry ou null. Retorna next, meeting, cycleEntry ou middle direito para acíclica. Vazio aceita só −1. O(n) e O(1) estado abstrato, representação/rastro O(n).
- `reverseSegment(text,left,right)`: lista não vazia e acíclica, posições inclusivas. Altera links preservando IDs/valores, retorna head/next/order/values. O(k) inversão com fronteiras conhecidas; localizar/exibir O(n); estado O(1), representação/rastro/saída separados.
- `nextGreater(text)`: primeiro índice de valor estritamente maior à direita, null se ausente. Empates permanecem; pushes/pops limitados a n. O(n) amortizado e O(n) espaço. Snapshots de pilha na interface podem custar O(n²), excluídos da análise abstrata.

## Coding patterns — capítulos 44–48

`patterns3.js`, global `DsaPatterns3`, export Node protegido e dependência de `patterns.js`. Sequências até 64 inteiros ±1000000; árvores até 63 posições. Rastros e apresentação separados da análise.

- `windowMax(text,k)`: máximo e índice mais recente em empate para janelas fixas; deque em buffer circular de k índices, expiração na frente e dominância no fundo. O(n) amortizado, O(k) estado, saída O(n).
- `topK(text,k)`: min-heap limitado, multiplicidade, k de 1..64; retém min(k,n). `result` é vetor do heap e `sorted` é apresentação decrescente por extrações, custo extra O(k log(k+1)). Manutenção O(n log(k+1)), estado O(min(k,n)).
- `medians(text)`: max-heap inferior e min-heap superior; metade inferior igual ou um maior, partição por valor. Mediana par usa média. O(log n) por inserção, O(1) consulta, O(n) espaço; snapshots completos são instrumentação O(n²).
- `tree(text)`: posições fixas, IDs i, filhos 2i+1/2i+2; ausentes null, órfãos rejeitados, vazio permitido.
- `paths(text,target)`: caminhos raiz→folha de soma exata, IDs copiados ao emitir; soma por valor, caminho restaurado com pop. Negativos válidos, sem poda por soma alta. O(n+z), z total de IDs emitidos, estado O(h), excluindo representação/rastro/saída.
- `diameter(text)`: altura em nós e diâmetro em arestas, pós-ordem combina L+R e retorna 1+max(L,R). O(n), estado O(h), vetor de alturas/rastro adicionais O(n). Vazio e folha têm diâmetro zero; sem testemunha de extremos.

Testes: sequências exaustivas pequenas com referências por ordenação/varredura, invariantes em cada prefixo dos heaps, topologias até sete posições contra enumeração de caminhos e distâncias entre todos os pares. Sem navegador real.

## Coding patterns — capítulos 49–53

`patterns4.js`, global `DsaPatterns4`, export Node protegido; carrega após `patterns.js` e `graphs.js`. Parsing/ordenação da representação e rastros ficam separados dos custos abstratos de execução.

- `subsets(text,target,prune=true)`: até 12 positivos, alvo 0..1000000. Inclui/exclui por índice, restaura vetor e copia respostas. Poda por excesso e insuficiência do sufixo. O(2^n+z), z IDs emitidos; estado O(n). Opção sem poda permite comparar chamadas sem mudar saída.
- `gridBfs(text)`: linhas por ponto e vírgula, células por espaços, até 8×8; 0 livre, 1 parede, 2 fonte. Inicialização conjunta de fontes, vizinhos ortogonais, marca na descoberta, fila com cabeça. Retorna dist/parent/grid/scans, null para parede ou inalcançável. O(RC) tempo/memória; sem pesos.
- `dependencies(n,text,mode)`: 1..12 IDs e até 64 ligações unitárias. Modo dependencies dirigido usa Kahn FIFO e retorna ok/order/blocked; bloqueados podem incluir descendentes de ciclo. Modo components não dirigido usa UF por tamanho e compressão, retorna labels/count. Execução O(V+E) ou O(V+Eα(V)) amortizado; lista de adjacência preparada/ordenada pelo parser separadamente.
- `schedule(text)`: até 32 intervalos semiabertos não vazios. Greedy menor fim, desempate início/ID; retorna selected e comparação shortest por menor duração (heurística O(n²) na checagem). Algoritmo certificado O(n log n); cardinalidade, sem pesos.
- `nonAdjacent(text)`: até 64 inteiros, permite vazio. F(i)=max(F(i−1),a[i−1]+F(i−2)), memo e tabela em O(n), espaço O(n), reconstrução com empate por pular. Retorna best/memoBest/dp/selected/calls/computed. Não circular.

Testes independentes usam todos os subconjuntos pequenos, distâncias por Floyd, permutações e fecho transitivo, agendas enumeradas e soma máxima sem adjacência por enumeração. Modelos e apps verificados em VM com scripts clássicos, sem navegador real.

## Coding patterns — capítulos 54–59

`patterns5.js`, global `DsaPatterns5`, export Node protegido; depende de `patterns.js`. Algoritmos puros com estado recriado por chamada.

- `subset(text,target,reuse=false)`: decisão de soma exata, até 16 pesos positivos, T 0..128. DP booleana decrescente para uso único, crescente para ilimitado, O(nT)/O(T) sem rastro; pseudopolinomial. Retorna dp/possible/trace, sem lucro ou reconstrução.
- `lcs(first,second)`: até 24 pontos de código por sequência. Tabela de prefixos O(mn) tempo/espaço, reconstrução de uma testemunha, empate sobe; não substring, normalização ou grafemas.
- `trie(text,query)`: até 32 palavras a-z de 1..16 letras; consulta pode ser vazia. Transições Map compartilhadas e terminal independente. Retorna word/prefix/nodes/trace; raiz conta como nó e prefixo vazio, nunca palavra vazia. Construção O(S), consulta O(q) sob custo esperado de Map; sem sugestões/deleção.
- `bits(text,bit)`: até 64 IDs 0..30; OR para conjunto, XOR separado de valores; teste, alternância e remoção. Universo evita sinal e wrap de deslocamentos Number 32-bit; O(n)/O(1) sem rastro.
- `mixed(text,target,strategy)`: contar intervalos não vazios de soma exata. Referência brute O(n²), prefix O(n) esperado com frequência inicial zero→1. Variante window deliberadamente inválida para o contrato; zeros e negativos fornecem contraexemplos. Contadores não são a mesma operação entre métodos; rastro brute O(n²).
- `interview(text,target,variant)`: um par i<j ou null; correct consulta antes de inserir, insert-first expõe auto-reuso. Executa cinco casos fixos e um livre; verificador independente enumera pares e valida propriedades/existência, sem exigir par específico. Solução O(n) esperado/O(n); verificação O(n²) fora do custo da solução. Não executa código arbitrário nem avalia prosa.

Validação: subconjuntos por máscaras, alcançabilidade de somas, interseção de subsequências, conjuntos de prefixos, Set contra bits e intervalos/pares enumerados. VM de scripts clássicos para cada app; sem navegador real.
