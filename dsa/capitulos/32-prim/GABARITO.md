# Gabarito — Prim e comparação com caminhos mínimos

## Pré-teste

pretest: Não. Ligação mede uma aresta; trajeto soma todas as arestas percorridas desde a origem.

## Exemplo trabalhado

worked-observation: Chave descreve somente a ligação 1–2, não o percurso inteiro. O trajeto inclui 0–1 de peso 2, totalizando 3.

## Previsão

predict: Ordem de conexões: 0 raiz,1,2,3. Pais [∅,0,1,1], chaves [0,2,1,4], total 7.

## Comparação

compare: De 2, a primeira ligação é 2–1(1), depois 2–0(2) pelo pai anterior em empate, e 1–3(4), total 7. Com isolado há duas raízes, mesmo total. Peso −1 reduz total a 5. Prim e Kruskal podem escolher arestas diferentes empatadas, mas mínimos têm o mesmo custo.

## Transferência

design-transfer: Não. MST certifica soma da infraestrutura; caminhos mínimos certificam trajetos da origem sob outra função objetivo. O triângulo do exemplo mostra que os objetivos podem divergir.

## Checkpoint

checkpoint-explain: Prim usa chaves de aresta na fronteira; Kruskal ordena arestas e une conjuntos; ambos minimizam soma de floresta, permitem negativos e desconexão. Dijkstra usa distâncias acumuladas a uma origem e exige não negativos. Prim do lab varre V IDs por seleção, O(V²+E), sem heap.

## Limites

checkpoint-limit: Até 12 IDs, pesos inteiros limitados, não dirigido e sem multiarestas. Laços nunca entram porque seu destino já está usado quando examinados. Cada componente recebe uma raiz, com chave zero artificial. selections conta V² IDs inspecionados; não compara relógio nem garante mesma árvore de Kruskal em empates.

## Múltipla escolha e justificativa dupla

Correta: C.

A: É a forma do relaxamento de caminhos, não chave de fronteira.

B: Uma ligação mais barata pode aparecer antes da seleção.

C: Mantém a melhor aresta que cruza da árvore ao vértice.

D: MST aceita pesos negativos; a prova usa cortes.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
