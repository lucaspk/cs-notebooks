# Gabarito — Contagem

## Pré-teste

pretest-1: Multiplica-se: para cada uma das três escolhas iniciais existem três escolhas finais, totalizando 9.

## Exemplo trabalhado

worked-observation: Com 4 símbolos e 3 posições: repetição dá 4·4·4=64; sem repetição dá 4·3·2=24. A ordem importa: ABC e BAC são palavras diferentes. Exigir explicação do mecanismo: Pelo princípio multiplicativo, escolhas sucessivas produzem o produto das quantidades de opções em cada posição. Com a símbolos e n posições independentes, permitindo repetição, há a^n palavras. Sem repetição, as opções diminuem: a(a−1)…(a−n+1).

## Previsão

predict-1: A quantidade cai de 64 para 24. A segunda e terceira posições perdem opções. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Cinco posições: 0, faltam símbolos distintos. Zero posições: 1 palavra vazia, produto sem fatores.

## Múltipla escolha

Correta: C.

A: Somar opções não combina posições.

B: 90 seria sem repetição.

C: Cada posição tem 10 escolhas: 10×10.

D: Conta apenas uma posição.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: 6, desde que cada cor esteja disponível em cada tamanho. Se houver combinações proibidas, o produto simples precisa ser ajustado.

## Checkpoint

checkpoint-1: usar dados do exemplo: Com 4 símbolos e 3 posições: repetição dá 4·4·4=64; sem repetição dá 4·3·2=24. A ordem importa: ABC e BAC são palavras diferentes. Explicar a regra: Pelo princípio multiplicativo, escolhas sucessivas produzem o produto das quantidades de opções em cada posição. Com a símbolos e n posições independentes, permitindo repetição, há a^n palavras. Sem repetição, as opções diminuem: a(a−1)…(a−n+1).

checkpoint-limit: A contagem não mede segurança real de senhas: distribuição de escolhas, limites de tentativas e vazamentos também importam.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
