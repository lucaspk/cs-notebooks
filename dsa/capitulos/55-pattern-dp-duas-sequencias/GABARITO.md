# Gabarito — Programação dinâmica com duas sequências

## Pré-teste

pretest: Sim; ordem é preservada e b pode ser pulado.

## Exemplo trabalhado

worked-observation: Zerar interrompe um trecho contíguo; LCS precisa carregar o melhor resultado dos prefixos mesmo quando os últimos símbolos não combinam.

## Previsão

predict: Primeira ac, tamanho 2. Segunda tamanho 1; pelo desempate que sobe na tabela, a testemunha é a. b também é ótima.

## Comparação

compare: Vazio dá 0 e testemunha vazia. Repetições dão aa, tamanho 2, sem reutilizar posições. Disjuntos dão zero.

## Transferência

design-transfer: Não. Pode orientar inserções/deleções mínimas por símbolos, mas precisa definir tokenização, exibição e desempates; substituições, blocos movidos e legibilidade pedem outros critérios.

## Checkpoint

checkpoint-explain: Estado de dois prefixos, bordas zero, encontro diagonal e desencontro máximo. Mostrar testemunha válida em ambas e comprimento ótimo. O(mn) tempo/espaço nesta implementação; não confundir subsequência com substring.

## Limites

checkpoint-limit: Até 24 pontos de código por sequência, comparação sensível a caixa e sem normalização Unicode. Um emoji composto pode ter vários pontos de código; não opera por grafemas. Rastro adicional O(mn). Não enumera todas as LCS.

## Múltipla escolha e justificativa dupla

Correta: B.

A: A ordem é exigida; contiguidade não.

B: As alternativas cobrem o ótimo dos prefixos.

C: Empates podem gerar testemunhas diferentes de mesmo tamanho.

D: Comprimento isolado perde decisões; requer tabela ou outra técnica de reconstrução.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
