# Gabarito — Dois ponteiros

## Pré-teste

pretest: Primeiro defina a resposta e enumere candidatos válidos. Depois identifique o estado reutilizável: valores anteriores, extremos ou agregado de um intervalo. A otimização precisa preservar todos os candidatos possíveis.

## Exemplo trabalhado

worked-observation: Com r=3, qualquer parceiro ainda candidato é no máximo 7. Portanto 1 mais esse parceiro é no máximo 8, menor que 9.

## Previsão

predict: (0,4),(0,3),(1,3); retorna [1,3]. Duplicatas [3,3] retornam [0,1].

## Comparação

compare: O primeiro par de extremos já soma 1, índices [0,3]. Entrada não ordenada é rejeitada; se ignorar isso, poderia descartar o 1 e perder 1+3.

## Transferência

design-transfer: Não. Guarde pares valor/índice e devolva identidades originais, contabilizando ordenação, ou use hash preservando a entrada.

## Checkpoint

checkpoint-explain: Reconhecer par em sequência ordenada; candidatos ficam em [l,r], cada passo elimina um extremo com prova pela ordem. Até n−1 somas, O(n) inclusive validação; O(1) estado sem rastro e sem cópia da entrada. Vetores de tamanho menor que dois não têm par. Ordenação prévia muda custo/índices.

## Limites

checkpoint-limit: Entrada até 64 inteiros limitados. Modelo valida ordem e mantém entrada original; não ordena. Retorna uma solução segundo o percurso, não todas. Cópia de parsing e rastro são separados do espaço auxiliar abstrato.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Negativos são permitidos em sequência ordenada.

B: Pode saltar a solução que exigia manter um extremo.

C: Limites superiores/inferiores sobre parceiros justificam descarte.

D: É preciso ler até n elementos para certificar ordem.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
