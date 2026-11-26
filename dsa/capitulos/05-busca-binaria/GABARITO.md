# Gabarito — Busca binária

## Pré-teste

pretest: Só se a sequência estiver ordenada de modo compatível: em ordem não decrescente, anteriores são no máximo 8. Sem ordem, 10 pode estar em qualquer lado.

## Exemplo trabalhado

worked-observation: O meio já foi rejeitado e deve sair do intervalo. Excluí-lo garante progresso inclusive em intervalos de um ou dois elementos, evitando laço sem término.

## Previsão

predict: Centrais 3 (8), 1 (4), 2 (6); depois lo=2, hi=1. Índice −1 em três sondagens.

## Comparação

compare: 5: −1/três sondagens; 12: 5/duas; duplicatas: índice 1/uma (não promete primeira); vazia: −1/zero. Fora de ordem é rejeitada, não ordenada silenciosamente.

## Transferência

design-transfer: A busca binária exige preparar a ordem; uma ordenação por comparação típica custa O(n log n), além da busca O(log n). Uma varredura O(n) pode bastar para uma consulta. Considerar muitas consultas, atualizações e preservar índices originais; não comparar apenas o laço binário.

## Checkpoint

checkpoint-explain: Toda sondagem sem sucesso remove o meio e ao menos metade aproximada dos candidatos; o intervalo encolhe até vazio. Pior caso floor(log₂n)+1 sondagens, O(log n). Retorna alguma ocorrência; para primeira ocorrência seria preciso outro contrato e continuidade da busca.

## Limites

checkpoint-limit: O lab valida ordenação em uma passagem O(n) antes de executar a busca, para recusar entradas inválidas. Essa validação e o parsing não entram nas sondagens: a chamada completa do lab custa O(n), enquanto a busca sobre dados já garantidos ordenados custa O(log n). Não mede desempenho real. Usa até 64 números finitos.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Descarta o lado que ainda pode conter 12.

B: Mantém uma posição já rejeitada e pode impedir progresso em intervalos pequenos.

C: Ordenação garante que posições até 3 não contêm 12; exclui o meio e preserva candidatos.

D: Só uma posição foi testada, não todas as possibilidades.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
