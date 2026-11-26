# Gabarito — Janela deslizante variável

## Pré-teste

pretest: Primeiro defina a resposta e enumere candidatos válidos. Depois identifique o estado reutilizável: valores anteriores, extremos ou agregado de um intervalo. A otimização precisa preservar todos os candidatos possíveis.

## Exemplo trabalhado

worked-observation: l nunca recua e só pode avançar n vezes no total; r também avança n vezes. O número total de remoções, não o máximo imaginário por iteração, limita o trabalho.

## Previsão

predict: T=7: [4,5], comprimento 2. Soma total 15, então T=16 não tem solução.

## Comparação

compare: Zeros podem ser removidos sem alterar soma e chega a [2,2], comprimento 1. Com negativos o algoritmo ingênuo para na soma 4 e perde [5]; lab rejeita para tornar a hipótese explícita.

## Transferência

design-transfer: Não. Objetivo de contagem e perda de monotonicidade exigem outra estratégia. Diferenças de prefixos e frequências em hash tratam igualdade com negativos; menor intervalo com negativos pede outro algoritmo.

## Checkpoint

checkpoint-explain: Reconhecer menor comprimento, soma≥T, T positivo e valores não negativos. Registrar antes de remover, manter soma do intervalo, parar ao ficar insuficiente. O(n), espaço auxiliar O(1), sem rastro e vetor; ausência distinta de comprimento zero. Negativos exigem nova prova/algoritmo; brute force O(n²).

## Limites

checkpoint-limit: Até 64 valores 0..1000000, T inteiro positivo limitado. Não resolve negativos, igualdade com contagem ou máximo tamanho por este mesmo código. Rastro registra expansão e contração O(n); intervalos fechados e desempate pelo primeiro menor encontrado.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Cada ponteiro avança no máximo n vezes.

B: Negativos podem elevar a soma após remoção e ocultar candidatos.

C: Essa monotonicidade sustenta o encolhimento e a parada.

D: O contrato aqui exige T>0 e intervalo não vazio.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
