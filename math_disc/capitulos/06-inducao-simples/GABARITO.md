# Gabarito — Indução simples

## Pré-teste

pretest-1: Não. São casos finitos; ainda é preciso o passo geral e uma base válida.

## Exemplo trabalhado

worked-observation: Base n=0: 0=0·1/2. Hipótese S(k)=k(k+1)/2. Então S(k+1)=S(k)+(k+1)=(k+1)(k+2)/2, a fórmula com n=k+1. Exigir explicação do mecanismo: Uma prova por indução precisa de uma base e de um passo geral: suponha P(k) para um k arbitrário e deduza P(k+1). Conferir muitos exemplos é evidência, não prova para infinitos naturais. Aqui S(n)=1+…+n e S(0)=0.

## Previsão

predict-1: S(4)=10 e S(5)=15. O passo acrescenta 5, não recalcula uma hipótese sobre todos os números. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Em 0 ambas são 0; em 5 ambas são 15. A identidade do passo é compatível com esses casos, mas a prova está na álgebra geral.

## Múltipla escolha

Correta: A.

A: A hipótese permite substituir a soma anterior pela expressão.

B: Isso seria circular.

C: Não existe maior natural.

D: Sem base não há ponto de partida.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Base: 0=0. Passo: acrescentar 2(k+1) a k(k+1), obtendo (k+1)(k+2).

## Checkpoint

checkpoint-1: usar dados do exemplo: Base n=0: 0=0·1/2. Hipótese S(k)=k(k+1)/2. Então S(k+1)=S(k)+(k+1)=(k+1)(k+2)/2, a fórmula com n=k+1. Explicar a regra: Uma prova por indução precisa de uma base e de um passo geral: suponha P(k) para um k arbitrário e deduza P(k+1). Conferir muitos exemplos é evidência, não prova para infinitos naturais. Aqui S(n)=1+…+n e S(0)=0.

checkpoint-limit: O lab ilustra o mecanismo em n≤50; o limite é de visualização. A validade geral depende da demonstração simbólica.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
