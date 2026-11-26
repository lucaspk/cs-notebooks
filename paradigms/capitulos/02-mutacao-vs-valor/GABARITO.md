# Gabarito — Mutação vs valor

## Pré-teste

pretest-alias: Não. Podem conter referências ao mesmo objeto ou compartilhar um objeto interno.

## Exemplo trabalhado

worked-observation: A começa com total 10 e itens [10]. Em mutação com delta 5, A vira total 15 e itens [10,5]; B mantém total 10, mas enxerga itens [10,5] pelo array compartilhado. No modo cópia, B mantém [10]. Exigir explicação do mecanismo: Referência compartilhada significa que dois caminhos alcançam o mesmo objeto. Uma cópia rasa duplica o objeto externo, mas pode manter arrays internos compartilhados. Criar um novo array de valores primitivos separa esse estado; copiar apenas o total numérico já produz outro valor.

## Previsão

predict-b: Os itens passam a [10,5]; o total continua 10. O total é um valor copiado, o array é compartilhado. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-fp: B recebeu o número 10 por valor. A atribuição posterior a A.total não altera B.total; no modo cópia o array também fica independente.

## Múltipla escolha

Correta: A.

A: Há dois caminhos para o mesmo array mutável.

B: O número do total foi copiado como valor.

C: Total e itens possuem relações diferentes de compartilhamento.

D: Nomes não determinam identidade do objeto.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Não necessariamente. O array foi copiado, mas seus elementos objeto ainda podem ser compartilhados. Exigir cópia adequada ou objetos imutáveis.

## Checkpoint

checkpoint-value: usar dados do exemplo: A começa com total 10 e itens [10]. Em mutação com delta 5, A vira total 15 e itens [10,5]; B mantém total 10, mas enxerga itens [10,5] pelo array compartilhado. No modo cópia, B mantém [10]. Explicar a regra: Referência compartilhada significa que dois caminhos alcançam o mesmo objeto. Uma cópia rasa duplica o objeto externo, mas pode manter arrays internos compartilhados. Criar um novo array de valores primitivos separa esse estado; copiar apenas o total numérico já produz outro valor.

checkpoint-limit: Novo array de números basta neste cenário; não é uma cópia profunda universal. Imutabilidade exige disciplina em todos os caminhos de alteração.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
