# Gabarito — Grades e BFS multiorigem

## Pré-teste

pretest: Não. A vizinhança e o custo dos movimentos são parte do modelo, não consequência do desenho.

## Exemplo trabalhado

worked-observation: Uma primeira busca poderia marcar distâncias maiores como definitivas antes de considerar a fonte mais próxima. Inicialização conjunta põe todas as origens na mesma camada zero.

## Previsão

predict: Duas fontes: [0,1,2];[1,null,1];[2,1,0]. Uma fonte: [0,1,2];[1,null,3];[2,3,4].

## Comparação

compare: Na primeira, distâncias [0,null,null]: o último é livre mas separado pela parede. Na segunda não há fontes e todas são inalcançáveis. A tabela também mostra o tipo original da célula para distinguir os motivos de null.

## Transferência

design-transfer: Não. Menor número de passos não é necessariamente menor soma de custos. Modele pesos e use algoritmo compatível, como Dijkstra multiorigem para não negativos.

## Checkpoint

checkpoint-explain: Reconhecer propagação simultânea/distância até conjunto de fontes. Definir células, limites, quatro direções e custo unitário; marcar ao enfileirar. O(RC) tempo/memória contra O(SRC) de buscas separadas. Zero fontes e regiões isoladas têm null, fontes têm zero.

## Limites

checkpoint-limit: Grade retangular até 8×8, símbolos 0/1/2. Distância em passos ortogonais; não simula tempo físico, ocupação de recursos ou pesos. Fontes em ordem linha/coluna, vizinhos cima/direita/baixo/esquerda; empate pode trocar pai sem trocar distância.

## Múltipla escolha e justificativa dupla

Correta: A.

A: Equivale a iniciar simultaneamente todas as frentes unitárias.

B: Vizinhança é parte do contrato; aqui só ortogonal.

C: BFS simples exige custo unitário, pesos diferentes pedem outro algoritmo.

D: Também representa livre inalcançável; consulte tipo da célula.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
