# Gabarito — Falha reproduzível

## Pré-teste

pretest-1: Pode mostrar o sintoma, mas faltam entrada, passos, expectativa e ambiente para repetir o caso.

## Exemplo trabalhado

worked-observation: Relato: app 2.1, timezone UTC−3; enviar data 01/05 às 00:00; esperado 01/05, observado 30/04. Os passos e o ambiente delimitam uma hipótese de conversão de data que outra pessoa consegue testar. Exigir explicação do mecanismo: Um relato reproduzível permite repetir a falha em condições conhecidas. Separe sintoma, passos em ordem, resultado esperado, resultado observado e ambiente (versão, configuração e dados). Presença de campos não garante qualidade: “não funciona” é um sintoma pouco específico.

## Previsão

predict-1: A cobertura passa de 2 para 3 de 5; não prova reprodução nem qualidade. É preciso executar os passos com dados e ambiente descritos. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Timezone, versão e data de entrada podem ser fixados; a comparação isola a conversão em vez de misturar ambientes desconhecidos.

## Múltipla escolha

Correta: B.

A: Tamanho não assegura precisão.

B: Repetição independente nas condições descritas é evidência verificável.

C: A afirmação precisa ser testada.

D: Sem entrada e ambiente pode não ser repetível.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Exigir sintoma, entrada 10 e 5, sequência concreta, esperado 15, observado 14 e ambiente identificável; aceitar contextos diferentes se reproduzíveis.

## Checkpoint

checkpoint-1: usar dados do exemplo: Relato: app 2.1, timezone UTC−3; enviar data 01/05 às 00:00; esperado 01/05, observado 30/04. Os passos e o ambiente delimitam uma hipótese de conversão de data que outra pessoa consegue testar. Explicar a regra: Um relato reproduzível permite repetir a falha em condições conhecidas. Separe sintoma, passos em ordem, resultado esperado, resultado observado e ambiente (versão, configuração e dados). Presença de campos não garante qualidade: “não funciona” é um sintoma pouco específico.

checkpoint-limit: Checklist mede completude declarada. Intermitência exige registrar frequência, horários e condições; não se deve inventar passos determinísticos para uma falha ainda incerta.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
