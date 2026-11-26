# Gabarito — Busca linear

## Pré-teste

pretest: Basta visitar a primeira posição e encerrar; encontrar todas seria outro contrato.

## Exemplo trabalhado

worked-observation: Os índices começam em zero. Foram examinadas as posições 0 até i, incluindo a posição que encontrou o alvo: i+1 elementos.

## Previsão

predict: Ausência: índice −1 e quatro comparações. Lista vazia: índice −1 e zero comparações.

## Comparação

compare: 4: índice 0/uma comparação; 2: índice 3/quatro; 7: índice −1/quatro. O retorno expressa localização ou ausência; o contador expressa trabalho.

## Transferência

design-transfer: Para certificar ausência, 50 igualdades; se presente na primeira posição, uma. Sem informação adicional não se pode descartar as posições não examinadas.

## Checkpoint

checkpoint-explain: −1 só ocorre depois de rejeitar todas as posições; logo não existe ocorrência. Melhor: uma comparação, Θ(1). Pior: n, Θ(n), por ausência ou primeira ocorrência no final; vazia faz zero.

## Limites

checkpoint-limit: Comparações numéricas exatas de valores finitos; não se define igualdade aproximada. O pior caso não é uma média: estimar custo esperado exige hipóteses sobre distribuição de alvos. O limite didático é 64 valores.

## Múltipla escolha e justificativa dupla

Correta: D.

A: A varredura verifica cada posição sem inferir nada pela ordem.

B: Pode encerrar na primeira posição.

C: O return encerra na primeira ocorrência.

D: Esse é o contrato e a condição de parada do algoritmo.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
