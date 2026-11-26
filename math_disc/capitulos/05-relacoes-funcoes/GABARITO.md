# Gabarito — Relações e funções

## Pré-teste

pretest-1: Sim. Isso não viola unicidade por entrada; não é exigida uma saída diferente para cada cliente.

## Exemplo trabalhado

worked-observation: Domínio {1,2}; relação {1:a,2:a}: é função. {1:a,1:b} falha por duas saídas de 1 e também deixa 2 sem saída. Exigir explicação do mecanismo: Uma relação é um conjunto de pares entrada:saída. Uma função total no domínio declarado associa a cada entrada exatamente uma saída. Entradas diferentes podem compartilhar a mesma saída. Repetir o mesmo par não cria conflito.

## Previsão

predict-1: Inicialmente sim. Depois não é total no domínio: falta saída para 2, embora não haja conflito. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Unicidade passa a falhar: 1 tem saídas a e b. A condição de cobertura sozinha não basta.

## Múltipla escolha

Correta: B.

A: Não define saída para 2.

B: Cada entrada tem exatamente uma saída; saídas repetidas são permitidas.

C: A entrada 1 tem duas saídas diferentes.

D: Usa entrada fora do domínio e não define 2.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Não nesse domínio. Pode ser função parcial ou total num domínio menor explicitamente declarado.

## Checkpoint

checkpoint-1: usar dados do exemplo: Domínio {1,2}; relação {1:a,2:a}: é função. {1:a,1:b} falha por duas saídas de 1 e também deixa 2 sem saída. Explicar a regra: Uma relação é um conjunto de pares entrada:saída. Uma função total no domínio declarado associa a cada entrada exatamente uma saída. Entradas diferentes podem compartilhar a mesma saída. Repetir o mesmo par não cria conflito.

checkpoint-limit: O lab verifica cobertura e unicidade das entradas, não um contradomínio declarado. Injetividade e sobrejetividade são outras propriedades.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
