# Gabarito — Filas circulares

## Pré-teste

pretest: Não. Um buffer circular pode avançar o índice da cabeça e reutilizar posições por módulo.

## Exemplo trabalhado

worked-observation: A ordem começa em head=1 e segue módulo 3: posições 1,2,0. O índice zero não é necessariamente o início lógico.

## Previsão

predict: +50 é rejeitado porque size=3; não altera o estado. A retirada devolve 20 e deixa [30,40], head=2, tail=1, size=2.

## Comparação

compare: Em C=3 resulta [20,30,40]. Em C=1, +10 entra, +20 e +30 são rejeitados, - retira 10, +40 entra: [40]. Retirar de vazia é rejeitado e mantém estado. O modelo nunca sobrescreve quando cheio.

## Transferência

design-transfer: O lab rejeita novas inserções e preserva itens antigos. Em produção decidir política segundo perda aceitável, pressão sobre produtor e latência; bloquear pode exigir coordenação que este modelo não executa.

## Checkpoint

checkpoint-explain: Lê/limpa uma posição, avança head por módulo e decrementa size: O(1) no modelo. Os demais dados ficam onde estão; a ordem lógica muda pelo índice, não por deslocamento.

## Limites

checkpoint-limit: Fila sequencial de capacidade fixa, sem threads, espera ou sincronização. Cópias para mostrar snapshots não integram o custo abstrato. null representa posição livre; os dados aceitos são números finitos. Até 64 comandos e capacidade até 16.

## Múltipla escolha e justificativa dupla

Correta: B.

A: O retorno circular também iguala índices quando cheio.

B: A ocupação explícita elimina a ambiguidade.

C: A fila inicial também tem índices iguais.

D: Valores zero ou negativos são dados válidos e não indicam ocupação.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
