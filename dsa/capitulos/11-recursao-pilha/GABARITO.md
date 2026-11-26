# Gabarito — Recursão e pilha de chamadas

## Pré-teste

pretest: Não. Precisa alcançar um caso-base; cada chamada pode guardar trabalho e dados necessários para quando a chamada filha retornar.

## Exemplo trabalhado

worked-observation: Sua expressão precisa do resultado do sufixo. O frame mantém 2 e a adição pendente até receber 3.

## Previsão

predict: Soma 5; quatro chamadas e profundidade quatro. Retornos: 0,2,1,5.

## Comparação

compare: Respectivamente 4,2,1 chamadas e a mesma profundidade. Resultados 5,7,0. Um laço mantém índice e acumulador em espaço auxiliar O(1), sem os n frames pendentes.

## Transferência

design-transfer: Ambos visitam n elementos; o laço usa estado constante. Esta recursão usa pilha linear e pode estourar a pilha do ambiente; não há garantia de otimização de cauda e a expressão sequer está em posição de cauda.

## Checkpoint

checkpoint-explain: Base i=n devolve 0; n−i diminui por um; retorno a[i]+soma(i+1); n+1 chamadas, n adições, tempo Θ(n), pilha Θ(n), inclusive uma chamada quando n=0.

## Limites

checkpoint-limit: Até 32 números finitos. A pilha é observada por eventos de entrada/base/retorno; não mede bytes ou limite real do motor JavaScript. Rastros ficam fora dos custos. Somas usam ponto flutuante, rejeitam overflow e podem diferir do laço por associatividade numérica.

## Múltipla escolha e justificativa dupla

Correta: A.

A: A medida n−i não diminui e o caso-base não é alcançado.

B: A vazia já está no caso-base.

C: Zero é o elemento neutro da soma.

D: Guardar estado é necessário para retomar a chamada.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
