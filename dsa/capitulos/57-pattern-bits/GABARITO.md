# Gabarito — Bits, máscaras e XOR

## Pré-teste

pretest: Não; presença deve ser idempotente, como OR.

## Exemplo trabalhado

worked-observation: O bit é alternado duas vezes e volta a zero. OR é idempotente, preservando semântica de conjunto.

## Previsão

predict: Máscara 10 e XOR 1; com 30 máscara 1073741834, XOR 31. Bit 30 ainda pertence à faixa positiva permitida.

## Comparação

compare: Vazio: máscara/XOR zero, não presente; alternar cria bit 3 (8), remover mantém zero. ID 31 usa sinal; está fora do contrato, assim como 32 que deslocaria módulo 32.

## Transferência

design-transfer: Não. Use BigInt com deslocamentos BigInt, múltiplas palavras ou Set; escolha pela escala e interoperabilidade. Não misture Number com BigInt nos operadores.

## Checkpoint

checkpoint-explain: Distinguir máscara de presença e XOR de valores. Declarar universo 0..30, sinal e deslocamento módulo 32. O(n) construção, O(1) operações/estado no universo fixo; duplicatas não afetam OR, pares cancelam XOR sob hipótese.

## Limites

checkpoint-limit: Até 64 IDs entre 0 e 30. Não representa conjuntos arbitrariamente grandes nem demonstra segurança de flags de autorização. XOR sozinho não valida multiplicidades. Máscaras exibidas como Number decimal/binário, sem BigInt.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Deslocamento usa contagem módulo 32: resultado 1.

B: Cancelamento só sustenta o caso único quando os demais aparecem em pares, ou hipótese equivalente.

C: OR do mesmo bit não apaga a presença.

D: Bitwise Number converte para 32 bits; BigInt é outra API.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
