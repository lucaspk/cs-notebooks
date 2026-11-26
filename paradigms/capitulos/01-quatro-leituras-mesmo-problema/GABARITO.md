# Gabarito — Quatro leituras

## Pré-teste

pretest-paradigm: Não. Se mantiver entradas, operação e valor inicial, pode preservar exatamente o mesmo resultado.

## Exemplo trabalhado

worked-observation: Para [1,2,3,4], começando em 0, o acumulador percorre 0→1→3→6→10. Em cada leitura o operador é soma e a ordem dos itens é preservada, portanto o total é 10. Exigir explicação do mecanismo: O mesmo cálculo pode ser expresso por um loop imperativo (atualiza acumulador), uma dobragem (combina cada item com o acumulado), reduce (API de combinação de uma coleção) ou um pipeline de operações (valores passam por etapas). As quatro leituras deste lab representam a mesma soma; não são quatro linguagens nem uma classificação exaustiva de paradigmas.

## Previsão

predict-same-sum: 10 em todas: 0+5=5; 5−2=3; 3+7=10. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-steps: Não. Os traços mostram a mesma combinação lógica, mas alocação, compilação e execução real podem diferir; medir desempenho exige outro experimento.

## Múltipla escolha

Correta: C.

A: Uma API não muda a linguagem inteira.

B: O lab não mede tempo real.

C: O resultado e o traço sustentam equivalência neste cálculo.

D: Outros comportamentos e compromissos podem diferir.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Não. Mudou a condição inicial, e o total diverge em 100; comparar estilos exige manter a especificação.

## Checkpoint

checkpoint-paradigm: usar dados do exemplo: Para [1,2,3,4], começando em 0, o acumulador percorre 0→1→3→6→10. Em cada leitura o operador é soma e a ordem dos itens é preservada, portanto o total é 10. Explicar a regra: O mesmo cálculo pode ser expresso por um loop imperativo (atualiza acumulador), uma dobragem (combina cada item com o acumulado), reduce (API de combinação de uma coleção) ou um pipeline de operações (valores passam por etapas). As quatro leituras deste lab representam a mesma soma; não são quatro linguagens nem uma classificação exaustiva de paradigmas.

checkpoint-limit: Este lab usa números finitos e o Number de JavaScript. Associatividade matemática não garante resultados idênticos sob reordenação em ponto flutuante; não reordenamos operações aqui.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
