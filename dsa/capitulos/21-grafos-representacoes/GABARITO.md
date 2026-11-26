# Gabarito — Representações de grafos

## Pré-teste

pretest: Sim. É necessário identificar extremos e, quando houver, direção e peso; guardar todas as combinações pode custar muito para poucas ligações.

## Exemplo trabalhado

worked-observation: A aresta 0→1 tem peso zero. ∅ deve ser diferente do número zero.

## Previsão

predict: 16 células em ambos; duas entradas no dirigido e quatro no não dirigido. Vértice 3 fica isolado.

## Comparação

compare: Laço acrescenta uma entrada em cada modo: três e cinco. A matriz mantém 16 células. Repetição é rejeitada; não há multiarestas neste contrato.

## Transferência

design-transfer: Não. Listas evitam a matriz V²; escolher depende das operações e densidade. A representação por si só não mede cache ou bytes reais.

## Checkpoint

checkpoint-explain: Zero é aresta existente; ∅ é ausência. Direção controla reciprocidade. Matriz consulta O(1), enumera Θ(V), espaço Θ(V²); lista consulta O(grau), enumera Θ(grau), espaço Θ(V+E).

## Limites

checkpoint-limit: Até 12 vértices e 64 arestas de peso finito; sem multiarestas. A tela constrói ambas as representações e portanto usa Θ(V²) mesmo quando a lista isolada seria linear. Contagens são posições lógicas, não bytes. Pesos negativos são representáveis; isso não autoriza qualquer algoritmo de caminhos.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Lista exige procurar o vizinho; matriz oferece acesso direto.

B: Custos combinam com poucas arestas e enumeração local.

C: Cada ID mantém sua lista, inclusive vazia.

D: Peso e ausência são informações distintas.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
