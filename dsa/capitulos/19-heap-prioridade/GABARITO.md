# Gabarito — Heap e fila de prioridade

## Pré-teste

pretest: Não. Uma min-priority queue retira a menor chave; FIFO é outra política. Um min-heap mantém o mínimo na raiz.

## Exemplo trabalhado

worked-observation: O filho que sobe deve ser ≤ ao outro filho; escolher o maior dos dois pode deixar o menor abaixo de um pai maior.

## Previsão

predict: Retira [1,2]; após primeira [2,5,4], após segunda [4,5].

## Comparação

compare: Sem retirar: [1,2,4,5]. Todas retiradas: [1,2,4,5] em ordem, heap vazio. Duplicatas: saídas 1,2,2. Vazia rejeita retirada, sem valor inventado.

## Transferência

design-transfer: Mínimo na raiz O(1), mas localizar ID arbitrário pode exigir O(n). Um mapa ID→posição pode ajudar atualizações, com manutenção em cada troca; não está implementado no lab.

## Checkpoint

checkpoint-explain: Heap garante pai≤filhos, não ordem total; vetor ordenado tem relação global; FIFO segue chegada. Cada extração retira mínimo dos restantes e preserva heap, produzindo ordem não decrescente, O(n log n) para esvaziar.

## Limites

checkpoint-limit: Até 32 números e 32 retiradas solicitadas. Construção por inserções repetidas; contador inclui comparações entre chaves na construção e retirada, exclui testes de índice. Rastros mostram trocas intermediárias antes de restaurar o heap. Sem diminuir chave, estabilidade ou medição de latência.

## Múltipla escolha e justificativa dupla

Correta: A.

A: Raiz 1≤4 e 1≤2; relação entre irmãos é livre.

B: Raiz 4 é maior que ambos filhos.

C: Raiz 2 é maior que filho 1.

D: Propriedade local é mais fraca que ordem total.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
