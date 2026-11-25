# Gabarito — 10-produtor-consumidor

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: coordenar fila limitada entre produtor e consumidor — bloquear quando cheia ou vazia — e ver o custo de ignorar essa sincronização.

## Pré-teste e previsões

Pergunta: Fila com capacidade 3 e produtor mais rápido: o que deve acontecer?
| pretest-full | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: No painel sincronizado, em que passo o produtor fica blocked ?
| predict-block | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**design-sem** — Fila cheia e produtor tenta inserir com sincronização correta: Corrompe o elemento no slot 0. Bloqueia até haver espaço. Descarta o item silenciosamente. Expande o buffer automaticamente. Resposta + B. Espera por condição com mutex + sinais ou bloqueio em semáforos. Design mínimo Dois semáforos + mutex: quais contadores?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**compare-sync** — Bloqueios vs overflows.

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why-yes** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

## Checkpoint

Pergunta: Checkpoint
| checkpoint | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch10)

B. Espera por condição com mutex + sinais ou bloqueio em semáforos.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Corrompe o elemento no slot 0. |
| B | **correta** — Bloqueia até haver espaço. |
| C | rejeitar — Descarta o item silenciosamente. |
| D | rejeitar — Expande o buffer automaticamente. |
