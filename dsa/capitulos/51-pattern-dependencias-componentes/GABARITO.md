# Gabarito — Dependências e componentes

## Pré-teste

pretest: Não. Conexão e precedência são perguntas diferentes; a direção das relações é necessária para ordem.

## Exemplo trabalhado

worked-observation: Viola 0→1,1→2,0→2. Componentes só descrevem quem pode conectar-se por caminhos sem direção; não impõem sequência.

## Previsão

predict: Exemplo: ordem [0,3,1,2]; classes {0,1,2},{3}. Com ciclo 0↔1, apenas 3 executa, bloqueados [0,1,2]; 2 é descendente bloqueado, não necessariamente membro de ciclo.

## Comparação

compare: Sem ligações, dependências aceita qualquer permutação e mostra [0,1,2,3]; UF tem quatro componentes. Laço dirigido impede liberar 0; não dirigido não muda sua classe. Ligações opostas são distintas no modo dirigido, duplicatas no não dirigido são rejeitadas.

## Transferência

design-transfer: Uniões modelam equivalência entre contas se compartilhar e-mail implica mesma identidade segundo regra do produto. Pré-requisitos pedem grafo dirigido e topológica; um ciclo exige resolução do planejamento, não união de classes.

## Checkpoint

checkpoint-explain: Reconhecer relação dirigida de precedência versus equivalência não dirigida. Kahn preserva grau de entrada restante e detecta impossibilidade; UF preserva partições de conexão sem ordem. O(V+E) versus O(V+Eα(V)) amortizado, memória O(V+E) incluindo representação. Isolados contam nos dois.

## Limites

checkpoint-limit: 1..12 IDs, até 64 ligações, peso unitário e sem multiarestas. Modo muda interpretação, não converte automaticamente significado de negócio. UF não detecta componentes fortes dirigidos nem suporta deleção. Kahn devolve prefixo e bloqueados, não testemunha de ciclo.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Classes não codificam precedência.

B: Descendentes de ciclos também podem ficar bloqueados.

C: Estado precisa corresponder ao significado solicitado.

D: Conexão não exclui ciclos dirigidos.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
