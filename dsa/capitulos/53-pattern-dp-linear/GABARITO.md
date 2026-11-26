# Gabarito — Programação dinâmica linear

## Pré-teste

pretest: Não: extremos 4+4 somam 8, superando 5. É preciso comparar incluir e excluir.

## Exemplo trabalhado

worked-observation: F(i−1) pode incluir o vizinho i−2. Para garantir não adjacência, a parte anterior deve terminar entre os primeiros i−2 elementos.

## Previsão

predict: Tabela [0,2,7,11,11,12], IDs [0,2,4]. Todos negativos: tabela só zeros, soma 0 e escolha vazia.

## Comparação

compare: Empate em [5,5] prefere pular o segundo: escolhe [0], soma 5. Vazio retorna 0 e nenhum índice. Zeros permitem vazio, que é escolhido. Computed é n estados positivos calculados; calls inclui bases e hits de cache, não apenas novos estados.

## Transferência

design-transfer: Não. Divida em casos que excluem a primeira ou excluem a última, resolvendo subproblemas lineares e tratando n pequeno. Sem isso, a resposta linear pode escolher ambas as pontas indevidamente.

## Checkpoint

checkpoint-explain: Reconhecer subproblemas sobrepostos e ótima estrutura de prefixo. Estado/bases/transição justificados pelos dois casos; memo resolve sob demanda, tabela em ordem de dependência. O(n) tempo e O(n) espaço com reconstrução, valor só pode usar O(1). Negativos/vazio tratados; empate pula último.

## Limites

checkpoint-limit: Até 64 inteiros limitados, soma exata nessa faixa. Restrição somente linear, sem circularidade e sem obrigatoriedade de escolher um elemento. Recursão memo tem profundidade O(n), não demonstra segurança para entradas grandes. Contadores de chamadas não são comparações nem segundos.

## Múltipla escolha e justificativa dupla

Correta: B.

A: [4,5,4] prefere extremos somando 8 ao maior isolado 5.

B: Casos são exaustivos e preservam a restrição de vizinhança.

C: São ordens diferentes de resolver a mesma recorrência.

D: Escolha vazia é permitida e vale zero.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
