# Gabarito — Tipos estático/dinâmico

## Pré-teste

pretest-when: Não. value é string; é necessária conversão explícita quando o contrato pede number.

## Exemplo trabalhado

worked-06: Contrato: horário é string e horas é number finito. A string “2” é rejeitada no modo de checagem; o número 2 é aceito. O modo dinâmico do exemplo apenas formata texto, sem validar ou calcular um horário real. Exigir explicação do mecanismo: Tipagem estática analisa compatibilidade antes de executar; linguagens dinâmicas também possuem tipos e podem verificar contratos em execução. O lab é JavaScript: seu modo chamado estático simula uma checagem antecipada, mas a função de checagem roda em execução. A entrada “2” de um campo HTML é texto até ser convertida.

## Previsão

predict-type: Texto “2” é rejeitado; número 2 é aceito. O conteúdo visível pode ser igual e o tipo ser diferente. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: Não. O modelo concatena texto. Aceitação não valida a semântica de hora nem a regra de domínio.

## Múltipla escolha

Correta: C.

A: Uma função de validação não muda o sistema de tipos da linguagem.

B: Valores dinâmicos ainda têm tipos.

C: Distingue a simulação da análise estática real.

D: Tipo string não garante formato ou faixa válida de horário.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Converter/validar representação numérica e verificar a regra de domínio (inteiro, faixa permitida). Checagem de tipo sozinha não resolve faixa.

## Checkpoint

checkpoint-trade: usar dados do exemplo: Contrato: horário é string e horas é number finito. A string “2” é rejeitada no modo de checagem; o número 2 é aceito. O modo dinâmico do exemplo apenas formata texto, sem validar ou calcular um horário real. Explicar a regra: Tipagem estática analisa compatibilidade antes de executar; linguagens dinâmicas também possuem tipos e podem verificar contratos em execução. O lab é JavaScript: seu modo chamado estático simula uma checagem antecipada, mas a função de checagem roda em execução. A entrada “2” de um campo HTML é texto até ser convertida.

checkpoint-limit: Para demonstrar checagem estática real seria necessário um compilador/analisador apropriado. Este lab não executa essa ferramenta e não soma horários de verdade.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
