# Gabarito — Pilha monotônica

## Pré-teste

pretest: É 3, no índice 1; o máximo 9 aparece mais tarde e não é a resposta pedida.

## Exemplo trabalhado

worked-observation: O contrato exige valor estritamente maior. Igualdade não resolve índice 0; ele espera o 4 do índice 3.

## Previsão

predict: [3,2,3,null,null]. Três iguais não têm maior à direita: todos null.

## Comparação

compare: Crescente: [1,2,3,null], quatro pushes e três pops. Decrescente: todos null, quatro pushes e zero pops; pilha cresce até n. Contadores de push/pop não incluem cada teste da condição.

## Transferência

design-transfer: Use os mesmos índices de próximo maior; onde resposta[i]=j, devolva j−i. Defina sentinela para ausência. Maior ou igual exige alterar comparação e casos de empate.

## Checkpoint

checkpoint-explain: Reconhecer próximo maior, manter índices não resolvidos e valores não crescentes. Cada remoção recebe o primeiro maior à direita pela ordem de leitura. O(n) amortizado, O(n) espaço; duplicatas permanecem. Vazio retorna vazio; força bruta O(n²), pushes/pops não são todas as comparações.

## Limites

checkpoint-limit: Até 64 inteiros limitados, próximo estritamente maior em sequência linear, não circular. Respostas são índices ou null, permitindo valor −1 legítimo. Rastro guarda snapshots de pilha: seu custo de cópia/formatação pode ser O(n²) e não integra a análise do algoritmo sem instrumentação.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Cobrar cada pop ao único push do índice limita total a O(n).

B: Igual não é estritamente maior; mudaria a pergunta.

C: Nenhum maior anterior foi ignorado, pois já teria removido o índice.

D: O primeiro maior pode ser menor que um máximo mais distante.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
