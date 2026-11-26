# Gabarito — Quicksort e partição

## Pré-teste

pretest: Não. Uma parte pode ficar vazia e a outra conter quase todos os elementos; é a distribuição dos tamanhos que determina o custo recursivo.

## Exemplo trabalhado

worked-observation: Sua posição já separa ≤ à esquerda de > à direita. Incluí-lo de novo pode impedir que o intervalo diminua, além de repetir trabalho concluído.

## Previsão

predict: Último: partições de tamanhos 4,3,2; 3+2+1=6 comparações, profundidade quatro. Central: pivô inicial 2, depois pivô 3 em [3,4]; quatro comparações, profundidade três.

## Comparação

compare: Iguais: ambos fazem seis comparações e profundidade quatro; mudar índice não muda a chave extrema. [2#0,2#1,1#2] vira [1#2,2#1,2#0], demonstrando instabilidade. Três comparações e uma troca distinta.

## Transferência

design-transfer: Não: há entradas adversas e duplicatas. Aleatorização exige hipótese probabilística e não elimina pior caso; partição em três vias trata empates, e estratégias híbridas podem limitar pior caso. Essas extensões não são implementadas aqui.

## Checkpoint

checkpoint-explain: Antes de j: [lo,i)≤p, [i,j)>p, [j,hi) não examinado, pivô em hi. Em ordem crescente, o pivô é máximo e fixa hi a cada passo: n(n−1)/2 comparações, tempo quadrático e profundidade n para n≥1.

## Limites

checkpoint-limit: Até 32 números. Trocas entre índices iguais não são contadas; comparações contam somente chave contra pivô. Profundidade conta chamadas não vazias, incluindo unitárias; vazia tem zero. Algoritmo particiona in-place, mas esta versão tem pilha até Θ(n); snapshots e cópia inicial ficam fora dos custos. Não há garantia probabilística, otimização de cauda ou partição em três vias.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Índice central não implica chave mediana; duplicatas dão contraexemplo.

B: Trocas distantes podem inverter iguais.

C: Todos os demais passam no teste ≤ e o pivô termina no extremo.

D: A partição só separa em relação ao pivô; os lados ainda precisam ser ordenados.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
