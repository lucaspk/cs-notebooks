# Gabarito — Greedy e argumento de troca

## Pré-teste

pretest: Não necessariamente. Sua localização pode bloquear duas compatíveis; é preciso prova para o critério de escolha.

## Exemplo trabalhado

worked-observation: O substituto termina no máximo no mesmo instante. Cada atividade que começava depois do término antigo também começa depois do novo; quantidade não diminui.

## Previsão

predict: Por fim: [0,1], cardinalidade 2. Por duração: [2], cardinalidade 1. O curto ocupa parte de duas oportunidades compatíveis entre si.

## Comparação

compare: Primeira entrada escolhe IDs [0,1], dois intervalos; [0,4) não melhora. Mesmo início permite no máximo um; menor fim deixa mais espaço futuro. Semiabertos não se sobrepõem no instante compartilhado.

## Transferência

design-transfer: Não. O objetivo soma pesos, não cardinalidade. É necessário considerar o ganho ao escolher ou pular, por exemplo escalonamento ponderado com programação dinâmica e predecessores compatíveis.

## Checkpoint

checkpoint-explain: Reconhecer cardinalidade de intervalos semiabertos em recurso único; prova por troca do primeiro e indução no restante. O(n log n), saída/cópia O(n). Empates de fim determinísticos não prejudicam cardinalidade. Duração mínima refutada; pesos não cobertos. Baseline exponencial.

## Limites

checkpoint-limit: Até 32 intervalos com extremos inteiros limitados. Menor duração é comparador didático, com checagem contra todos os já escolhidos O(n²); não confundir seu custo com o greedy certificado. Sem intervalos vazios, múltiplos recursos, pesos ou restrições extras.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Ordenação não certifica um critério errado.

B: Duração não controla o instante em que recurso é liberado.

C: Essa propriedade permite induzir uma solução ótima.

D: Objetivo ponderado muda o problema e pode exigir DP.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
