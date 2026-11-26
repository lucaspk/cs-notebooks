# Gabarito — Ordenação e intervalos

## Pré-teste

pretest: Depende: fechados incluem ambos os extremos; semiabertos excluem o final e não conflitam no toque.

## Exemplo trabalhado

worked-observation: O intervalo interno terminaria artificialmente o bloco em 3, perdendo pontos de 3 a 10. Deve usar max(10,3).

## Previsão

predict: Fechado: [1,5]. Semiaberto: dois blocos [1,3),[3,5). Intervalo contido: [1,10] em ambas.

## Comparação

compare: Ordenação elimina efeito da ordem. [2,2] fechado é ponto; [2,2) é vazio e rejeitado. Semiabertos que se tocam continuam separados pelo contrato de agrupamento, embora a união admita outra representação.

## Transferência

design-transfer: Não há sobreposição. Unir períodos adjacentes para apresentação é uma política adicional; detectar conflito não deve confundir as duas regras.

## Checkpoint

checkpoint-explain: Reconhecer união/grupos de sobreposição; declarar extremos antes do teste. Ordenar por início, conservar max do fim e blocos anteriores separados. O(n log n), saída/cópia O(n), rastro separado. Vazio retorna vazio, contidos e pontos fechados tratados.

## Limites

checkpoint-limit: Até 64 pares de inteiros limitados; formato início fim separado por vírgulas. Semiabertos devem ter início<fim; fechados permitem igualdade. Não calcula máximo de reuniões simultâneas nem escolhe subconjunto ótimo.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Igualdade não é sobreposição em semiabertos.

B: Blocos anteriores já terminaram antes do início do bloco atual.

C: Reduzir perderia parte da união.

D: Ordenação por comparação custa O(n log n).

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
