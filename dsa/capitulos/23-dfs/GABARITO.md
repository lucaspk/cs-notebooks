# Gabarito — DFS

## Pré-teste

pretest: Sim, no modelo sequencial usual a chamada fica suspensa enquanto a filha executa.

## Exemplo trabalhado

worked-observation: A árvore registra 0→1→2, duas arestas; 0→2 tem só uma. DFS prioriza profundidade, não camadas.

## Previsão

predict: d=[1,2,3,7], f=[6,5,4,8]. Intervalos de 2 dentro de 1 dentro de 0; intervalo de 3 separado.

## Comparação

compare: Sem 1→2: d=[1,2,4,7], f=[6,3,5,8], pai de 2 é 0. Com ciclo, marcação impede redescobrir vértices, portanto termina; este lab mostra tempos, não certifica ciclos.

## Transferência

design-transfer: Término: processar o nó após terminar todos os filhos. Em grafo com compartilhamento/ciclos é preciso definir semântica e usar marcação; árvore de pastas é hipótese distinta.

## Checkpoint

checkpoint-explain: Descoberta abre chamada, término fecha. Laço externo cria novas raízes e cobre todos os vértices, inclusive isolados. Cada entrada é examinada uma vez, O(V+E) com lista; pilha pode ter V nós.

## Limites

checkpoint-limit: Até 12 vértices com peso 1; DFS recursiva didática, sem promessa de suportar profundidade real arbitrária. Rastro copia pilha em cada evento; esse custo não integra O(V+E) do algoritmo sem instrumentação. scans conta todas as entradas de lista examinadas.

## Múltipla escolha e justificativa dupla

Correta: A.

A: Chamada filha inteira ocorre enquanto a ancestral está ativa.

B: É a relação inversa, correspondente a ancestral de u.

C: São eventos distintos no relógio.

D: DFS não otimiza quantidade de arestas.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
