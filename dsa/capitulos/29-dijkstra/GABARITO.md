# Gabarito — Dijkstra

## Pré-teste

pretest: Pode. Exigir pesos não negativos impede que continuar uma rota reduza seu custo acumulado.

## Exemplo trabalhado

worked-observation: O caminho via 2 custa 1+2=3, menor que o direto 4. Descoberta e finalização são eventos diferentes em Dijkstra.

## Previsão

predict: Ordem [0,2,1,3], distâncias [0,3,1,4], pai de 3 é 1.

## Comparação

compare: Com zero: distâncias [0,1,1,2]; 2 ainda fixa antes de 1 pois 1 estava provisoriamente 4. Peso −2 é rejeitado. Isolado mantém ∅ e não é fixado.

## Transferência

design-transfer: Fixaria 1 com custo 1 antes de 2, mas 0→2→1 custa −1. Não há ciclo, mas existe melhoria depois da fixação. DAG ou Bellman-Ford são alternativas sob as respectivas hipóteses.

## Checkpoint

checkpoint-explain: Provisório pode melhorar; fixado é final sob não negatividade. Zero é permitido e ∅ indica inacessível. Varredura custa O(V) por seleção, até V seleções, mais O(E) relaxamentos; espaço O(V), sem rastro.

## Limites

checkpoint-limit: Até 12 IDs, pesos inteiros 0..1000000, sem multiarestas. Grafo dirigido. Contador selections soma IDs inspecionados nas seleções, inclusive última busca sem candidato quando ocorre. Não mede tempo real e não representa implementação com heap.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Seleção percorre todos os IDs; custo é O(V²+E).

B: São implementação e pré-condição declaradas.

C: Só finaliza quando é mínimo provisório.

D: Mesmo sem ciclo negativo, uma aresta negativa pode invalidar a escolha gulosa.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
