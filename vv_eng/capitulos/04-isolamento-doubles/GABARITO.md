# Gabarito — Isolamento

## Pré-teste

pretest-1: Não. Verifica o consumidor com uma resposta controlada; consulta, esquema e conexão exigem testes de integração.

## Exemplo trabalhado

worked-observation: Uma regra consulta saldo 10. O double retorna 10 sem conexão; o banco externo simulado pode estar indisponível. A falha de conexão não demonstra por si só defeito na regra aritmética. Exigir explicação do mecanismo: Um double substitui uma dependência durante o teste. Um stub fornece respostas predefinidas; um mock também pode verificar interações esperadas. Controlar uma dependência ajuda a isolar a regra. Um teste de integração com a dependência real verifica contratos que o double pode não representar.

## Previsão

predict-1: Double retorna saldo 10; banco externo simulado falha por conexão. A regra não mudou, só a dependência. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: A colaboração simulada pode concluir; em um sistema real, ainda seria preciso exercitar consulta e esquema verdadeiros. O lab não acessa banco algum.

## Múltipla escolha

Correta: D.

A: A causa pode ser infraestrutura.

B: Doubles são úteis quando representam contratos controlados.

C: O escopo inclui a dependência externa.

D: Separar regra e integração permite diagnosticar melhor.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Adicionar teste de contrato ou integração entre consumidor e API; atualizar fixtures com base no contrato real, sem considerar o double fonte da verdade.

## Checkpoint

checkpoint-1: usar dados do exemplo: Uma regra consulta saldo 10. O double retorna 10 sem conexão; o banco externo simulado pode estar indisponível. A falha de conexão não demonstra por si só defeito na regra aritmética. Explicar a regra: Um double substitui uma dependência durante o teste. Um stub fornece respostas predefinidas; um mock também pode verificar interações esperadas. Controlar uma dependência ajuda a isolar a regra. Um teste de integração com a dependência real verifica contratos que o double pode não representar.

checkpoint-limit: Isolamento reduz fontes externas de variação; não torna o teste automaticamente correto. Doubles irreais podem ocultar incompatibilidades.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
