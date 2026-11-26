# Gabarito — Vetor dinâmico e amortização

## Pré-teste

pretest: Não. A cópia ocorre ao esgotar a capacidade; inserções seguintes podem usar posições livres.

## Exemplo trabalhado

worked-observation: Antes da quarta há tamanho 3/capacidade 4, então basta escrever. Antes da quinta há tamanho 4/capacidade 4: copia quatro e escreve um.

## Previsão

predict: Duplicação: sexta custa 1; total 13, capacidade 8. Incremento unitário: custos 1,2,3,4,5,6; total 21, capacidade 6.

## Comparação

compare: Cinco: duplicação 12 escritas contra 15. Oito: 15 contra 36; nove: 24 contra 45. Na duplicação a nona custa 9, mas o total continua menor que 3n; inserções baratas pagam as cópias.

## Transferência

design-transfer: Não. Uma expansão individual continua linear. Reservar capacidade antecipadamente quando houver limite conhecido pode evitar esses picos, pagando memória e reserva; não garante duração real sem análise adicional.

## Checkpoint

checkpoint-explain: Copia capacidades 1,2,4,… até a última expansão: soma menor que 2n; acrescenta n escritas de novos valores. Total Θ(n), amortizado Θ(1). Incremento unitário totaliza n+n(n−1)/2, Θ(n²).

## Limites

checkpoint-limit: Só append, sem remoção, encolhimento ou inserção no meio. Contamos escritas e cópias; alocação, coleta de lixo e tempo real ficam fora. O lab limita a 64 inserções e não representa a estratégia interna de Array em JavaScript.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Expansões copiam elementos já existentes.

B: A garantia vale por sequência, sem distribuição probabilística.

C: As cópias formam soma geométrica menor que 2n; mais n escritas novas mantém total linear.

D: Copiar 1+2+…+(n−1) gera custo quadrático.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
