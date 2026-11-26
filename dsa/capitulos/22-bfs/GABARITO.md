# Gabarito — BFS

## Pré-teste

pretest: Sim. Vizinhos descobertos numa etapa entram depois dos itens já pendentes; a fila mantém a fronteira em ordem.

## Exemplo trabalhado

worked-observation: 1 e 2 poderiam enfileirar 3 antes da primeira retirada dele. Marcar na descoberta evita duplicação e fixa um pai.

## Previsão

predict: 3: [0,1,3], distância dois; 4: caminho vazio e distância ∅. Não muda, porque vizinhos são ordenados por ID.

## Comparação

compare: Dirigido: 0 inalcançável. Não dirigido: caminho 3→1→0, distância dois. Origem igual destino: distância zero e caminho só da origem. Peso 2 é rejeitado.

## Transferência

design-transfer: Não. BFS minimiza duas arestas, mas soma 200 contra 3. O lab rejeita esses pesos; não se deve interpretar camadas como tarifa.

## Checkpoint

checkpoint-explain: Marcar antes de enfileirar impede repetição. Pai reduz distância em um, permitindo reconstrução. ∅ distingue ausência de distância zero. Listas prontas e fila com cabeça dão O(V+E), memória O(V), excluindo snapshots e ordenação preparatória.

## Limites

checkpoint-limit: Até 12 vértices; peso deve ser 1. Contador scans soma entradas de adjacência examinadas nos vértices alcançados; não inclui construção, ordenação, inicialização dos vetores nem cópias do rastro. O lab termina a travessia alcançável mesmo após descobrir o destino.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Pesos arbitrários exigem outro algoritmo ou hipóteses.

B: Pode haver vários caminhos mínimos.

C: FIFO expande as camadas em ordem.

D: Camadas representam distâncias diferentes; alguns vértices nem são alcançados.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
