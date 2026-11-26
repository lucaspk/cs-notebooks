# Gabarito — Hash e complementos

## Pré-teste

pretest: Primeiro defina a resposta e enumere candidatos válidos. Depois identifique o estado reutilizável: valores anteriores, extremos ou agregado de um intervalo. A otimização precisa preservar todos os candidatos possíveis.

## Exemplo trabalhado

worked-observation: Uma posição não pode ser usada duas vezes. Na segunda entrada, j=1 encontra o 3 do índice 0; na primeira, a consulta ocorre antes da inserção.

## Previsão

predict: [0,1] no primeiro. No segundo, j=2 encontra 2 no índice 1: [1,2], antes do par [0,3].

## Comparação

compare: Primeiro use alvo 6: ausência. Com negativos e alvo 3, [0,1]. Set responde existência, mas Map conserva o índice para construir a saída.

## Transferência

design-transfer: Sim, mantenha o Map entre chegadas e consulte antes de inserir. Defina também se preços antigos expiram; uma janela temporal exige remover estado e tratar frequências.

## Checkpoint

checkpoint-explain: Procura de complemento elimina a enumeração dos pares anteriores. Map guarda o primeiro índice por valor, consulta antes de inserir, aceita negativos/duplicatas. Ausência e vetor vazio são válidos. O(n) esperado e O(n) espaço contra O(n²) e O(1) da força bruta. Retorna um par, não todos.

## Limites

checkpoint-limit: Até 64 inteiros limitados a ±1000000, alvo no mesmo intervalo; somas exatas nessa faixa. Hash é análise esperada abstrata, não benchmark ou promessa de pior caso de Map. Rastros consomem memória adicional e o algoritmo pode terminar antes do fim.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Inserção antecipada permitiria [j,j] quando 2*a[j]=alvo.

B: O invariante dos índices anteriores garante i<j.

C: O tamanho da própria saída pode ser quadrático.

D: Ordenar muda posições; precisaria guardar identidades.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
