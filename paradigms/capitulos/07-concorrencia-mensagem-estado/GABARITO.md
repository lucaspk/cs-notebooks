# Gabarito — Concorrência

## Pré-teste

pretest-race: Sim: A lê 0, B lê 0, A grava 1, B grava 1. A segunda escrita sobrescreve o efeito da primeira.

## Exemplo trabalhado

worked-07: Uma rodada contém dois incrementos. Se A e B leem 0 antes de gravar, ambos escrevem 1: perde-se um incremento. Com um dono aplicando duas mensagens, o contador vai a 2. Exigir explicação do mecanismo: Estado compartilhado permite que tarefas leiam e escrevam o mesmo contador. Um incremento pode conter leitura e escrita separadas. No modelo de mensagens, um único dono processa cada incremento em série. Isso muda quem pode alterar o estado, sem prometer entrega perfeita numa rede real.

## Previsão

predict-race: Compartilhado=3; mensagens=6; esperado=6. Cada rodada sobreposta perde um dos dois incrementos. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: Não. No escalonamento serial os dois caminhos chegam a 6. A existência de uma execução correta não exclui a execução incorreta.

## Múltipla escolha

Correta: B.

A: O exemplo não modela falhas de rede ou do processo.

B: Essa hipótese impede a sobreposição da leitura/escrita.

C: O dono mantém seu próprio estado.

D: Duplicação alteraria a contagem sem deduplicação.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Usar operação atômica ou exclusão mútua sobre leitura+escrita; considerar contenção, escopo do lock e possíveis bloqueios. Mensagens também exigem fila e tratamento de falhas.

## Checkpoint

checkpoint-progconc: usar dados do exemplo: Uma rodada contém dois incrementos. Se A e B leem 0 antes de gravar, ambos escrevem 1: perde-se um incremento. Com um dono aplicando duas mensagens, o contador vai a 2. Explicar a regra: Estado compartilhado permite que tarefas leiam e escrevam o mesmo contador. Um incremento pode conter leitura e escrita separadas. No modelo de mensagens, um único dono processa cada incremento em série. Isso muda quem pode alterar o estado, sem prometer entrega perfeita numa rede real.

checkpoint-limit: O escalonamento é simulado e determinístico. Não executa threads reais, nem demonstra entrega exatamente uma vez em sistemas distribuídos.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
