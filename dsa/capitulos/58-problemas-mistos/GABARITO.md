# Gabarito — Problemas mistos sem rótulo

## Pré-teste

pretest: Cada par de fronteiras válido conta; podem existir vários com o mesmo fim.

## Exemplo trabalhado

worked-observation: Pede todas as ocorrências; zeros permitem vários inícios por fim e negativos impedem monotonicidade da soma.

## Previsão

predict: Ambas têm 3 intervalos. A primeira expõe multiplicidade e a segunda não permite justificar descarte por soma monotônica.

## Comparação

compare: Enumeração e prefixos retornam 3 em ambas. Janela experimental retorna 2 em ambas; vazio retorna zero, não conta intervalo vazio. Contadores medem passos definidos por método, não segundos.

## Transferência

design-transfer: O objetivo mudou para mínimo e a hipótese positiva permite expansão/contração monotônica. Uma janela variável pode servir; frequências de soma exata não respondem automaticamente ao novo contrato.

## Checkpoint

checkpoint-explain: Explicitar contagem exata, contiguidade, negativos/zeros e vazio excluído; propor força bruta antes da otimização. Invariante do mapa conserva multiplicidades de prefixos estritamente anteriores. O(n²)/O(1) referência, O(n) esperado/O(n) prefixos. Refutar janela com dados.

## Limites

checkpoint-limit: Até 64 inteiros limitados. Não classifica enunciados automaticamente nem avalia justificativa textual. Janela é propositalmente não certificada para o contrato; não é implementação genérica de contagem para positivos/zeros. Contadores não são diretamente equivalentes entre algoritmos; rastro da enumeração O(n²).

## Múltipla escolha e justificativa dupla

Correta: B.

A: É necessário justificar monotonicidade e objetivo.

B: Cada ocorrência representa um início distinto.

C: Set perde multiplicidades, como [0,0].

D: Uma amostra não prova regra de descarte; use invariante e contraexemplo.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
