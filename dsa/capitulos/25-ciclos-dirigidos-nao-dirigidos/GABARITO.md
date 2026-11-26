# Gabarito — Ciclos dirigidos e não dirigidos

## Pré-teste

pretest: Não. É a mesma aresta percorrida nos dois sentidos, não um ciclo simples novo.

## Exemplo trabalhado

worked-observation: Não dirigido encontraria falsamente a aresta de pai. Dirigido confundiria aresta para nó preto com retorno a ancestral ativo.

## Previsão

predict: Dirigido não tem ciclo. Não dirigido tem testemunha 0→1→2→0, pois 2 liga de volta ao ancestral 0.

## Comparação

compare: Uma aresta não gera ciclo em nenhum modo. As duas orientações geram ciclo dirigido 0→1→0. Laço em 2 é detectado mesmo em componente separado, testemunha 2→2.

## Transferência

design-transfer: Não. Pode haver ciclo em componente não alcançado. É preciso cobrir todos os vértices e respeitar direção; a próxima etapa relaciona DAG com ordenação topológica.

## Checkpoint

checkpoint-explain: Ignorar pai só no não dirigido sem multiarestas. Cinza significa ancestral ativo; preto terminou. Laço fecha imediatamente. Testemunha tem primeiro=último e cada par consecutivo deve ser aresta orientada válida; busca externa cobre componentes.

## Limites

checkpoint-limit: Até 12 vértices, peso 1, sem multiarestas. Laços aceitos. Multigrafos exigiriam identidade de aresta para distinguir duas ligações ao pai. Para na primeira prova, sem enumerar ciclos nem terminar de pintar a floresta. Rastro e cadeia de pais são didáticos, sem execução de dependências reais.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Nó terminado pode ser alvo sem caminho de volta.

B: O caminho de árvore do ancestral ao atual mais retorno fecha o ciclo.

C: Descobrir filho não fecha caminho por si só.

D: No dirigido a aresta inversa é distinta e pode fechar ciclo de dois.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
