# Gabarito — Revisão

## Pré-teste

pretest-1: O segundo aponta caminho, efeito e entrada verificável; pode ser confirmado ou refutado.

## Exemplo trabalhado

worked-observation: Mudança: trocar preço em centavos por valor decimal. Um comentário útil aponta onde arredondamento muda o total, traz um caso (0,1+0,2) e pede uma regra explícita; “não gostei” não oferece critério de decisão. Exigir explicação do mecanismo: Uma revisão eficaz liga comentários a consequências verificáveis. Examine comportamento, testes, risco e legibilidade. Marcar um item significa que ele foi considerado, não que foi resolvido. Prioridade depende de impacto e probabilidade, com evidência no código e no cenário.

## Previsão

predict-1: Não. Só informa itens considerados. Risco aberto pode impedir aprovação mesmo com 4/4. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: A segunda exige casos monetários, compatibilidade e risco financeiro do cálculo; renomeação local foca referências e clareza. O checklist é igual, a profundidade varia.

## Múltipla escolha

Correta: A.

A: Fornece caso, resultado esperado e consequência que podem ser verificados.

B: Não localiza problema ou critério.

C: Preferência pessoal não fundamenta a mudança.

D: Checklist não substitui evidência.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Indicar entrada [1,1], esperado [1,1], obtido [1], explicar perda de multiplicidade e sugerir teste de regressão.

## Checkpoint

checkpoint-1: usar dados do exemplo: Mudança: trocar preço em centavos por valor decimal. Um comentário útil aponta onde arredondamento muda o total, traz um caso (0,1+0,2) e pede uma regra explícita; “não gostei” não oferece critério de decisão. Explicar a regra: Uma revisão eficaz liga comentários a consequências verificáveis. Examine comportamento, testes, risco e legibilidade. Marcar um item significa que ele foi considerado, não que foi resolvido. Prioridade depende de impacto e probabilidade, com evidência no código e no cenário.

checkpoint-limit: Revisão complementa testes e análise; ninguém garante ausência de defeitos por marcar uma lista. Diferencie bloqueio por correção de sugestão de estilo.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
