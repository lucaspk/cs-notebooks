# Gabarito — Merge sort

## Pré-teste

pretest: Não. Basta comparar as duas cabeças ainda não consumidas; quando uma lista acaba, copiar o restante da outra.

## Exemplo trabalhado

worked-observation: O mesmo buffer de quatro posições é reutilizado em vários merges. Trabalho acumulado conta usos; memória de pico conta posições simultaneamente reservadas.

## Previsão

predict: [1#1,2#0]; uma comparação, duas escritas no buffer e duas de volta, total quatro; buffer duas posições, profundidade dois.

## Comparação

compare: Ambas usam quatro comparações, 16 escritas, buffer quatro e profundidade três. Não há atalho para metades já concatenáveis. Empates: [1#2,1#3,2#0,2#1], quatro comparações e 16 escritas, preservando identidades.

## Transferência

design-transfer: Comparar cabeças e avançar apenas a origem escolhida permite merge em fluxo, com buffers de leitura e escrita. A divisão recursiva e o array auxiliar integral do lab não modelam I/O, ordenação externa ou arquivos de tamanho arbitrário.

## Checkpoint

checkpoint-explain: Cada nível intercala todos os n registros, por cerca de log₂ n níveis. Há um buffer único de n posições e pilha logarítmica; trabalho acumulado não é memória simultânea. Para n=0 ou 1, base tem trabalho constante.

## Limites

checkpoint-limit: Até 32 números, identidades originais e um buffer reutilizado de n posições, inclusive n=1. Profundidade conta chamada-base e raiz. Cópia da entrada, objetos e snapshots não entram no espaço auxiliar anunciado. Não há merge in-place, paralelismo ou otimização para runs.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Pode colocar um igual posterior antes do anterior.

B: Quebra a preservação de registros.

C: Sem metades ordenadas, suas cabeças podem não ser os menores restantes.

D: A esquerda corresponde a posições originais anteriores e os submerges também são estáveis.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
