# Gabarito — Grafos (definições)

## Pré-teste

pretest-1: Não num grafo dirigido. Seria preciso informar a aresta inversa ou declarar o grafo não dirigido.

## Exemplo trabalhado

worked-observation: Com a>b e b>c, há caminho a→b→c. Não há caminho c→a. Acrescentar c>a cria um ciclo e torna possível o retorno. Exigir explicação do mecanismo: Um grafo dirigido tem vértices e arestas orientadas. a>b permite ir de a para b; o sentido inverso exige outra aresta. Um caminho dirigido segue as orientações. Um ciclo retorna a um vértice; alcançabilidade não exige que o caminho seja único.

## Previsão

predict-1: O caminho deixa de existir. a>b sozinho não alcança c. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Passa a existir: c→a→b. Um ciclo não impede a análise de alcançabilidade.

## Múltipla escolha

Correta: D.

A: Quantidade de vértices não estabelece conexões.

B: O ciclo pode estar em outro componente.

C: Aresta saindo do destino não garante chegar nele.

D: Essa é a definição de caminho dirigido.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Cada atividade depende da outra; não há uma ordem linear que satisfaça os dois pré-requisitos.

## Checkpoint

checkpoint-1: usar dados do exemplo: Com a>b e b>c, há caminho a→b→c. Não há caminho c→a. Acrescentar c>a cria um ciclo e torna possível o retorno. Explicar a regra: Um grafo dirigido tem vértices e arestas orientadas. a>b permite ir de a para b; o sentido inverso exige outra aresta. Um caminho dirigido segue as orientações. Um ciclo retorna a um vértice; alcançabilidade não exige que o caminho seja único.

checkpoint-limit: O lab responde existência de caminho e considera caminho de comprimento zero de um vértice para si mesmo. Não calcula menor caminho nem tempo de execução.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
