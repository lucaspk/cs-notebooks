# Gabarito — Bellman-Ford

## Pré-teste

pretest: Sim, se a volta for alcançável e puder ser repetida; cada repetição subtrai custo.

## Exemplo trabalhado

worked-observation: Uma atualização poderia alimentar a próxima aresta na mesma rodada, usando várias arestas adicionais. A variante in-place também é válida, mas não conserva o significado exato de no máximo k arestas por rodada.

## Previsão

predict: Tabelas [0,4,5,∅], [0,4,2,8], [0,4,2,5]. Arestas 1→2 de −2 e 2→1 de 1 formam ciclo −1 alcançável: 1,2 e descendente 3 ficam −∞; 0 permanece zero.

## Comparação

compare: Antes: [0,2,∅,∅,∅], sem ciclo negativo alcançável. Depois: [0,2,∅,−∞,−∞]; ID 2 é isolado. 0 e 1 não são alcançados de volta pelo ciclo e mantêm custos finitos.

## Transferência

design-transfer: Não para caminhos dessa origem. O ciclo inacessível não influencia distâncias alcançáveis. Se a pergunta fosse detectar qualquer ciclo negativo globalmente, seria necessária outra inicialização, por exemplo superorigem.

## Checkpoint

checkpoint-explain: Caminho simples usa até V−1 arestas. Melhoria extra prova ciclo negativo alcançável; seus descendentes também têm custo ilimitadamente baixo. ∅ significa sem caminho; valor finito significa mínimo definido; −∞ significa sem limite inferior. Pais dos afetados são apagados para não sugerir caminho mínimo.

## Limites

checkpoint-limit: Até 12 IDs, pesos inteiros entre −1000000 e 1000000. Históricos usam espaço adicional O(V²) e rastro até O(VE), fora da memória O(V) do algoritmo sem instrumentação. Detecta influência de ciclo negativo, mas não enumera ciclos nem reconstrói um certificado do ciclo. Custos são de passeios com repetição permitida, não problema de caminho simples mínimo.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Aresta negativa isolada não implica repetição indefinida.

B: Inalcançável é ∅, não custo sem limite.

C: Podemos repetir a volta e depois seguir ao destino.

D: Um caminho finito pode ter custo negativo bem definido.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
