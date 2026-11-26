# Gabarito — Programação dinâmica de mochila e subconjuntos

## Pré-teste

pretest: Não; permitir duas cópias muda o contrato.

## Exemplo trabalhado

worked-observation: A leitura da mesma camada representa outra cópia; é uma transição correta para reutilização, mas viola uso único.

## Previsão

predict: Falso/verdadeiro; com dois itens distintos de peso 3, uso único também dá verdadeiro.

## Comparação

compare: Alvo zero é sempre possível pelo vazio. Vazio com alvo positivo é impossível. Peso maior que T não altera estados; nenhum laço interno executa.

## Transferência

design-transfer: Guarde máximo lucro por capacidade, atualize decrescendo e defina bases: para capacidade exata, estados impossíveis são −infinito; para limite máximo com vazio permitido, pode iniciar lucros em zero.

## Checkpoint

checkpoint-explain: Definir existência e soma exata; base zero, transição incluir/excluir e direção da camada. O(nT) tempo, O(T) espaço, pseudopolinomial. Duplicatas são itens distintos. Não confundir decisão com contagem ou maximização.

## Limites

checkpoint-limit: Até 16 pesos positivos e alvo 0..128. Não reconstrói itens nem maximiza lucro. Rastro tem até nT linhas e excede a memória O(T) do algoritmo sem instrumentação. Zero/negativos rejeitados para preservar o domínio e a ordem de dependências.

## Múltipla escolha e justificativa dupla

Correta: A.

A: A dependência vem de soma menor ainda não atualizada neste item.

B: [3],6 distingue claramente os modos.

C: T pode ser exponencial no seu tamanho binário.

D: Vazio realiza soma zero e inicia as transições.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
