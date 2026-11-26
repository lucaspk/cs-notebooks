# Gabarito — Bipartição

## Pré-teste

pretest: Sim. Cada passo alterna o lado; fechar uma cadeia pode impor uma contradição.

## Exemplo trabalhado

worked-observation: Todos os extremos que eram diferentes continuam diferentes. Os nomes 0 e 1 são arbitrários e componentes não se impõem cores entre si.

## Previsão

predict: Antes [0,1,0,1], válido. Depois inválido: existe triângulo ímpar. A ordem da BFS pode mudar as cores parciais e a testemunha; qualquer ciclo ímpar válido serve.

## Comparação

compare: Quadrado mais isolado é bipartido; isolado recebe 0 neste desempate. Laço em 4 é detectado mesmo num componente separado: testemunha [4,4].

## Transferência

design-transfer: Se cada incompatibilidade exige equipes distintas, duas equipes são insuficientes para aquele ciclo. O modelo não resolve balanceamento de carga nem restrições além das arestas.

## Checkpoint

checkpoint-explain: Um componente separado pode conter o conflito. Ciclo fechado com quantidade ímpar de arestas permite checar cada ligação e a impossibilidade de alternar duas cores. Uma coloração válida deve cobrir todos os vértices e toda aresta deve ligar cores diferentes.

## Limites

checkpoint-limit: Até 12 IDs, peso 1 e sem multiarestas. Busca para no primeiro conflito; cores restantes podem estar ausentes e não representam solução parcial extensível. Não resolve matching, número cromático geral ou divisão equilibrada.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Cores alternadas fecham sem conflito.

B: Cada componente pode ser colorido separadamente.

C: Alternância após número ímpar de passos exige cor oposta no próprio início.

D: Sem arestas não há restrição a violar.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
