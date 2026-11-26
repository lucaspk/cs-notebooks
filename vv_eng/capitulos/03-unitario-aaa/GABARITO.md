# Gabarito — Unitário AAA

## Pré-teste

pretest-1: Não. Executar sem erro não verifica o resultado da regra; falta uma asserção relevante.

## Exemplo trabalhado

worked-observation: Arrange: saldo 10. Act: depositar 5. Assert: saldo deve ser 15. Obter 15 passa; esperar 14 faz o teste falhar e permite conferir se a asserção detecta a divergência. Exigir explicação do mecanismo: Arrange prepara o estado e dependências. Act executa a operação de interesse. Assert compara o resultado com uma expectativa independente. O nome do teste pode ajudar a descrever o caso, mas não substitui executar código e conferir uma asserção.

## Previsão

predict-1: O obtido continua 15 e a asserção falha. Alterar a expectativa não deve alterar a implementação. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Neste modelo aritmético o resultado é 10; em uma conta com contrato de rejeitar depósito zero, a expectativa seria um erro. O contrato precisa ser explícito.

## Múltipla escolha

Correta: A.

A: A expectativa foi definida independentemente da execução.

B: Sempre passa, mesmo se o resultado estiver errado.

C: Existência da função não verifica seu efeito.

D: Elimina a independência do oráculo.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Arrange: preço 100 e taxa 10%; Act: aplicar desconto; Assert: preço final 90, conforme contrato. Distinguir taxa, valor descontado e total final.

## Checkpoint

checkpoint-1: usar dados do exemplo: Arrange: saldo 10. Act: depositar 5. Assert: saldo deve ser 15. Obter 15 passa; esperar 14 faz o teste falhar e permite conferir se a asserção detecta a divergência. Explicar a regra: Arrange prepara o estado e dependências. Act executa a operação de interesse. Assert compara o resultado com uma expectativa independente. O nome do teste pode ajudar a descrever o caso, mas não substitui executar código e conferir uma asserção.

checkpoint-limit: O lab mostra adição de valores finitos, não um sistema monetário completo. Regras de saldo negativo, arredondamento e validação de depósito precisam de casos próprios.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
