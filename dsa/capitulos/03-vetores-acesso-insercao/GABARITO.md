# Gabarito — Vetores: acesso e inserção

## Pré-teste

pretest: Aponta para 20. Inserção preserva os antigos elementos e aumenta o tamanho; sobrescrita substitui um elemento.

## Exemplo trabalhado

worked-observation: A posição 2 já teria virado 20; perderíamos o 30 e copiaríamos 20 duas vezes. A direção preserva valores ainda necessários.

## Previsão

predict: No fim: zero deslocamentos, uma escrita, [10,20,30,40]. No início: três deslocamentos, quatro escritas, [5,10,20,30].

## Comparação

compare: A inserção faz dois deslocamentos/três escritas; remover 1 do resultado faz dois deslocamentos/duas escritas e restaura [10,20,30]. Ler 1 no original retorna 20, sem escrita ou deslocamento. As entradas são editadas manualmente, uma operação por execução.

## Transferência

design-transfer: Não: preservar a ordem desloca n elementos no início. Rever frequência de inserções, necessidade de acesso aleatório, capacidade e estrutura; não afirmar que qualquer alternativa domina em todas as operações.

## Checkpoint

checkpoint-explain: Leitura válida: um acesso, Θ(1). Inserção no início: n deslocamentos e n+1 escritas, Θ(n). No fim sem expansão, uma escrita e nenhum deslocamento.

## Limites

checkpoint-limit: O lab simula posições de um vetor com capacidade disponível; usa cópias para não modificar a entrada, mas não conta essa cópia como custo do algoritmo estudado. Arrays reais de JavaScript não garantem esse layout físico. Remover também altera o tamanho; essa atualização não entra nas escritas de posições.

## Múltipla escolha e justificativa dupla

Correta: A.

A: O sufixo tem exatamente n−i elementos.

B: Conta o prefixo que fica parado.

C: No fim i=n, nenhum elemento se desloca.

D: Acesso direto não abre espaço preservando a ordem.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
