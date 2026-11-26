# Gabarito — Árvores: resultados das subárvores

## Pré-teste

pretest: Não. Altura parte da raiz e segue um ramo; diâmetro pode unir ramos e nem passar pela raiz.

## Exemplo trabalhado

worked-observation: L+R usa dois ramos e não é uma cadeia única partindo do nó. Prolongar pelo pai exigiria bifurcar um caminho simples. Altura usa somente o ramo maior mais o nó atual.

## Previsão

predict: Exemplo altura 3 nós, diâmetro 3 arestas. Nó único altura 1, diâmetro 0.

## Comparação

compare: Nós presentes IDs 0,1,3,4,7,9. No nó 1, dois ramos de altura 2 produzem diâmetro 4: 7→3→1→4→9. Raiz tem apenas lado esquerdo, candidato 3, por isso máximo não passa nela. Vazio altura e diâmetro zero.

## Transferência

design-transfer: Não. É preciso definir se caminho vazio é permitido, como tratar ramos negativos e que peso pertence a cada aresta. A altura em contagem de nós não transfere automaticamente para soma ponderada.

## Checkpoint

checkpoint-explain: Reconhecer resposta combinada em pós-ordem. Retorno ao pai é altura, acumulador é melhor caminho; L+R conta arestas sob altura em nós. O(n), O(h) pilha, baseline O(nh). Caminho pode não passar pela raiz. Vazio/folha têm diâmetro zero; valores não afetam contagem.

## Limites

checkpoint-limit: Até 63 posições fixas, árvore binária sem órfãos e altura até 6. Diâmetro em arestas não ponderadas, não devolve extremos nem caminho testemunha. Vetor de alturas e rastro da interface O(n) são adicionais ao estado recursivo abstrato.

## Múltipla escolha e justificativa dupla

Correta: C.

A: São quantidades diferentes; dois ramos não podem ser prolongados como um só.

B: Um componente profundo da árvore pode conter ambos os extremos.

C: Pós-ordem garante que os subproblemas já estão resolvidos.

D: Folha isolada não possui aresta, diâmetro zero.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
