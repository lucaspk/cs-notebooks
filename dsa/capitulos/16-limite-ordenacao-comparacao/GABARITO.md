# Gabarito — Limite da ordenação por comparação

## Pré-teste

pretest: Não. Melhor caso, caso observado e pior caso são afirmações diferentes.

## Exemplo trabalhado

worked-observation: Oito é capacidade máxima de uma árvore binária de altura três. O domínio tem só seis permutações; caminhos podem faltar ou ser impossíveis.

## Previsão

predict: 4!=24; quatro decisões permitem 16 folhas, insuficientes; cinco permitem 32. Limite cinco comparações.

## Comparação

compare: Permutações 1,1,6,24,120; limites 0,0,3,5,7. Fatorial cresce por fator n, não por fator dois fixo.

## Transferência

design-transfer: Não. Acesso por valor e contagem exploram domínio limitado, fora do modelo que aprende a ordem apenas por comparações binárias entre chaves. É necessário contabilizar o tamanho do domínio.

## Checkpoint

checkpoint-explain: Chaves distintas, todas as permutações admissíveis, decisões binárias por comparação. Ω(n log n) é necessidade de pior caso de qualquer algoritmo nesse modelo; Θ(n log n) do merge sort é custo de uma implementação específica, compatível com a necessidade.

## Limites

checkpoint-limit: Até n=100 com BigInt convertido a texto. Não enumera permutações, não constrói uma árvore ótima e não mede execução. Duplicatas mudam a contagem de ordens distinguíveis; esta fórmula assume chaves distintas e comparação binária.

## Múltipla escolha e justificativa dupla

Correta: B.

A: É limite de pior caso, não custo exato de todas as entradas.

B: Há que distinguir n! possibilidades por decisões binárias.

C: Counting/radix sort exploram estrutura adicional das chaves.

D: Pode ser correto e usar mais trabalho que o mínimo necessário.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
