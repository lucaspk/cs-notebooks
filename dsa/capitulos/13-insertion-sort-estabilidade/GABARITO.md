# Gabarito — Insertion sort e estabilidade

## Pré-teste

pretest: Não. Estabilidade preserva a ordem original entre registros de chave igual; estar ordenado por nota não exige isso sozinho.

## Exemplo trabalhado

worked-observation: O registro novo ultrapassa iguais anteriores ao deslocá-los para a direita. A ordem por chave continua válida, porém as identidades empatadas são invertidas.

## Previsão

predict: Estável: 1#2,2#0,2#1, dois deslocamentos. ≥: 1#2,2#1,2#0, três deslocamentos. São três comparações em ambos.

## Comparação

compare: Ordenada: três comparações e zero deslocamentos. Inversa: seis e seis. Todos iguais: estável duas comparações e zero movimentos; ≥ três e três, identidades #2,#1,#0.

## Transferência

design-transfer: Aplicar ordenação estável por prioridade preserva a ordem por horário entre empates. A entrada já precisa estar em ordem de horário; estabilidade não cria essa ordem se ela não existia.

## Checkpoint

checkpoint-explain: Antes da iteração i, prefixo a[0..i) ordenado e formado pelos mesmos registros daquele prefixo original, com iguais em ordem original no modo estável. Ordenação trata chaves; permutação preserva todos registros; estabilidade mantém ordem relativa nos empates.

## Limites

checkpoint-limit: Até 32 números com identidades #índice. O modelo copia a entrada e armazena snapshots para exibição: O(n²) de instrumentação no pior caso. O(1) auxiliar se refere ao algoritmo in-place sem esses rastros e cópia. Não mede tempo real.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Move os iguais anteriores para depois do novo.

B: O novo fica depois dos iguais anteriores.

C: Muda a ordem de ordenação especificada.

D: Perde registros e não satisfaz o contrato de permutação.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
