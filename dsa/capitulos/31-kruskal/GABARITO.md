# Gabarito — Kruskal

## Pré-teste

pretest: Não. Ligações redundantes podem formar ciclos e aumentar custo sem melhorar a conectividade exigida.

## Exemplo trabalhado

worked-observation: 0 e 2 já estão conectados por 0–1–2. Acrescentar 0–2 fecha ciclo; a estrutura deixaria de ser floresta. A próxima ligação útil deve juntar conjuntos distintos.

## Previsão

predict: Aceita [1,2,1],[0,1,2],[1,3,4], total 7. Com ID 4 isolado continuam três arestas, mas dois componentes: V−c=5−2=3.

## Comparação

compare: Aceita 1–2(−1),0–1(2),1–3(4), total 5. Laço negativo continua rejeitado. Sem arestas: total zero, n componentes e floresta vazia.

## Transferência

design-transfer: MST minimiza soma para conexão sem redundância; remover qualquer aresta da árvore a separa. Redundância exige outro objetivo/restrições, não é fornecida pela floresta mínima.

## Checkpoint

checkpoint-explain: A menor aresta cruzando corte compatível pode substituir aresta pelo menos tão pesada numa solução ótima. Empates permitem diferentes árvores com mesmo custo. Desconectado devolve MSF, sem inventar ligações. Ordenação O(E log(E+1)); Union-Find por tamanho/compressão O(E α(V)) amortizado, inicialização O(V), memória O(V+E) com lista ordenada.

## Limites

checkpoint-limit: Até 12 IDs e 64 arestas, pesos inteiros entre −1000000 e 1000000. Sem multiarestas, laços aceitos na entrada mas nunca selecionados. Percorre todas as arestas para mostrar rejeições. Rastro e formatação ficam fora da contagem abstrata; não otimiza redundância, distâncias ou rede dirigida.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Não há origem privilegiada em Kruskal.

B: União evita ciclos e a ordem de pesos sustenta a escolha segura.

C: Laço não conecta componentes e não pertence a floresta.

D: O objetivo é soma das arestas geradoras, não caminhos mínimos.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
