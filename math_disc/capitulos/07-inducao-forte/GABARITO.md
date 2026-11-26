# Gabarito — Indução forte

## Pré-teste

pretest-1: Porque somar 4 preserva o resto módulo 4. É preciso iniciar as quatro classes: 12,13,14,15.

## Exemplo trabalhado

worked-observation: Bases: 12=4+4+4; 13=4+4+5; 14=4+5+5; 15=5+5+5. Para 16, usamos 12 e acrescentamos 4. Para 20, usamos 16, que usa 12. Exigir explicação do mecanismo: Na indução forte, a hipótese permite usar todos os casos anteriores até k. Vamos provar: todo valor inteiro n≥12 pode ser pago com selos de 4 e 5. Para n≥16, reduzimos o problema a n−4, que já está no intervalo da hipótese.

## Previsão

predict-1: 19 depende de 15; 20 depende de 16, que depende de 12. 19=4+5+5+5; 20=5 selos de 4. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Não. 8=4+4 é possível; o modelo de prova só cobre o intervalo n≥12. Fora do teorema não significa falso.

## Múltipla escolha

Correta: C.

A: Só ocorre quando n=16.

B: Isso seria circular.

C: É um caso anterior dentro do intervalo garantido.

D: Uma amostra finita não prova o enunciado infinito.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Cada redução mantém a classe módulo 4; as bases 12–15 garantem que todas as classes terminam num caso conhecido.

## Checkpoint

checkpoint-1: usar dados do exemplo: Bases: 12=4+4+4; 13=4+4+5; 14=4+5+5; 15=5+5+5. Para 16, usamos 12 e acrescentamos 4. Para 20, usamos 16, que usa 12. Explicar a regra: Na indução forte, a hipótese permite usar todos os casos anteriores até k. Vamos provar: todo valor inteiro n≥12 pode ser pago com selos de 4 e 5. Para n≥16, reduzimos o problema a n−4, que já está no intervalo da hipótese.

checkpoint-limit: Indução forte e simples têm o mesmo poder de prova nos naturais. A forte facilita dependências em casos anteriores não necessariamente imediatos.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
