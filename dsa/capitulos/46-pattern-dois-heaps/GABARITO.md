# Gabarito — Dois heaps e mediana

## Pré-teste

pretest: Média de 2 e 5, portanto 3.5; em tamanho par precisamos dos dois centrais.

## Exemplo trabalhado

worked-observation: Sem partição por valor, lower poderia conter valores maiores que upper. Raízes não representariam os dois elementos centrais, mesmo com tamanhos iguais.

## Previsão

predict: Exemplo [5,3,5,3.5]. Outra sequência [−2,−2,−2,1].

## Comparação

compare: Balanceamento vale para qualquer ordem. Crescente [1,2,3,4] e decrescente [4,3,2,1] têm mediana final 2.5, mas prefixos diferentes. Iguais mantêm mediana constante; mover raiz conserva a partição.

## Transferência

design-transfer: Não. Valores expirados precisam ser removidos; heaps simples não localizam qualquer elemento eficientemente. É necessário índice, remoção preguiçosa com contagens ou outra estrutura, com novas invariantes.

## Checkpoint

checkpoint-explain: Reconhecer ordem estatística online e separar metades. Inserir respeitando raiz e rebalancear; lower tem tamanho igual ou um maior. O(log n) por inserção, O(1) consulta, O(n) espaço, total O(n log(n+1)). Média par e duplicatas tratadas; vazio retorna lista vazia.

## Limites

checkpoint-limit: Até 64 inteiros ±1000000; média pode ser fracionária e permanece exata para esses limites. Sem remoções, quantis arbitrários ou fluxo infinito com memória limitada. Snapshots completos de heaps e formatação podem custar O(n²), fora da análise abstrata.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Tamanhos não determinam quais valores ficam no centro.

B: As duas invariantes tornam as raízes elementos centrais.

C: Contrato par exige média de duas raízes.

D: Todos os valores permanecem em alguma metade.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
