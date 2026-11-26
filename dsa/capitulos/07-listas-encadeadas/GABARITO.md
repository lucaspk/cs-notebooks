# Gabarito — Listas encadeadas

## Pré-teste

pretest: Não. Valor, índice e referência são informações diferentes; pode ser necessário percorrer a lista.

## Exemplo trabalhado

worked-observation: Se a única referência para N1 era N0.next, sobrescrevê-la sem guardá-la ou ligá-la ao novo nó torna o sufixo inacessível pela cabeça. Preservar atual e definir novo.next mantém a cadeia.

## Previsão

predict: Remover: head=N1, cadeia 20→30, zero avanços. Inserir: novo N3 aponta para N0 e head=N3, cadeia 5→10→20→30, zero avanços.

## Comparação

compare: Inserção preserva N0,N1,N2 e acrescenta N3 entre N0 e N1, um avanço. Remover índice 1 do original liga N0 a N2; restam 10 e 30, um avanço. Cada execução começa da entrada editada, não do resultado anterior.

## Transferência

design-transfer: Com predecessor válido, excluir exige religação O(1); localizar por índice exige O(n). Há memória para referências e acesso aleatório linear. Referências devem permanecer válidas; não prometer vantagem para toda carga.

## Checkpoint

checkpoint-explain: Na vazia head=∅; novo.next=∅ e head=novo. Ao remover o único nó, head=atual.next=∅. Nenhum avanço; nunca acessar next de referência inexistente.

## Limites

checkpoint-limit: Identidades são simuladas por objetos; alocação, liberação de memória e custo de cache não são medidos. O lab reconstrói a entrada a cada execução e conta avanços do percurso, excluindo essa construção e a renderização.

## Múltipla escolha e justificativa dupla

Correta: A.

A: O percurso por next é linear; a religação final é constante.

B: Confunde operação com referências já disponíveis e busca por índice.

C: Não existe acesso direto ao meio neste modelo.

D: A lista religa nós, sem deslocar todos os valores.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
