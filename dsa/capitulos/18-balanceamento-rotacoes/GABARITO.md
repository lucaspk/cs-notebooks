# Gabarito — Balanceamento e rotações

## Pré-teste

pretest: Não. Uma religação correta pode preservar todas as chaves e seu percurso em ordem.

## Exemplo trabalhado

worked-observation: B contém chaves maiores que x e menores que y. Deve ser religada à esquerda de y, preservando dados e a ordem global.

## Previsão

predict: Raiz 2; 4 é filho direito, 3 vira esquerda de 4; 1 continua esquerda de 2 e 6 direita de 4. Altura continua três.

## Comparação

compare: Primeira reduz altura 3→2; segunda mantém 3→3. Sem filho esquerdo a rotação direita não é definida e o lab rejeita, sem produzir árvore parcial.

## Transferência

design-transfer: Não. Precisa de política que detecte desequilíbrio, selecione rotações simples/duplas e atualize metadados. Primitivas locais corretas não garantem uso correto global.

## Checkpoint

checkpoint-explain: Direita: x.direita vira y.esquerda; esquerda é simétrica. Encontrar pivô por busca O(h); religação local O(1), sem contar exibição ou recálculo global de altura.

## Limites

checkpoint-limit: Modelo de uma rotação por execução, em BST de até 32 valores distintos após deduplicação. Sem política AVL/red-black, rotações duplas automáticas ou manutenção incremental de altura. Cálculo de altura e snapshots custam O(n) e são instrumentação, não a primitiva local.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Depende da forma e da direção escolhida.

B: Pode promover um filho à raiz.

C: As ligações mudam, inclusive a subárvore intermediária.

D: A relação A<x<B<y<C é preservada.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
