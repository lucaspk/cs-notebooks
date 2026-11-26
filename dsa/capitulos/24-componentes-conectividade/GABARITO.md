# Gabarito — Componentes e conectividade

## Pré-teste

pretest: Não. A direção precisa ser respeitada; ida e volta são condições separadas.

## Exemplo trabalhado

worked-observation: 2 não consegue voltar a 0. Alcance unilateral não define componente fortemente conexo.

## Previsão

predict: Dirigido: quatro grupos unitários. Não dirigido: {0,1,2} e {3}. O alcance próprio inclui todos os vértices.

## Comparação

compare: Com 2→0 surge grupo forte {0,1,2}, além de {3}. Sem arestas: quatro grupos unitários e só diagonal verdadeira na matriz.

## Transferência

design-transfer: Não. Ao unir extremos ignora orientação e produz conectividade fraca, podendo juntar vértices sem retorno. Para ida e volta são necessários componentes fortes.

## Checkpoint

checkpoint-explain: Não dirigido tem alcance simétrico; dirigido requer testar ambos sentidos. Isolados são grupos válidos por caminho vazio. Modelo usa V BFS, O(V(V+E)) e matriz O(V²); componente não dirigido pode ser calculado em O(V+E).

## Limites

checkpoint-limit: Até 12 vértices, peso 1, sem multiarestas. Grupos dirigidos são fortes; conectividade fraca só é discutida. Método por alcance completo prioriza explicação e não representa os algoritmos lineares especializados. Não há atualização incremental.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Destinos comuns não garantem retorno.

B: Isso é alcance unilateral.

C: Grau não certifica caminhos.

D: Alcance mútuo é a relação usada para os grupos fortes.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
