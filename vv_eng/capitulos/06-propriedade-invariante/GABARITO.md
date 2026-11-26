# Gabarito — Propriedades

## Pré-teste

pretest-1: Não. Uma lista mais curta pode continuar ordenada; é preciso conferir os valores e multiplicidades.

## Exemplo trabalhado

worked-observation: Entrada [3,1,1,2]. Saída correta [1,1,2,3]. A saída [1,2,3] está ordenada, mas perdeu um 1; por isso falha na preservação e não é uma ordenação correta. Exigir explicação do mecanismo: Uma propriedade descreve uma relação que deve valer para muitas entradas. Ordenar exige duas propriedades: ordem não decrescente e preservação do multiconjunto (mesma quantidade de cada valor). Um contraexemplo é uma entrada que viola pelo menos uma delas.

## Previsão

predict-1: Saída [1,2,3]; ordenada=sim, multiconjunto preservado=não. É contraexemplo da propriedade conjunta. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Sem repetições a eliminação não perde dados. Um teste aprovado não prova correção para todas as entradas.

## Múltipla escolha

Correta: C.

A: A lista vazia satisfaz ordem por vacuidade.

B: Rapidez não assegura o contrato.

C: Uma entrada não vazia perderia elementos.

D: Pode retornar vazio sem lançar erro.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: [1,1] produz [1]. Ordem passa; multiplicidade falha. Um item só não revela o bug.

## Checkpoint

checkpoint-1: usar dados do exemplo: Entrada [3,1,1,2]. Saída correta [1,1,2,3]. A saída [1,2,3] está ordenada, mas perdeu um 1; por isso falha na preservação e não é uma ordenação correta. Explicar a regra: Uma propriedade descreve uma relação que deve valer para muitas entradas. Ordenar exige duas propriedades: ordem não decrescente e preservação do multiconjunto (mesma quantidade de cada valor). Um contraexemplo é uma entrada que viola pelo menos uma delas.

checkpoint-limit: O lab testa entradas escolhidas pelo aluno e duas propriedades. Não implementa geração automática de casos nem redução automática de contraexemplos.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
