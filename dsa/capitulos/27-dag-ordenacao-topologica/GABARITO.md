# Gabarito — DAG e ordenação topológica

## Pré-teste

pretest: Não pode começar sob essa regra. Sem tarefa liberada pode haver um ciclo, se ainda restam tarefas.

## Exemplo trabalhado

worked-observation: Ele depende de 0 e 1. Grau restante precisa zerar, certificando que todos os predecessores já foram retirados.

## Previsão

predict: Prefixo [0,1], bloqueados [2,3]. Ambos formam ciclo 2→3→2; não há ordem completa.

## Comparação

compare: Fila inicial só [3], prefixo [3], bloqueados [0,1,2]. 2 é descendente do ciclo 0↔1, mas não participa dele.

## Transferência

design-transfer: Não. Ela certifica precedência, não calcula duração, recursos ou escalonamento ótimo. Escolhas entre tarefas prontas podem gerar ordens distintas.

## Checkpoint

checkpoint-explain: u→v exige u antes de v. Grau restante conta entradas vindas de vértices não retirados. Só zeros são liberados; sucesso exige exatamente V IDs. Residual certifica ciclo, não lista exata de nós de ciclos.

## Limites

checkpoint-limit: Até 12 IDs, sem multiarestas; laço impede ordem. Pesos não influenciam dependências. Fila FIFO não é heap lexicográfico. Rastro copia estados e não integra custo O(V+E). Não executa tarefas reais.

## Múltipla escolha e justificativa dupla

Correta: A.

A: Fila vazia com residual implica impossibilidade de eliminar todas as dependências.

B: Descendentes também podem ficar bloqueados.

C: Faltam vértices e dependências não foram satisfeitas.

D: Ordem numérica não elimina ciclos nem respeita arestas arbitrárias.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
