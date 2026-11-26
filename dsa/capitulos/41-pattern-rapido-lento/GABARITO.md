# Gabarito — Ponteiros rápido e lento

## Pré-teste

pretest: Não, identidades são distintas de conteúdo. Um Set de IDs visitados detecta repetição usando memória linear.

## Exemplo trabalhado

worked-observation: Nós diferentes podem armazenar o mesmo valor. Ciclo exige voltar à mesma identidade por links; igualdade de conteúdo não prova retorno.

## Previsão

predict: Encontro 3, entrada 2. Quatro nós IDs 0..3 sem ciclo: meio direito 2. A convenção alternativa de meio esquerdo exigiria outro laço.

## Comparação

compare: Autociclo encontra e retorna entrada 0. Nó isolado acíclico tem meio 0 e sem encontro. Vazio não tem ciclo nem meio, ambos null. Entrada diferente de −1 é inválida para vazio.

## Transferência

design-transfer: Não. Floyd exige sucessor único por estado; escolher um ramo pode ignorar ciclos no outro. Para grafo geral use travessia com estado apropriado, como DFS.

## Checkpoint

checkpoint-explain: Reconhecer cadeia de sucessor único, comparar IDs e proteger os dois avanços. Detecção e entrada em O(μ+λ), O(1) estado sem rastro/representação. Sem ciclo, meio direito; vazio sem meio. Set é alternativa linear em memória. Encontro não é necessariamente entrada.

## Limites

checkpoint-limit: Até 64 nós com valores inteiros limitados. Topologia restrita a cadeia com retorno da cauda, suficiente para prefixo+ciclo alcançável; não modela grafos gerais nem nós desconectados. Construção e rastro usam O(n), separados do estado constante de Floyd.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Exemplo encontra 3 e entra em 2.

B: Conteúdo pode repetir em nós distintos.

C: A diferença de passos é múltipla do comprimento do ciclo.

D: Sem fim, o meio da lista finita não se aplica.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
