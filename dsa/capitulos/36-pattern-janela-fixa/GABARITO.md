# Gabarito — Janela deslizante fixa

## Pré-teste

pretest: Primeiro defina a resposta e enumere candidatos válidos. Depois identifique o estado reutilizável: valores anteriores, extremos ou agregado de um intervalo. A otimização precisa preservar todos os candidatos possíveis.

## Exemplo trabalhado

worked-observation: Os elementos nas posições 1 e 2 permanecem. Apenas o valor 2 do índice 0 sai e o valor 1 do índice 3 entra.

## Previsão

predict: 8,7,9,6. Com negativos, somas −7 e −5; melhor −5 no intervalo [1,2], nunca zero.

## Comparação

compare: k=1: 5 em [2,2]. k=6: 14 em [0,5]. k=0 é rejeitado. Empate conserva [0,1], soma 2.

## Transferência

design-transfer: A soma ocupa espaço constante, mas para saber o valor que sai sem acesso ao vetor original é necessário armazenar os últimos k valores em fila/buffer: O(k).

## Checkpoint

checkpoint-explain: Reconhecer intervalo contíguo de tamanho fixo e agregado aditivo. Cada valor entra uma vez e sai no máximo uma vez: O(n), O(1) auxiliar com acesso ao vetor, sem rastro. Exige 1≤k≤n; negativos e empates tratados. Força bruta O((n−k+1)k). Em fluxo, buffer O(k).

## Limites

checkpoint-limit: Até 64 inteiros limitados, entrada vazia não tem k válido e gera erro. Lab mantém vetor completo, não simula fonte infinita. Soma máxima não é máximo elemento e não resolve intervalos de tamanho livre; rastro O(n) separado.

## Múltipla escolha e justificativa dupla

Correta: A.

A: É a diferença exata entre intervalos consecutivos.

B: Todas as janelas podem ter soma negativa.

C: Ao sair o máximo, é preciso saber o próximo candidato.

D: Janela exige contiguidade.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
