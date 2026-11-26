# Gabarito — TDD leve

## Pré-teste

pretest-1: Para verificar que o teste é capaz de detectar a ausência da funcionalidade e que falha pelo motivo relevante.

## Exemplo trabalhado

worked-observation: Sequência red green: existe uma falha observada antes da implementação e depois um teste aprovado. red green refactor acrescenta reorganização com comportamento preservado. green sozinho não demonstra o ciclo. Exigir explicação do mecanismo: TDD organiza uma mudança em red, green e refactor. Red: novo teste falha pelo motivo esperado. Green: implementação mínima faz passar. Refactor: melhorar estrutura preservando comportamento, com testes verdes. Uma falha de sintaxe ou infraestrutura não é evidência suficiente de red da funcionalidade.

## Previsão

predict-1: Não. Green antes de red é evento fora da ordem desse ciclo; último estado válido é sem teste. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Estrutura interna, duplicação e nomes, mantendo o contrato observado. Adicionar funcionalidade durante refactor mistura objetivos.

## Múltipla escolha

Correta: B.

A: Pode ser erro de configuração sem relação com a regra.

B: A falha precisa distinguir ausência da funcionalidade.

C: Pode indicar teste incapaz de detectar a mudança.

D: Indisponibilidade externa não verifica a funcionalidade.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Não. Muda comportamento observável; exige um novo requisito e testes para a mudança, não só reorganização.

## Checkpoint

checkpoint-1: usar dados do exemplo: Sequência red green: existe uma falha observada antes da implementação e depois um teste aprovado. red green refactor acrescenta reorganização com comportamento preservado. green sozinho não demonstra o ciclo. Explicar a regra: TDD organiza uma mudança em red, green e refactor. Red: novo teste falha pelo motivo esperado. Green: implementação mínima faz passar. Refactor: melhorar estrutura preservando comportamento, com testes verdes. Uma falha de sintaxe ou infraestrutura não é evidência suficiente de red da funcionalidade.

checkpoint-limit: O simulador representa um ciclo de eventos declarado, não executa uma suíte real. Digitar red não comprova que um teste falhou pelo motivo correto.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
