# Gabarito — Árvores binárias de busca

## Pré-teste

pretest: Sim. Sem balanceamento, inserir valores crescentes faz cada novo valor seguir para a direita.

## Exemplo trabalhado

worked-observation: Uma folha arbitrária pode ser maior que outros nós da subárvore direita que ficarão abaixo dela. O mínimo da direita é o sucessor e respeita os limites globais.

## Previsão

predict: Raiz 5; ordem 1,2,3,5,6,7; altura três.

## Comparação

compare: Três visitas contra sete; alturas três e sete. Inserir duplicado não altera conjunto. Remover ausente não altera estrutura nem inventa nó; a busca percorre até vazio.

## Transferência

design-transfer: A forma pode ser cadeia, altura n. Busca é O(h); para garantir logaritmo é preciso manter altura logarítmica com política de balanceamento ou outra estrutura apropriada.

## Checkpoint

checkpoint-explain: Folha vira vazio; um filho ocupa a ligação do removido; dois filhos usam sucessor e religam seu eventual filho direito. Cada operação percorre O(h), pior Θ(n). Construção inicial da árvore não faz parte da consulta isolada.

## Limites

checkpoint-limit: Até 32 números finitos, conjunto sem duplicatas e reconstrução a cada execução. Contador de comparações conta decisões alvo/no durante localização; percurso adicional do sucessor aparece no rastro, fora desse contador. Tabela exibe caminhos e filhos, não endereços reais. Sem balanceamento automático.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Pode superar nós que precisam permanecer à direita.

B: Se há esquerda sob esse filho, ela pode violar a nova raiz.

C: O sucessor é o menor maior que a chave removida.

D: Pode violar ordenação e alterar o conjunto indevidamente.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
