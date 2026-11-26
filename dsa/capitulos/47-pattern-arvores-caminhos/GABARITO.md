# Gabarito — Árvores: estado no caminho

## Pré-teste

pretest: Só se cada chamada tiver cópia própria. Compartilhando um vetor mutável, é preciso desfazer a inclusão ao retornar.

## Exemplo trabalhado

worked-observation: Caminho é vetor compartilhado e precisa ser restaurado. Soma é argumento numérico local em cada chamada; a chamada do filho não muda a variável soma do pai.

## Previsão

predict: Exemplo retorna IDs [0,1,3]. Segunda árvore retorna [0,1], valores [5,−2], apesar de a soma inicial 5 exceder alvo 3.

## Comparação

compare: No primeiro, raiz não é folha e não conta: nenhuma resposta. Nó único conta [0]. Árvore vazia não tem caminho raiz→folha e retorna zero respostas, mesmo com alvo zero.

## Transferência

design-transfer: Não. Inícios e términos mudaram. Pode exigir prefixos de soma no caminho com frequências restauradas ao retornar; é outro contrato e precisa prova própria.

## Checkpoint

checkpoint-explain: Reconhecer estado herdado pela chamada, copiar só ao emitir e desfazer mutação compartilhada. O(n+z) tempo, O(h) estado sem saída/rastro; negativos impedem poda por soma alta. IDs distinguem nós com valores repetidos; null não é zero. Modelo usa até 63 posições fixas.

## Limites

checkpoint-limit: Formato posicional de até 63 posições, valores e alvo inteiros limitados. Árvore vazia permitida; órfãos rejeitados. Altura representável é até 6; não mede risco real de stack overflow. Rastro copia/formata caminhos e não integra O(n+z); sem caminhos arbitrários ou poda automática.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Descendentes negativos podem baixar a soma.

B: Mutações posteriores alterariam o mesmo vetor.

C: Mantém estado de caminho e contrato raiz→folha.

D: É preciso terminar em folha.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
