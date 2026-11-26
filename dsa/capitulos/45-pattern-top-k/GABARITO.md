# Gabarito — Top K com heap

## Pré-teste

pretest: O menor dos três selecionados; ele define o limiar de admissão.

## Exemplo trabalhado

worked-observation: A raiz expõe o menor dos selecionados, exatamente o candidato a remover quando chega algo melhor. Max-heap exporia o melhor e dificultaria essa remoção.

## Previsão

predict: k=3: [5,5,4]. k=1: [5]. k=8: todos os seis valores, ordenados [5,5,4,3,2,1].

## Comparação

compare: Negativos continuam comparáveis: [−5,−2,−3], k=2 retém [−2,−3]. [5,5,5], k=2 retém dois 5. Vetor do heap só garante ordem pai/filho, não ordenação total.

## Transferência

design-transfer: Não. Guarde registros com identidade e comparação total explícita, invertendo corretamente o critério do pior no min-heap. O lab guarda só valores e não promete desempate de pessoas.

## Checkpoint

checkpoint-explain: Reconhecer seleção de poucos maiores em fluxo. Manter min(k,n), multiplicidade e raiz como pior selecionado. O(n log(k+1)) manutenção e O(min(k,n)) espaço; apresentação ordenada tem custo adicional. Se k cresce até n, aproxima ordenação; vazio e k>n válidos.

## Limites

checkpoint-limit: Até 64 inteiros limitados e k de 1..64. Não resolve frequências Top K, valores distintos ou remoções do fluxo. Interface conserva entrada/rastro e ordena uma cópia lógica para exibição, além da manutenção abstrata do heap.

## Múltipla escolha e justificativa dupla

Correta: C.

A: A raiz seria o melhor, não o pior selecionado.

B: Contrato mantém multiplicidade, não valores distintos.

C: A raiz é o menor entre os retidos.

D: Propriedade do heap é parcial; saída ordenada exige trabalho.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
