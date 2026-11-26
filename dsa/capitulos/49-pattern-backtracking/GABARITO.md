# Gabarito — Backtracking e poda

## Pré-teste

pretest: Não. São identidades distintas; o contrato de unicidade precisa dizer se compara valores ou posições.

## Exemplo trabalhado

worked-observation: IDs 0 e 1 são escolhas diferentes, mesmo com o mesmo valor. Resultados [0] e [1] respeitam o contrato; deduplicar por valor mudaria a pergunta.

## Previsão

predict: Respectivamente [0,1] e [2]; depois [0] e [1]. Poda não muda soluções nem sua ordem de emissão, apenas elimina visitas impossíveis.

## Comparação

compare: Alvo 0 retorna somente subconjunto vazio. Alvo maior que total não tem resposta e pode podar na raiz. Vazio com alvo 0 emite vazio; com alvo positivo não. Negativo poderia reparar excesso de soma, então as podas usadas exigem positivos.

## Transferência

design-transfer: Não. É preciso redefinir estado e avanço: reutilização altera transições; unicidade por valor exige normalização e regra de duplicatas. O contrato de uso único por índice não se transfere automaticamente.

## Checkpoint

checkpoint-explain: Reconhecer enumeração de escolhas, definir estado (i,soma,caminho), incluir/excluir e restaurar. Positivos justificam excesso e insuficiência do restante. O(2^n+z) no pior caso, O(n) estado sem saída/rastro; mostrar soluções completas, não só existência. Vazio e alvo zero explícitos.

## Limites

checkpoint-limit: Até 12 valores positivos limitados, alvo 0..1000000. Limite reduz explosão da interface; não garante eficiência em n grande. Rastro copia caminhos e tem custo adicional. Não suporta negativos, repetição ilimitada ou deduplicação por valor.

## Múltipla escolha e justificativa dupla

Correta: B.

A: É necessário provar que nenhuma solução válida está no ramo.

B: Preserva a exploração completa dos candidatos ainda viáveis.

C: Pode reduzir chamadas, mas não muda o pior caso geral.

D: Identidade é posição; igualdade de valor não elimina escolhas.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
