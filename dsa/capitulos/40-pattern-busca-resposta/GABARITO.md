# Gabarito — Busca binária na resposta

## Pré-teste

pretest: Não, o mesmo plano continua cabendo; isso sugere viabilidade monotônica.

## Exemplo trabalhado

worked-observation: Uma capacidade menor não pode transportar uma divisão que já excede a maior; se fosse viável, o mesmo plano seria viável em mid, contradição.

## Previsão

predict: D=1 exige soma 15. D=5 permite cada pacote em um dia, mínimo 5, igual ao maior peso.

## Comparação

compare: D=2 exige 10, embora média 7,5: pacotes indivisíveis e ordem impõem restrições. D=6 exige 5. Média fornece apenas limite inferior arredondado, não certificado de viabilidade.

## Transferência

design-transfer: Não automaticamente. Mudaram restrições e prova do teste. Antes de buscar, defina viabilidade para o novo problema e demonstre monotonicidade; busca binária não conserta um predicado incorreto.

## Checkpoint

checkpoint-explain: Reconhecer minimização inteira com teste de decisão monotônico. Limites max/soma, greedy correto por prefixo máximo e positivos. lo=mid+1 em inviável evita estagnação; hi=mid em viável preserva candidato. O(n log(R+1)), predicado O(1) auxiliar; plano O(n), rastro separado.

## Limites

checkpoint-limit: 1..64 pesos inteiros positivos até 1000000, D de 1..64, soma exata até 64000000. Sem fracionamento, reordenação ou prazo individual. Custos usam faixa numérica R, não apenas n; não mede transporte real.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Precisa uma fronteira monotônica, não alternância.

B: Pacotes indivisíveis podem exceder média.

C: As duas atualizações preservam o ótimo no intervalo.

D: O contrato conserva a ordem e blocos contíguos.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
