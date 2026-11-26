# Gabarito — Conjuntos

## Pré-teste

pretest-1: Não. Ambas descrevem {1,2}; repetições e ordem não alteram pertinência.

## Exemplo trabalhado

worked-observation: A={1,2,3} e B={2,3,4}: união={1,2,3,4}; interseção={2,3}. Repetir 2 na entrada não cria outro elemento. Exigir explicação do mecanismo: Um conjunto registra pertinência, sem multiplicidade ou ordem. A união A∪B reúne elementos de A ou B. A interseção A∩B reúne os que pertencem a A e a B. O conjunto vazio não contém elementos.

## Previsão

predict-1: Vazia: nenhum elemento pertence aos dois conjuntos. A união é {1,2,3,4,5}. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Com B vazio: união=A e interseção=vazia. Com B=A: ambas são A.

## Múltipla escolha

Correta: D.

A: A união inclui IDs exclusivos de uma lista.

B: Concatenação pode preservar repetições e exclusivos.

C: Multiplicidade não define pertinência comum.

D: Interseção exige presença em A e em B.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: As duas: {bia}. Pelo menos uma: {ana,bia,caio}.

## Checkpoint

checkpoint-1: usar dados do exemplo: A={1,2,3} e B={2,3,4}: união={1,2,3,4}; interseção={2,3}. Repetir 2 na entrada não cria outro elemento. Explicar a regra: Um conjunto registra pertinência, sem multiplicidade ou ordem. A união A∪B reúne elementos de A ou B. A interseção A∩B reúne os que pertencem a A e a B. O conjunto vazio não contém elementos.

checkpoint-limit: Conjuntos não preservam quantidades. Para estoque ou votos repetidos, uma lista ou multiconjunto pode ser necessário.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
